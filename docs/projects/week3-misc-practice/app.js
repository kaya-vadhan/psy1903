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

let age = prompt('How old are you?');
if (age < 12) {
    alert('Child');
}
if (age >= 12 && age < 18) {
    alert('Teenager');
}
if (age >= 18) {
    alert('Adult');
}

let wholenumber = prompt('Please enter a whole number');
if (wholenumber % 2 == 0) {
    alert("Your number is even");
} else if (wholenumber % 2 == 1) {
    alert("Your number is odd");
} else {
    alert("Your number is not whole");
}