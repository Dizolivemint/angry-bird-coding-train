// Angry Birds
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/138-angry-birds.html
// https://youtu.be/TDQzoe9nslY

const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint, Render, Events } = Matter;

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

let canvas;
let posBird;
let posBox;

let rock;

function preload() {
  dotImg = loadImage(Koji.config.images.dot);
  boxImg = loadImage(Koji.config.images.box);
  bkgImg = loadImage(Koji.config.images.bg);
}

function setup() {
  height = window.innerWidth * ratio;
  width = window.innerWidth;
  console.log(width, height)
  if (height > window.innerHeight) {
    height = window.innerHeight;
    width = height / ratio;
    console.log(width, height)
  }
  canvas = createCanvas(width, height);
  canvas.parent('sketch');

  // Create engine
  engine = Engine.create();
  world = engine.world;

  // Responsive positions
  posBird = [canvas.width / 4, canvas.height / 1.4];
  posBox = [canvas.width / 1.2, canvas.height / 1.1];

  ground = new Ground(width / 2, height - 10, width, 20);
  for (let i = 0; i < 3; i++) {
    boxes[i] = new Box(posBox[0], posBox[1] - i * 75, 84 * objScale, 100 * objScale);
  }
  bird = new Bird(posBird[0], posBird[1], Koji.config.strings.radius  * objScale);

  slingshot = new SlingShot(posBird[0], posBird[1], bird.body, objScale);

  const mouse = Mouse.create(canvas.elt);
  const options = {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
          visible: false
      }
    }
  }

  // A fix for HiDPI displays
  mouse.pixelRatio = pixelDensity();
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
}

function keyPressed() {
  if (key == ' ') {
    location.reload()

    //*** Original from tutorial ***//
    // World.remove(world, bird.body);
    // bird = new Bird(150, 300, 25);
    // slingshot.attach(bird.body);
  }
}

function mouseReleased() {
  // Check if the bird is being launched
  if (mConstraint.body != bird.body) { return };

  // A different method from the tutorial video
  Events.on(engine, 'afterUpdate', function() {
        if (mConstraint.mouse.button === -1 && (bird.body.position.x > 190 * objScale || bird.body.position.y < 430 * objScale)) {
            let birdB = new Bird(posBird[0], posBird[1], Koji.config.strings.radius * objScale);
            slingshot.attach(birdB.body);
            slingshot.fly();
            World.remove(world, birdB.body);
        }
    });

    //*** Original from tutorial ***//
    // setTimeout(() => {
    //   slingshot.fly();
    // }, 100);
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
  location.reload()
}