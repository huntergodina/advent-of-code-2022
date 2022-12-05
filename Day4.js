const {input} = require('./input')

function rangeToArray(range) {
    return range.split("-").map(str => Number(str));
}

function arrayContains([low, high]) {
    return this[0] <= high && low <= this[1]
}

const rangePairs = input.split("\n");

Array.prototype.arrayContains = arrayContains;

console.log(rangePairs.map(pair => pair.split(",").map(rangeToArray)).filter(pair => {
    console.log(pair, pair[0].arrayContains(pair[1]))
    return pair[0].arrayContains(pair[1])
}).length)