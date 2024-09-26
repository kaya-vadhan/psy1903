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


let results = [];
function getOddNumbers(numbers) {
    for (let number in numbers) {
        if (numbers[number] % 2 == 1) {
            results.push(numbers[number]);
        }
    }
    return results;
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


