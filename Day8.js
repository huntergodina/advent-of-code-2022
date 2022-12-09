const {input} = require('./input')

const trees = input.split('\n').map(row => row.split(''));

// Part One

function isVisible(grid, row, col) {
    return isVisibleLeft(grid,row,col) ||
     isVisibleRight(grid,row,col) ||
     isVisibleDown(grid,row,col) || 
     isVisibleUp(grid,row,col);
}

function isVisibleLeft(grid, row, col){
    for(let i = 0; i < col; i++){
        if(grid[row][i] >= grid[row][col]){
            return false;
        }
    }
    return true;
}

function isVisibleRight(grid, row, col){
    for(let i = grid[row].length-1; i > col; i--){
        if(grid[row][i] >= grid[row][col]){
            return false;
        }
    }
    return true;
}

function isVisibleUp(grid, row, col){
    for(let i = 0; i < row; i++){
        if(grid[i][col] >= grid[row][col]){
            return false;
        }
    }
    return true;
}

function isVisibleDown(grid, row, col){
    for(let i = grid[col].length-1; i > row; i--){
        if(grid[i][col] >= grid[row][col]){
            return false;
        }
    }
    return true;
}

const numVisible = trees.reduce(
    (count, row, rowIndex) => count + row.filter(
        (_, colIndex) => isVisible(trees, rowIndex, colIndex)).length,
        0);

console.log(numVisible)

// Part Two

function scoreVisible(grid, row, col) {
    return scoreVisibleLeft(grid,row,col) *
     scoreVisibleRight(grid,row,col) *
     scoreVisibleDown(grid,row,col) * 
     scoreVisibleUp(grid,row,col);
}

function scoreVisibleLeft(grid, row, col){
    let visible = 0;
    for(let i = col - 1; i >= 0; i--){
        visible++;
        if(grid[row][i] >= grid[row][col]){
            return visible;
        }
    }
    return visible;
}

function scoreVisibleRight(grid, row, col){
    let visible = 0;
    for(let i = col + 1; i < grid[row].length; i++){
        visible++;
        if(grid[row][i] >= grid[row][col]){
            return visible;
        }
    }
    return visible;
}

function scoreVisibleUp(grid, row, col){
    let visible = 0;
    for(let i = row - 1; i >= 0; i--){
        visible++;
        if(grid[i][col] >= grid[row][col]){
            return visible;
        }
    }
    return visible;
}

function scoreVisibleDown(grid, row, col){
    let visible = 0;
    for(let i = row + 1; i < grid[col].length; i++){
        visible++;
        if(grid[i][col] >= grid[row][col]){
            return visible;
        }
    }
    return visible;
}

const mostVisible = Math.max(...trees.map((row, rowIndex) => 
    Math.max(...row.map((_, colIndex) => 
        scoreVisible(trees, rowIndex, colIndex)
    ))
));

console.log(mostVisible)