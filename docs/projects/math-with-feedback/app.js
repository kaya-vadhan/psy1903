alert("In this experiment we will measure your response time. You will be shown a series of simple math equations. Answer these equations as quickly and accurately as you can");

let start1 = Date.now();
let number1 = Math.floor(Math.random() * 10) + 1
let number2 = Math.floor(Math.random() * 10) + 1
let response1 = prompt("What is " + number1 + " + " + number2 + "?");
let end1 = Date.now();
let time1 = (end1 - start1) / 1000;
let accuracy1 = '';
if (response1 == number1 + number2) {
    accuracy1 = 'correct';
} else {
    accuracy1 = 'incorrect';
}
alert("You answered " + response1 + " (" + accuracy1 + ") " + "in " + time1 + " seconds");

let start2 = Date.now();
let number3 = Math.floor(Math.random() * 10) + 1
let number4 = Math.floor(Math.random() * 10) + 1
let response2 = prompt("What is " + number3 + " + " + number4 + "?");
let end2 = Date.now();
let time2 = (end2 - start2) / 1000;
let accuracy2 = '';
if (response2 == number3 + number4) {
    accuracy2 = 'correct';
} else {
    accuracy2 = 'incorrect';
}
alert("You answered " + response2 + " (" + accuracy2 + ") " + "in " + time2 + " seconds");

let start3 = Date.now();
let number5 = Math.floor(Math.random() * 10) + 1
let number6 = Math.floor(Math.random() * 10) + 1
let response3 = prompt("What is " + number5 + " + " + number6 + "?");
let end3 = Date.now();
let time3 = (end3 - start3) / 1000;
let accuracy3 = '';
if (response3 == number5 + number6) {
    accuracy3 = 'correct';
} else {
    accuracy3 = 'incorrect';
}
alert("You answered " + response3 + " (" + accuracy3 + ") " + "in " + time3 + " seconds");