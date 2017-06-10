/**
 * Created by Jolene on 2017/6/10.
 */
var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor: 0xE6E6FA});
document.body.appendChild(app.view);

var maxCount=16;
var currentCount=0

var score=0;

var style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 200,
    fontWeight: 'bold',
    fill: '#B0C4DE'
});

var basicText = new PIXI.Text('2048', style);
basicText.anchor.set(0.5);
basicText.x = app.renderer.width / 3;
basicText.y = app.renderer.height / 5;
app.stage.addChild(basicText);

var scoreText = new PIXI.Text('Score'+score, {
    fontSize:50,
    fill: '#B0C4DE'
});
scoreText.anchor.set(0.5);
scoreText.x = app.renderer.width / 7*5;
scoreText.y = app.renderer.height / 5;
app.stage.addChild(scoreText);

var grid = [];
for (var i = 0; i < 4; i++) {
    grid[i] = [0, 0, 0, 0]
}

var flushUI = function () {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            drawCell(i, j);
        }
    }
    scoreText.text='Score:'+score;
};
flushUI();


function generateRomderNumber() {
    return Math.floor(Math.random() * 4);
}

function drawCell(rowIndex, colIndex) {
    var graphics = new PIXI.Graphics();
    graphics.beginFill(getColorByNumber(grid[rowIndex][colIndex]), 1);
    graphics.drawRect(app.renderer.width / 12 + colIndex * 210, app.renderer.height / 3 + rowIndex * 210, 200, 200);
    app.stage.addChild(graphics);

    if (grid[rowIndex][colIndex] != 0) {
        var number = new PIXI.Text(grid[rowIndex][colIndex], {
            fontSize: 111,
            fill: '#adb4d2'
        });
        number.anchor.set(0.5);
        number.x = app.renderer.width / 12 + colIndex * 210 + 100;
        number.y = app.renderer.height / 3 + rowIndex * 210 + 100;
        app.stage.addChild(number);
    }
}

function getColorByNumber(number) {
    var colorValue = {
        0: 0xdcdcdc,
        2: 0xeceffe,
        4: 0xADD8E6
    };

    var color = colorValue[number];
    if (color === undefined) {
        color = 0x87CEFF;
    }
    return color;
}

function addRandomCell() {
    if(currentCount===maxCount)return;

    var rowIndex = generateRomderNumber();
    var colIndex = generateRomderNumber();

    while (grid[rowIndex][colIndex] !== 0) {
        rowIndex = generateRomderNumber();
        colIndex = generateRomderNumber();
    }

    grid[rowIndex][colIndex] = 2;
    currentCount++;
}

addRandomCell();
addRandomCell();

flushUI();


function onToRightEventHandler() {
    var isChanged = moveCellToRight();
    if (isChanged) {
        addRandomCell();
    }
    flushUI();
    if (checkGameOver()) {
        alert('Game over.');
    }
}

function onToDownEventHandler() {
    rotateArray(1);
    var isChanged = moveCellToRight();
    rotateArray(3);
    if (isChanged) {
        addRandomCell();
    }
    flushUI();
    if (checkGameOver()) {
        alert('Game over.');
    }
}
function onToLeftEventHandler() {
    rotateArray(2);
    var isChanged = moveCellToRight();
    rotateArray(2);
    if (isChanged) {
        addRandomCell();
    }
    flushUI();
    if (checkGameOver()) {
        alert('Game over.');
    }
}
function onToUpEventHandler() {
    rotateArray(3);
    var isChanged = moveCellToRight();
    rotateArray(1);
    if (isChanged) {
        addRandomCell();
    }
    flushUI();
    if (checkGameOver()) {
        alert('Game over.');
    }
}
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') {
        onToRightEventHandler();
    }

    if (event.key === 'ArrowUp') {
        onToDownEventHandler();
    }

    if (event.key === 'ArrowLeft') {
        onToLeftEventHandler();
    }

    if (event.key === 'ArrowDown') {
        onToUpEventHandler();
    }
});

var hammertime=new Hammer.Manager(document,{
    recognizers:[
        [Hammer.Swipe, {direction: Hammer.DIRECTION_ALL}]
    ]
});

hammertime.on('swiperight', function() {
    onToRightEventHandler();
});
hammertime.on('swipeup', function () {
    onToUpEventHandler();
});
hammertime.on('swipeleft', function () {
    onToLeftEventHandler();
});
hammertime.on('swipedown', function () {
    onToDownEventHandler();
});
function moveCellToRight() {
    var isChanged=false;

    for (var rowIndex = 0; rowIndex < 4; rowIndex++) {
        for (var columnIndex = 2; columnIndex >= 0; columnIndex--) {
            if (grid[rowIndex][columnIndex] === 0) continue;

            var theEmptyCellIndex = findTheFirstRightCell(rowIndex, columnIndex);
            if (theEmptyCellIndex !== -1) {
                grid[rowIndex][theEmptyCellIndex] = grid[rowIndex][columnIndex];
                grid[rowIndex][columnIndex] = 0;
                isChanged =true;
            }
            var currentIndex = theEmptyCellIndex === -1 ? columnIndex : theEmptyCellIndex;

            if (grid[rowIndex][currentIndex] === grid[rowIndex][currentIndex + 1]) {
                grid[rowIndex][currentIndex + 1] += grid[rowIndex][currentIndex];
                grid[rowIndex][currentIndex] = 0;

                score+=grid[rowIndex][currentIndex+1];

                isChanged = true;

                currentCount--;
            }

        }
    }

    return isChanged;
}

function findTheFirstRightCell(rowIndex, columnIndex) {
    for (var i = 3; i > columnIndex; i--) {
        if (grid[rowIndex][i] === 0) {
            return i;
        }
    }

    return -1;
}

function rotateArray(rotateCount) {
    for (var i = 0; i < rotateCount; i++) {
        grid = rotateArrayToRightOnce(grid);
    }

    function rotateArrayToRightOnce(array) {
        return array.map(function (row, rowIndex) {
            return row.map(function (item, columnIndex) {
                return array[3 - columnIndex][rowIndex];
            })
        })
    }
}

function checkGameOver() {
    if (currentCount !== maxCount) return false;

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (grid[i][j] === grid[i][j - 1] ||
                grid[i][j] === grid[i][j + 1] ||
                (grid[i-1] && grid[i][j] === grid[i - 1][j]) ||
                (grid[i+1] && grid[i][j] === grid[i + 1][j])
            ) {
                return false;
            }
        }
    }

    return true;
}