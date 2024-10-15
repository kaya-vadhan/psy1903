let jsPsych = initJsPsych();
let timeline = [];

let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1><span class = 'title'>Welcome to the Gender-Major IAT Study!</span></h1> 
    <p>In this experiment..</p>
    <p>Press <span class='key'>SPACE</span> to begin.</p>
    `,
    choices: [' ']
};

//timeline.push(welcomeTrial);

// PRIMER
let primer = ['stereotypical', 'atypical'];
let primerDisplay = primer[Math.floor(Math.random() * primer.length)];

let primerTrial = {
    type: jsPsychSurveyHtmlForm,
    preamble: `
    <h1><span class = 'title'>Part 1</span></h1> 
    <p>Consider the following image.</p>,
    <img src='images/${primerDisplay}.png'>
    <p>Please describe two things you observe about the image in the text box below.</p>,
    `,
    html: `<p><input type='text' name='answer' id='answer'></p>`,
    autofocus: 'answer', // id of the field we want to auto-focus on when the trial starts
    button_label: 'Continue',
    on_finish: function (data) {
        data.whichPrime = primerDisplay;
    }
}
//timeline.push(primerTrial);

// IAT

let iatInstructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1><span class = 'title'>Part 2</span></h1> 
    <p>IAT TASK</p>
    <p>Press <span class='key'>SPACE</span> to begin.</p>
    `,
    choices: [' ']
};
//timeline.push(iatInstructions);

let iteration = 0
for (let condition of conditions) {
    iteration++;

    //INSTRUCTIONS FOR EACH BLOCK
    let blockInstructions = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
        <h1><span class = 'title'>Part ${iteration} of 4</span></h1> 
        <p>In this part, the two categories will be: ${condition.categories[0]} and ${condition.categories[1]}</p>
        <p>Press <span class='key'>SPACE</span> to begin.</p>
        `,
        choices: [' ']
    };
    timeline.push(blockInstructions);
    //36 ROUNDS
    for (i = 0; i < 36; i++) {
        let wordDisplay = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `
            <p>Press <span class='key'>F</span> for ${condition.categories[0]}</p>
            <p>Press <span class='key'>J</span> for ${condition.categories[1]}</p>
            <h1><span class = 'target'>${condition.trials[iteration - 1].word[i]}</span></h1>
            `,
            choices: ['f', 'j'],
        };
        timeline.push(wordDisplay);
    }

};



// LIKERT

let likertInstructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1><span class = 'title'>Part 3</span></h1> 
    <p>Likert Task</p>
    <p>Press <span class='key'>SPACE</span> to begin.</p>
    `,
    choices: [' ']
};
timeline.push(likertInstructions)

let labels = [
    "Strongly Disagree",
    "Disagree",
    "Somewhat Disagree",
    "Neutral",
    "Somewhat Agree",
    "Agree",
    "Strongly Agree"];

let likertTrial = {
    type: jsPsychSurveyLikert,
    preamble: 'Rate the following...',
    randomize_question_order: true,
    questions: [
        {
            prompt: "Poor people today have it easy because they can get government benefits without doing anything good in return.",
            labels: labels
        },
        {
            prompt: "The government today can’t afford to do much more to help the needy.",
            labels: labels
        },
        {
            prompt: "Black people who can’t get ahead in this country are mostly responsible for their own condition.",
            labels: labels
        },
        {
            prompt: "Immigrants today strengthen our country because of their hard work and talents.",
            labels: labels
        },
        {
            prompt: "Good diplomacy is the best way to ensure peace.",
            labels: labels
        },
        {
            prompt: "Business corporations make too much profit.",
            labels: labels
        },
        {
            prompt: "Stricter environmental laws and regulations are worth the cost.",
            labels: labels
        },
        {
            prompt: "Homosexuality should be accepted by society.",
            labels: labels
        },
    ]
}
timeline.push(likertTrial);


// DEBRIEF
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you for participating!</h1> 
    <p>You can close this tab.</p>
    `,
    choices: ['NO_KEYS'],
};
timeline.push(debriefTrial);

jsPsych.run(timeline);


