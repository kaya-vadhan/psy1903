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


let lengths = []
function getWordLengths(array) {
    for (let i = 0; i < array.length; i++) {
        let wordnumber = array[i]
        let wordlength = wordnumber.length;
        lengths.push(wordlength);
    }
    return lengths
}

let words = ['hi', 'banana', 'cherry', 'pear', 'bye'];
console.log(getWordLengths(words)); // Expected output: [5, 6, 6, 4, 5]
