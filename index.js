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
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0xDCDCDC, 1);
        graphics.drawRect(app.renderer.width/12+j*210, app.renderer.height/3+i*210, 200, 200);
        app.stage.addChild(graphics);
    }
}

function generateRomderNumber() {
    return Math.floor(Math.random()*4);
}

var x=generateRomderNumber();
var y=generateRomderNumber();

var graphics = new PIXI.Graphics();
graphics.beginFill(0xeceffe, 1);
graphics.drawRect(app.renderer.width/12+x*210, app.renderer.height/3+y*210, 200, 200);
app.stage.addChild(graphics);

var number = new PIXI.Text('2',{
    fontSize: 180,
    fill: '#adb4d2'
});
number.anchor.set(0.5);
number.x = app.renderer.width/12+x*210+100;
number.y = app.renderer.height/3+y*210+100;
app.stage.addChild(number);
