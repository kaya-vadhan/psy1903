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

let longestword = ''
function getLongestWord(array) {
    for (let i = 0; i < array.length; i++) {
        let word = array[i]
        let wordlength = word.length;
        if (wordlength > longestword.length) {
            longestword = word;
        };
    }
    return longestword
}

let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];
console.log(getLongestWord(words)); // Expected output: banana
