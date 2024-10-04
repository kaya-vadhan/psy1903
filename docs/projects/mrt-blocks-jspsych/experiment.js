let jsPsych = initJsPsych();

let timeline = [];

// Welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Math Response Time Task!</h1> 
    <p>In this experiment, you will be shown a series of math questions.</p>
    <p>Please answer as quickly and accurately as possible.</p>
    <p>Press SPACE to begin.</p>
    `,
    choices: [' ']
};
timeline.push(welcomeTrial);

for (let condition of conditions) {
    let instructionsTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
    <h1>${condition.title}</h1> 
    <p>Press SPACE to begin.</p>
    `,
        choices: [' ']
    }
    timeline.push(instructionsTrial)
    for (let k = 0; k < 3; k++) {
        let conditionTrial = {
            type: jsPsychSurveyHtmlForm,
            preamble: `<p>What is ${condition.questions[k].num1} + ${condition.questions[k].num2}?</p>`,
            html: `<p><input type='number' name='answer' id='answer'></p>`,
            autofocus: 'answer', // id of the field we want to auto-focus on when the trial starts
            button_label: 'Submit Answer',
            data: {
                collect: true,
            },
            on_finish: function (data) {
                data.response = data.response.answer
                if (data.response == condition.questions[k].answer == true) {
                    data.correct = true;
                } else {
                    data.correct = false;
                }
                data.block = condition.questions[k].block
                data.num1 = condition.questions[k].num1
                data.num2 = condition.questions[k].num2
                data.answer = condition.questions[k].answer
            }
        }
        timeline.push(conditionTrial)
    }
};


let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you for participating!</h1> 
    <p>You can close this tab.</p>
    `,
    choices: ['NO_KEYS'],
    on_start: function () {
        let data = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'trial_index', 'plugin_version', 'collect'])
            .csv();
        console.log(data);
    }
};
timeline.push(debriefTrial);

jsPsych.run(timeline);