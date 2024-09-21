let num1 = Math.random()
let num2 = Math.random()
let sum = num1 + num2

let response = prompt('What is ' + num1 + ' + ' + num2 + ' ?');

let feedback = '';

if (response == sum) {
    feedback = 'Correct!';
} else if (response == (sum - 1) || response == (sum + 1)) {
    feedback = 'You were close!';
} else {
    feedback = 'Incorrect.';
}

alert(feedback + ' The expected answer is ' + sum);