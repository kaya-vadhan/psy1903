let start1 = Date.now();
let number1 = Math.floor(Math.random() * 10) + 1
let number2 = Math.floor(Math.random() * 10) + 1
let accuracy = '';

// Create variables to store references to elements on the page
let form = document.getElementsByTagName('form')[0];
let results = document.getElementById('results');
let question = document.getElementById('question');

question.innerHTML = "Answer this equation as quickly and accurately as you can. What is " + number1 + " + " + number2 + "?";

// Listen for the form to be submitted
form.addEventListener('submit', function (event) {

    // Prevent the default form submission b
    event.preventDefault();

    // Collect the response
    let response = form.elements['response'].value;
    if (response == number1 + number2) {
        accuracy = 'correct';
    } else {
        accuracy = 'incorrect';
    }
    let end1 = Date.now();
    let time = (end1 - start1) / 1000;


    // Clear Page
    form.style.display = 'none';

    // Report the results
    results.innerHTML = "You answered " + response + " (" + accuracy + ") " + "in " + time + " seconds";
});

