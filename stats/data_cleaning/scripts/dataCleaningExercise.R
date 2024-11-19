setwd("~/Desktop/psy1903/stats/data_cleaning/scripts/")
if (!require("pacman")) {install.packages("pacman"); require("pacman")} 
p_load("tidyverse", "rstudioapi", "lme4", "emmeans", "psych", "corrplot", "jsonlite")

iat_data1 <- read.csv("~/Desktop/psy1903/osfstorage-archive/gender-major-iat-2024-11-05-21-51-39.csv", header = TRUE, sep = ",", na.strings = "NA")
str(iat_data1)
summary(iat_data1)

iat_data2 <- iat_data1[iat_data1$expectedCategoryAsDisplayed == "science or women" |
                         iat_data1$expectedCategoryAsDisplayed == "liberal arts or men" |
                         iat_data1$expectedCategoryAsDisplayed == "science or men" |
                         iat_data1$expectedCategoryAsDisplayed == "liberal arts or women",
                       c("trial_index", "rt", "response", "word", "expectedCategory", "expectedCategoryAsDisplayed", "leftCategory", "rightCategory", "correct")]
str(iat_data2)

iat_data2$leftCategory <- as.factor(iat_data2$leftCategory)

column_names <- c("expectedCategoryAsDisplayed", "expectedCategory", "leftCategory", "rightCategory")
for(column_name in column_names) {
  iat_data2[,column_name] <- as.factor(iat_data2[,column_name])
}

str(iat_data2)

calculate_IAT_dscore <- function(data) {
  # Step 1: Filter out trials <300 & >3000
  tmp <- data[data$rt > 300 & data$rt < 5000,]
  # Step 2: Separate congruent & incongruent
  congruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "science or men" |
                            tmp$expectedCategoryAsDisplayed == "liberal arts or women",]
  incongruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "science or women" |
                              tmp$expectedCategoryAsDisplayed == "liberal arts or men",]
  # Step 3: calculate mean & stdev
  congruent_means <- mean(congruent_trials$rt, na.rm = TRUE)
  incongruent_trials <- mean(incongruent_trials$rt, na.rm = TRUE)
  pooled_sd <- sd(tmp$rt, na.rm = TRUE)
  # Step 4: Calculate D-Score
  dscore <- (congruent_means - incongruent_trials) / pooled_sd
  
  return(dscore)
}

#### Questionnaire Scoring -----------------------------------------------------

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

###----------------------------- CREATE DSCORES TABLE -----------------------------#####

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
  whichPrime <- tmp[1,"whichPrime"]
  dScores[i,"participant_ID"] <- participant_ID
  dScores[i, "d_score"] <- calculate_IAT_dscore(tmp)
  dScores[i, "whichPrime"] <- levels(whichPrime)[2]
  dScores[i, "questionnaire"] <- score_questionnaire(tmp)
  
  rm(tmp)
  i <- i + 1
}

write.csv(dScores,"~/Desktop/psy1903/stats/data_cleaning/data/participant_dScores.csv", row.names = FALSE)
