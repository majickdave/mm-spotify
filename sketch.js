// p5 sketch 1
// David Samuel 
// Tuesday, July 11, 2017

// var x, y, spdX, spdY;

var count = 200;
var pos = [];
var spd = [];
var radii = [];
var gravity = [];
var friction, damping;

var number;
var img;
var images = []; 


function setup() {
  createCanvas(1200,800);
  background(255);

  // number = Math.floor(randomInt(1,2176));

  // img = loadImage("assets/images/48x48/".concat(number,".png"));
  pos = [];
  spd = [];
  number = Math.floor(randomInt(1,2176));
  img = loadImage("assets/images/48x48/".concat(number,".png"));

  // particle setup
  for(var i=0; i<count; i++){
    pos.push(new p5.Vector(mouseX, mouseY));
    spd.push(new p5.Vector(-2 + Math.random()*4, Math.random()*2));
    radii.push(random(5, 10));
    gravity.push(random(.01, .06));
    friction = .875;
    damping = .786;
  }

  

}

function draw() {
  background(255);
  // fill(100, 255, 30);
  
  for(var i=0; i<count; i++){
  	// kiwi = new image(img, width/2, height/2);
    // ellipse(pos[i].x, pos[i].y, radii[i]*2, radii[i]*2);
    
    image(img, pos[i].x, pos[i].y, radii[i]*6, radii[i]*6);
      pos[i].x += spd[i].x;
      spd[i].y += gravity[i];
      pos[i].y += spd[i].y;
      checkCollisions(pos[i], spd[i], radii[i]);
  }
  fill(255);
  textSize(64);

  text("Welcome to Music Translational Software", width/2, height/2, width/6, height/3);

}

function checkCollisions(pos, spd, rad){
 if (pos.x > width-rad){
   spd.x *= -1;
 }else if (pos.x < rad){
   spd.x *= -1;
 }

 if (pos.y > height-rad){
  pos.y = height-rad;
   spd.y *= -1;
   spd.y *= damping;
   spd.x *= friction;
 }
}

function randomInt(min, max) {
  return Math.random() * (max - min) + min;
}

function touchStarted() {
  setup();

}

