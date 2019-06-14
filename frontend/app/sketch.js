// Angry Birds
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/138-angry-birds.html
// https://youtu.be/TDQzoe9nslY

const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;

let ground;
const boxes = [];
let bird;
let world, engine;
let mConstraint;
let slingshot;

let dotImg;
let boxImg;
let bkgImg;


// Screen size
let width = window.innerWidth;
let height = window.innerHeight;

// Aspect ratio (Ratio * width = height)
let ratio = 0.5625;

// Object scaler
let objScale = 1;
let vmin = Math.min(window.innerHeight, window.innerWidth)
objScale = vmin / 1080;

// Position of bird
let posBird = [canvas.width / 8, canvas.height / 2]
let canvas;

function preload() {
  dotImg = loadImage(Koji.config.images.dot);
  boxImg = loadImage(Koji.config.images.box);
  bkgImg = loadImage(Koji.config.images.bg);
}

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerWidth * ratio);
  canvas.parent('sketch');
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width / 2, height - 10, width, 20);
  for (let i = 0; i < 3; i++) {
    boxes[i] = new Box(450, 300 - i * 75, 84, 100);
  }
  bird = new Bird(posBird[0], posBird[1], Koji.config.strings.radius  * objScale);

  slingshot = new SlingShot(posBird[0], posBird[1], bird.body);

  const mouse = Mouse.create(canvas.elt);
  const options = {
    mouse: mouse,
  }

  // A fix for HiDPI displays
  mouse.pixelRatio = pixelDensity();
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
}

function keyPressed() {
  if (key == ' ') {
    resetSketch();
  }
}

function mouseReleased() {
  setTimeout(() => {
    slingshot.fly();
    
  }, 150);
}

function draw() {
  background(bkgImg);
  Matter.Engine.update(engine);
  ground.show();
  for (let box of boxes) {
    box.show();
  }
  slingshot.show();
  bird.show();
}

// Resize canvas automatically and reset
function windowResized() {
  resizeCanvas(window.innerWidth, window.innerWidth * ratio);
  resetSketch();
}

function resetSketch() {
  World.remove(world, bird.body);
  bird = new Bird(150, 300, Koji.config.strings.radius);
  slingshot.attach(bird.body);
}