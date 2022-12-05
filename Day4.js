const {input} = require('./input')

function rangeToArray(range) {
    return range.split("-").map(str => Number(str));
}

function overlapsWith([low, high]) {
    return this[0] <= high && low <= this[1]
}

const rangePairs = input.split("\n");

Array.prototype.overlapsWith = overlapsWith;

console.log(rangePairs.map(pair => pair.split(",").map(rangeToArray)).filter(pair => {
    return pair[0].overlapsWith(pair[1])
}).length)
