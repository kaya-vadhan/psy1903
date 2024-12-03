#### Load Packages & Set Working Directory ------

if (!require("pacman")) {install.packages("pacman"); require("pacman")}

p_load("tidyverse","rstudioapi","lme4","emmeans","psych","corrplot","jsonlite")

setwd("~/Desktop/psy1903/stats/final_stats")

#### D-score Function --------------------------------

calculate_IAT_dscore <- function(data) {
  # Step 1: Filter out trials <300 & >3000
  tmp <- data[data$rt > 300 & data$rt < 5000 & data$correct == TRUE,]
  # Step 2: Separate congruent & incongruent
  congruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "science or men" |
                            tmp$expectedCategoryAsDisplayed == "liberal arts or women",]
  incongruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "science or women" |
                              tmp$expectedCategoryAsDisplayed == "liberal arts or men",]
  # Step 3: calculate mean & stdev
  congruent_mean <- mean(congruent_trials$rt, na.rm = TRUE)
  incongruent_mean <- mean(incongruent_trials$rt, na.rm = TRUE)
  pooled_sd <- sd(tmp$rt, na.rm = TRUE)
  # Step 4: Calculate D-Score
  dscore <- (incongruent_mean - congruent_mean) / pooled_sd
  
  return(dscore)
}

#### Questionnaire Scoring Function ---------------

score_questionnaire <- function(data) {
  json_data <- data[data$trialType == "questionnaire", "response"]
  print(json_data)
  questionnaire <- fromJSON(json_data)
  questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))
  rev_items <- c("Q1", "Q3", "Q5", "Q7", "Q9")
  for(rev_item in rev_items) {
    questionnaire[,rev_item] <- 6 - questionnaire[,rev_item]
  }
  score <- rowMeans(questionnaire, na.rm = TRUE) 
  return(score)
}

#### For Loop ------------------------------------------

directory_path <- "~/Desktop/psy1903/osfstorage-archive"

files_list <- list.files(path = directory_path, pattern = "\\.csv$", full.names = TRUE)
dScores <- data.frame(matrix(nrow = length(files_list), ncol = 4))
colnames(dScores) <- c("participant_ID", "d_score", "questionnaire", "whichPrime")

i = 1
file <- files_list[[1]]

for (file in files_list) {
  tmp <- read.csv(file)
  tmp[, "rt"] <- as.numeric(tmp[,"rt"])
  tmp[, "correct"] <- as.logical(tmp[,"correct"])
  tmp[, "expectedCategory"] <- as.factor(tmp[,"expectedCategory"])
  tmp[, "expectedCategoryAsDisplayed"] <- as.factor(tmp[,"expectedCategoryAsDisplayed"])
  tmp[, "rightCategory"] <- as.factor(tmp[,"rightCategory"])
  tmp[, "leftCategory"] <- as.factor(tmp[,"leftCategory"])
  tmp[, "whichPrime"] <- as.factor(tmp[,"whichPrime"])
  
  participant_ID <- tools::file_path_sans_ext(basename(file))
  dScores[i,"participant_ID"] <- participant_ID
  dScores[i, "d_score"] <- calculate_IAT_dscore(tmp)
  dScores[i, "whichPrime"] <- tmp[tmp$trialType == "prime","whichPrime"]
  dScores[i, "questionnaire"] <- score_questionnaire(tmp)
  
  rm(tmp)
  i <- i + 1
}

write.csv(dScores,"~/Desktop/psy1903/stats/data_cleaning/data/participant_dScores.csv", row.names = FALSE)

#### ANOVA -------------------------------------------

iat_anova <- aov(dScores$d_score ~ dScores$whichPrime)
summary(iat_anova)

#### T-Test ---------------------------------------------

TukeyHSD(iat_anova)

#### Correlation ---------------------------------------

cor.test(dScores$d_score, dScores$questionnaire)

#### Base R Histogram -------------------------------

hist(dScores$d_score, main = "Distribution of D-Scores", ylab = "Frequency", xlab = "D-Scores")

#### ggplot Histogram --------------------------------

ggplot(data = dScores, aes(x = d_score)) + geom_histogram(binwidth = .15, fill = "skyblue", color = "black") + theme_minimal() + ggtitle("Distribution of D-Scores") + labs(x = "D-Scores", y = "Frequency")

#### ggplot Histogram by Prime ---------------------

ggplot(data = dScores, aes(x = d_score)) + geom_histogram(binwidth = .15, fill = "skyblue", color = "black") + theme_classic() + ggtitle("Distribution of D-Scores") + labs(x = "D-Scores", y = "Frequency") + facet_wrap(~dScores$whichPrime)

#### ggplot Box Plot ----------------------------------

ggplot(data = dScores, aes(x = whichPrime, y = d_score)) + geom_boxplot() + theme_classic() + theme(legend.position="none") + ggtitle("Effect of Prime on D-Scores") + scale_x_discrete(labels = c("Atypical", "Stereotypical")) + labs(x = "Prime Condition", y = "D-Scores") 

#### ggplot Scatter Plot -------------------------------

ggplot(data = dScores, aes(x = questionnaire, y = d_score)) + geom_point() + theme_classic() + ggtitle("Correlation Between Questionnaire and D-Scores") + labs(x = "Questionnaire", y = "D-Scores") + geom_smooth(method = lm)

#### ggplot Custom Theme ---------------------------

ggplot(data = dScores, aes(x = whichPrime, y = d_score)) + 
  geom_boxplot(fill = c("#dfbac9", "#eec5b7")) + 
  ggtitle("Effect of Prime on D-Scores") + 
  scale_x_discrete(labels = c("Atypical", "Stereotypical")) + 
  labs(x = "Prime Condition", y = "D-Scores") + 
  theme(panel.background = element_rect(fill = "#D3D3D3"),
        text = element_text(family = "serif"),
        plot.title = element_text(face="bold", size = 15, color = "black", hjust = 0.5),
        axis.title = element_text(face="bold", size = 12, color="#5e5c5a"),
        axis.text.x = element_text(face="bold", size = 12, color=c("#a16d8e", "#cf9363"))
  ) 
