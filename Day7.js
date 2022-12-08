const {input} = require('./input');

var lines = input.split('\n');

function isCommand(str) {
    return /\$ */.test(str)
}

function isDir(str) {
    return /dir */.test(str);
}

function isUpLevel(str) {
    return /cd \.\./.test(str);
}

function isDownLevel(str) {
    return /cd */.test(str);
}

function getDir(dirStr) {
    let cdFunc = dirStr.match(/cd (.+)/);
    return cdFunc ? cdFunc[1] : dirStr.match(/dir (.+)/)[1]
}

function getFile(fileStr) {
    let file = fileStr.match(/(\d+) (.+)/);
    return [file[1], file[2]]
}

var files = {"/": {}}

function recursiveAddToDir(dir, commands){
    while(commands.length !== 0){
        var command = commands.shift();
        if(isCommand(command)){
            // Remove $_ at start of command
            var commandArg = command.substring(2)
            if(isUpLevel(commandArg)){
                return;
            } else if(isDownLevel(commandArg)){
                var dirKey = getDir(commandArg)
                recursiveAddToDir(dir[dirKey], commands)
            }
        } else {
            if(isDir(command)){
                dir[getDir(command)] = {};
            } else {
                var [size, file] = getFile(command);
                dir[file] = size;
            }
        }
    }
    return
}

recursiveAddToDir(files, lines);

// Part One

function calcDirectorySize(dir) {
    var size = 0;
    var subFilesAndDirs = Object.values(dir);
    var files = subFilesAndDirs.filter(file => (typeof file) === 'string');
    var subDirs = subFilesAndDirs.filter(subDir => typeof subDir === 'object');
    size += files.reduce((partialSum, a) => partialSum + Number(a), 0);
    subDirs.forEach(subDir => size += calcDirectorySize(subDir));
    return size;
}

var dirSizes = [];

function recursiveAddSizes(dir) {
    for(entry of Object.entries(dir)){
        if (typeof entry[1] !== 'string'){
            dirSizes.push([entry[0],calcDirectorySize(entry[1])]);
            recursiveAddSizes(entry[1]);
        }
    }
}

recursiveAddSizes(files);

console.log(dirSizes
    .filter(dirSize => dirSize[1] <= 100000)
    .reduce((pSum, a) => pSum + a[1], 0));

// Part Two

const occupied = calcDirectorySize(files);
const total = 70000000;
const needed = 30000000;
const available = total - occupied;

console.log(dirSizes
    .filter(dirSize => dirSize[1] >= needed - available)
    .sort((a,b) => a[1]-b[1])[0][1]);