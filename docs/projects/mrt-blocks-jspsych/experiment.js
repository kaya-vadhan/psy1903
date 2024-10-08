let jsPsych = initJsPsych();

let timeline = [];

// Welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1><span class = 'title'>Welcome to the Math Response Time Task!</span></h1> 
    <p>In this experiment, you will be shown a series of math questions.</p>
    <p>Please answer as quickly and accurately as possible.</p>
    <p>Press <span class='key'>SPACE</span> to begin.</p>
    `,
    choices: [' ']
};
timeline.push(welcomeTrial);

let likertTrial = {
    type: jsPsychSurveyLikert,
    questions: [
        {
            prompt: "I enjoy solving math problems.",
            labels: [
                "Strongly Disagree",
                "Disagree",
                "Neutral",
                "Agree",
                "Strongly Agree"
            ]
        },
        {
            prompt: "I find math easy.",
            labels: [
                "Strongly Disagree",
                "Disagree",
                "Neutral",
                "Agree",
                "Strongly Agree"
            ]
        }
    ]
}
timeline.push(likertTrial);

for (let condition of conditions) {
    let instructionsTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
    <h1>${condition.title}</h1> 
    <p>Press <span class='key'>SPACE</span> to begin.</p>
    `,
        choices: [' ']
    }
    timeline.push(instructionsTrial)
    for (let k = 0; k < 3; k++) {
        let conditionTrial = {
            type: jsPsychSurveyHtmlForm,
            preamble: `<p>What is <span class ='equation'><span class ='numbers'>${condition.questions[k].num1}</span> + <span class ='numbers'>${condition.questions[k].num2}</span></span>?</p>`,
            html: `<p><input type='text' name='answer' id='answer'></p>`,
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

let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
        <h1>Please wait...</h1>
        <p>We are saving the results of your inputs.</p>
        `,
    on_start: function () {
        //  ⭐ Update the following three values as appropriate ⭐
        let prefix = 'mrt';
        let dataPipeExperimentId = 'your-experiment-id-here';
        let forceOSFSave = false;

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'trial_index', 'plugin_version', 'collect'])
            .csv();

        // Generate a participant ID based on the current timestamp
        let participantId = new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-');

        // Dynamically determine if the experiment is currently running locally or on production
        let isLocalHost = window.location.href.includes('localhost');

        let destination = '/save';
        if (!isLocalHost || forceOSFSave) {
            destination = 'https://pipe.jspsych.org/api/data/';
        }

        // Send the results to our saving end point
        fetch(destination, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
            body: JSON.stringify({
                experimentID: dataPipeExperimentId,
                filename: prefix + '-' + participantId + '.csv',
                data: results,
            }),
        }).then(data => {
            console.log(data);
            jsPsych.finishTrial();
        })
    }
}
timeline.push(resultsTrial);

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