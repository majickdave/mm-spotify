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

var scrollingX = 640;

var emojis = [];

var bg;

// var emojiFont;
// function preLoadFont() {
//   emojiFont = loadFont('assets/fonts/Apple Color Emoji.ttc');

// }

function setup() {
  bg = loadImage("assets/images/kendrick2.jpg");
  var canvas = createCanvas(480, 480);
  canvas.parent('sketch-holder');

  count = Math.floor(random(6,28));

  
  // number = Math.floor(randomInt(1,2176));

  // img = loadImage("assets/images/48x48/".concat(number,".png"));
  pos = [width, mouseY];
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

  image(bg, 0, 0, 480, 480, 160, 160, 320, 320);
  // fill(100, 255, 30);
  
  scrollingX -= 2;

  
  
  for(var i=0; i<count; i++){
    // kiwi = new image(img, width/2, height/2);
    // ellipse(pos[i].x, pos[i].y, radii[i]*2, radii[i]*2);
    
      pos[i].x += spd[i].x;
      spd[i].y += gravity[i];
      pos[i].y += spd[i].y;
      tint(255, pos[i].x-width/width*1);
      image(emojis[i], pos[i].x, pos[i].y, radii[i]*6, radii[i]*6);
      
      checkCollisions(pos[i], spd[i], radii[i]);
  }

  if (scrollingX < -width){
    scrollingX = width*2;
  }


  noTint();
  textSize(48);
  // fill(0);
  // rect(0, height-64, width, 64);
  image(bg, scrollingX-64, height-64, 64, 64);
  fill(255);
  text("Kendrick Lamar - DNA.", scrollingX, height-10);
}

function checkCollisions(pos, spd, rad){
 // if (pos.x > width-rad){
 //   spd.x *= -1;
 // }else if (pos.x < rad){
 //   spd.x *= -1;
 // }

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
      number = randomInt(493,2174);
      img = loadImage("assets/images/48x48/".concat(number,".png"));
      images.push(img);

      pos.push(new p5.Vector(mouseX, mouseY));
      spd.push(new p5.Vector(-4 + Math.random()*2, -2 + Math.random()*2));
      radii.push(random(5, 10));
      gravity.push(random(.01, .06));
      friction = .811;
      damping = .923;   
    }
  return images
}

