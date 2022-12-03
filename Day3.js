const {puzzleInput, priorities} = require('./input')
const sacks = puzzleInput.split("\n");

var total = 0;

getBadgePriority = (group) => {
    let char = group[0].split('').find(element => group[1].includes(element) && group[2].includes(element));
    return priorities.split('').indexOf(char)+1;
}

while(sacks.length) {
    const group = sacks.splice(0,3);
    total += getBadgePriority(group)
}

console.log(total);
