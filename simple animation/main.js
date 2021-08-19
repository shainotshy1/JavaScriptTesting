
// wait for the page to finish loading with init as the callback
window.addEventListener("load", init);

// global variables
var colors;
//var x, y,dx,dy;
var balls;
var xArr,yArr,dxArr,dyArr,colors,ballColors;
var canvas,context,velocity,radius;

function init(){
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
    canvas = document.getElementById("cnv");
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    context = canvas.getContext("2d");

    radius = 12;
    velocity = 6;
    colors = ["orange","blue","red","green","yellow"];
    /*x = y = 100;    // initial x,y canvas location
    dx = dy = velocity;*/    // velocity in x and y directions

    //multiple balls with arrays
    xArr = []; //set position arrays
    yArr = [];
    dxArr = [];
    dyArr = []; //set delta arrays
    ballColors = [];
    balls = [];

    createBalls(5);
    animate();      // kick off the animation
}
//creates a certain number of balls
function createBalls(ballAmount){

  for(var i = 0;i<ballAmount;i++){
    let xPos = radius+Math.random()*(canvas.width-2*radius);
    let yPos = radius+Math.random()*(canvas.height-2*radius);

    let dxVal = (1-2*Math.round(Math.random()))*(Math.floor((velocity/2)*Math.random())+velocity/2);
    let dyVal = (1-2*Math.round(Math.random()))*(Math.floor((velocity-1)*Math.random())+velocity/2);
    let ballColor = colors[Math.floor(Math.random()*colors.length)];

    xArr.push(xPos);
    yArr.push(yPos);
    dxArr.push(dxVal);
    dyArr.push(dyVal);
    ballColors.push(ballColor);

  }

}
// every animation cycle
function animate() {
    // erase the HTMLCanvasElement
    context.clearRect(0,0,canvas.width,canvas.height);
    checkForEdges();
    update();   // update location
    draw();     // render
    requestAnimationFrame(animate); // next cycle
}

// move the circle to a new location
function update() {
    //x += dx;    // update x coordinate of location with x velocity
    //y += dy;    // update y coordinate of location with y velocity

    for(var i = 0;i<xArr.length;i++){
      xArr[i]+=dxArr[i];
      yArr[i]+=dyArr[i];
    }
}

function checkForEdges(){
  /*if(x<radius||x>canvas.width-radius){
    dx*=-1;
  }
  if(y<radius||y>canvas.height-radius){
    dy*=-1;
  }*/
  for(var i = 0;i<xArr.length;i++){
    if(xArr[i]<=radius||xArr[i]>=canvas.width-radius){
      dxArr[i]*=-1;
    }
    if(yArr[i]<=radius||yArr[i]>=canvas.height-radius){
      dyArr[i]*=-1;
    }
  }
}
// render a circle
function draw() {
    //circle(x,y,"blue");
    for(var i = 0;i<xArr.length;i++){
      circle(xArr[i],yArr[i],ballColors[i]);
    }
}
//makes a circle at a position with a certain colors
function circle(xPos,yPos,color){
  // create the circle path
  context.beginPath();    // clear old path
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
  context.arc(xPos, yPos, radius, 0, 2 * Math.PI);
  context.strokeStyle = "black";  // color to fill
  context.fillStyle = color;     // color to stroke
  context.fill();     // render the fill
  context.stroke();   // render the stroke
}
