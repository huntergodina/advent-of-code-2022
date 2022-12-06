const input = "Redacted Puzzle Input :)";

function isMarker(strArr) {
    return strArr.length === 0 ?
        false :
        strArr.find(chr => strArr.filter(chr2 => chr2 == chr).length > 1) === undefined;
}

const splitInput = input.split('');

//Part One

var response = [];
var startIndex = 0;

while(!isMarker(response)){
    response = splitInput.slice(startIndex, startIndex+4);
    startIndex++;
}

console.log("Start Marker @: " + (startIndex + 3))

//Part Two

var response = [];
var startIndex = 0;

while(!isMarker(response)){
    response = splitInput.slice(startIndex, startIndex+14);
    startIndex++;
}

console.log("Message Marker @: " + (startIndex + 13))