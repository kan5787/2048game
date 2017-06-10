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

var basicText = new PIXI.Text('2048',style);
basicText.x = app.renderer.width/12;
basicText.y = app.renderer.height/5;

app.stage.addChild(basicText);
var grid=[];
for(var i=0;i<4;i++){
    grid[i]=[0,0,0,0]
}

for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
        drawCell(i,j);
    }
}

function generateRomderNumber() {
    return Math.floor(Math.random()*4);
}

function drawCell(rowIndex,colIndex) {
    var color=0xdcdcdc;
    if(grid[rowIndex][colIndex]===2){
        color=0xeceffe;
    }
    var graphics = new PIXI.Graphics();
    graphics.beginFill(color, 1);
    graphics.drawRect(app.renderer.width / 12 + colIndex * 210, app.renderer.height / 3 + rowIndex * 210, 200, 200);
    app.stage.addChild(graphics);

    if(grid[rowIndex][colIndex]!=0){
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

var rowIndex=generateRomderNumber();
var colIndex=generateRomderNumber();

grid[rowIndex][colIndex]=2;

drawCell(rowIndex,colIndex);

