// p5 sketch 1
// David Samuel 
// Tuesday, July 11, 2017

// var x, y, spdX, spdY;

var count;
var pos;
var spd;
var radii = [];
var gravity = [];
var friction, damping;

var number;
var img;

var scrollingY=0;
var scrollingX=100;

var emojis = [];


function setup() {
  createCanvas(800, 600);

  count = randomInt(10,200)
  // number = Math.floor(randomInt(1,2176));

  // img = loadImage("assets/images/48x48/".concat(number,".png"));
  pos = [width/2, 100];
  spd = [10,-3];
  // number = Math.floor(randomInt(1,2176));
  // img = loadImage("assets/images/48x48/".concat(number,".png"));
  emojis = loadEmojis();

  // particle setup
  // for(var i=0; i<count; i++){
    
  // }

}


function draw() {
  background(0);
  // fill(100, 255, 30);
  noFill();
  scrollingY += 1;

  

  for(var i=0; i<count; i++){
    // kiwi = new image(img, width/2, height/2);
    // ellipse(pos[i].x, pos[i].y, radii[i]*2, radii[i]*2);
    
    image(emojis[i], pos[i].x, pos[i].y, radii[i]*6, radii[i]*6);
      pos[i].x += spd[i].x;
      spd[i].y += gravity[i];
      pos[i].y += spd[i].y;
      checkCollisions(pos[i], spd[i], radii[i]);

  }

  if (scrollingY > height){
    scrollingY = 0
    scrollingX = width/4;
  }


  textSize(64);
  fill(255);
  text("Kendrick Lamar - Damn.", scrollingX, scrollingY, width, height/5);
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
  return Math.floor(Math.random() * (max - min));
}

function touchStarted() {
  setup();

}

function loadEmojis() {
    var images = []; 
    for(var i=0; i<count; i++){
      number = randomInt(505,2174);
      img = loadImage("assets/images/48x48/".concat(number,".png"));
      images.push(img);

      pos.push(new p5.Vector(mouseX, mouseY));
      spd.push(new p5.Vector(-2 + Math.random()*4, Math.random()*2));
      radii.push(random(5, 15));
      gravity.push(random(.01, .06));
      friction = .811;
      damping = .923;   
    }
  return images
}

