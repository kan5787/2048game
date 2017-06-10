/**
 * Created by Jolene on 2017/6/10.
 */
var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor: 0xE6E6FA});
document.body.appendChild(app.view);

var style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 200,
    fontWeight: 'bold',
    fill: '#B0C4DE'
});

var basicText = new PIXI.Text('2048', style);
basicText.x = app.renderer.width / 12;
basicText.y = app.renderer.height / 5;

app.stage.addChild(basicText);
var grid = [];
for (var i = 0; i < 4; i++) {
    grid[i] = [0, 0, 0, 0]
}

var flushUI=function () {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            drawCell(i, j);
        }
    }
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
            fontSize: 180,
            fill: '#adb4d2'
        });
        number.anchor.set(0.5);
        number.x = app.renderer.width / 12 + colIndex * 210 + 100;
        number.y = app.renderer.height / 3 + rowIndex * 210 + 100;
        app.stage.addChild(number);
    }
}

function getColorByNumber(number) {
    var colorValue={
        0:0xdcdcdc,
        2:0xeceffe,
        4:0xADD8E6
    };
    return colorValue[number];
}

for(var i=0;i<5;i++){
    var rowIndex = generateRomderNumber();
    var colIndex = generateRomderNumber();

    grid[rowIndex][colIndex] = 2;

    drawCell(rowIndex, colIndex);
}



document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') {
        moveCellToRight();
        flushUI();
    }
});

function moveCellToRight() {
    for (var rowIndex = 0; rowIndex < 4; rowIndex++) {
        for (var columnIndex = 2; columnIndex >= 0; columnIndex--) {
            if (grid[rowIndex][columnIndex] === 0) continue;

            var theEmptyCellIndex = findTheFirstRightCell(rowIndex, columnIndex);
            if (theEmptyCellIndex !== -1) {
                grid[rowIndex][theEmptyCellIndex] = grid[rowIndex][columnIndex];
                grid[rowIndex][columnIndex] = 0;

            }
            var currentIndex = theEmptyCellIndex === -1 ? columnIndex : theEmptyCellIndex;

            if (grid[rowIndex][currentIndex] === grid[rowIndex][currentIndex + 1]) {
                grid[rowIndex][currentIndex+ 1] += grid[rowIndex][currentIndex];
                grid[rowIndex][currentIndex] = 0;
            }

        }
    }
}

function findTheFirstRightCell(rowIndex, columnIndex) {
    for (var i = 3; i > columnIndex; i--) {
        if (grid[rowIndex][i] === 0) {
            return i;
        }
    }

    return -1;
}