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
    let conditionTrial = {
        type: jsPsychSurveyHtmlForm,
        preamble: `<p>What is ${condition.num1} + ${condition.num2}?</p>`,
        html: `<p><input type='number' name='answer' id='answer'></p>`,
        autofocus: 'answer', // id of the field we want to auto-focus on when the trial starts
        button_label: 'Submit Answer',
        data: {
            collect: true,
        },
        on_finish: function (data) {
            if (data.response == condition.answer == true) {
                data.correct = true;
            } else {
                data.correct = false;
            }
            data.num1 = condition.num1
            data.num2 = condition.num2
            data.answer = condition.answer
        }
    }
    timeline.push(conditionTrial);
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