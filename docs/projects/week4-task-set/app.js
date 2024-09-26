function celciusToFarenheit(celcius) {
    let farenheit = (celcius * 1.8) + 32;
    return farenheit;
}

function convertTemp(temp, convertTo) {
    if (convertTo == 'f') {
        let farenheit = (temp * 1.8) + 32;
        return farenheit;
    } else {
        let celcius = (temp - 32) / 1.8;
        return celcius;
    }
}

let longestword = '';
function getLongestWord() {
    for (let word of words) {
        let wordlength = word.length;
        if (wordlength > longestword.length) {
            longestword = word;
        };
    }
    return longestword
}


let array = []
function filterNumbers(numbers, evenOrOdd) {
    for (let number in numbers) {
        if (evenOrOdd == 'even' && numbers[number] % 2 == 0) {
            array.push(numbers[number]);
        } else if (evenOrOdd == 'odd' && numbers[number] % 2 == 1) {
            array.push(numbers[number]);
        }
    }
    return array;
}

let results = {
    number: [],
    response: [],
    correct: [],
    responseTime: []
}
alert("Welcome to the even/odd response time task. You are about to see a series of numbers. If the number you see is EVEN, type the letter 'e'. If the number you see is odd, type the letter 'o'. Please answer as quickly and accurately as possible.");
for (i = 0; i < 5; i++) {
    let number = Math.floor(Math.random() * 10) + 1;
    results.number.push(number);
    let start = Date.now();
    let response = prompt('Number: ' + number + '. Type "e" if it is even or "o" if it is odd.');
    let end = Date.now();
    if (response == 'e') {
        evenorodd = 0;
    } else if (response == 'o') {
        evenorodd = 1;
    }
    results.response.push(response);
    results.correct.push((number % 2) == evenorodd);
    results.responseTime.push(end - start);
}
alert("Thank you for your time.");
console.log(results)





