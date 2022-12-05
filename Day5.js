const {stacks, moves} = require('./input')

//Part One
const moveRegex = /move (\d+) from (\d+) to (\d+)/;

const moveArr = moves.split('\n').map(move => {
    const found = move.match(moveRegex)
    return [found[1], found[2], found[3]]
})

var stacksArr = stacks.map(stack => stack.split(''));

function moveStacks(s, from, to) {
    const moving = s[from-1].pop();
    s[to-1].push(moving);
}

function handleMoves(s, num, from, to){
    for(let i = 0; i < num; i++){
        moveStacks(s, from, to);
    }
}

moveArr.forEach(moves => {
    handleMoves(stacksArr, moves[0], moves[1], moves[2])
});

console.log(stacksArr.map(stack => stack.pop()))

//Part Two
var stacksArrV2 = stacks.map(stack => stack.split(''));

function moveStacksV2(s, num, from, to) {
    const length = s[from-1].length;
    const moving = s[from-1].splice(length - num, length);
    s[to-1].push(...moving);
}

moveArr.forEach(moves => {
    moveStacksV2(stacksArrV2, moves[0], moves[1], moves[2]);
})

console.log(stacksArrV2.map(stack => stack.pop()))