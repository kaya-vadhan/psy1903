let hi = 'hi'
console.log(hi)
let num1 = Math.floor(Math.random() * 10) + 1
let num2 = Math.floor(Math.random() * 10) + 1
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