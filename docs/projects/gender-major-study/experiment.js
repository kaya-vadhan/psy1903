let jsPsych = initJsPsych();
let timeline = [];

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

// PRIMER
let primer = ['stereotypical', 'atypical'];

console.log(initJsPsych().randomization.primer);

let primerTrial = {
    type: jsPsychSurveyHtmlForm,
    preamble: `
    <p>INSTRUCTIONS</p>,
    <img src='images/${initJsPsych().randomization.primer}.png'>
    `,
    html: `<p><input type='text' name='answer' id='answer'></p>`,
    autofocus: 'answer', // id of the field we want to auto-focus on when the trial starts
    button_label: 'Submit Answer',
}
timeline.push(primerTrial);

jsPsych.run(timeline);


