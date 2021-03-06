let clientSocket = io();

clientSocket.on("connect", newConnection);

function newConnection() {
  console.log(clientSocket.id);
}

let easycam;
let stars = [];

let speed;
let plant;
let surface1;
let surface2;
let surface3;
let cam;

function preload() {
  plant = loadModel("./addons/Senza nome.obj");
  surface3 = loadImage("./addons/2k_mercury.jpeg");
  surface2 = loadImage("./addons/4k_ceres_fictional.jpeg");
  surface1 = loadImage("./addons/4k_eris_fictional.jpeg");
}
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  easycam = createEasyCam();
  easycam = new Dw.EasyCam(this._renderer);
  // easycam = new Dw.EasyCam(this._renderer, {
  //   distance: 100,
  //   center: [100, 100, 100],
  // });
  easycam = new Dw.EasyCam(this._renderer, {
    distance: 1500,
    center: [0, 0, 0],
    rotation: [0, 0, 0, 1],
  });
  for (let i = 0; i < 400; i++) {
    stars[i] = new Star1();
  }
  cam = createCapture(VIDEO);
  cam.hide();
}

function draw() {
  speed = 5; //map(mouseY, 0, height, 5, 5);
  background(0, 0, 10);
  pointLight(255, 255, 255, 1500, 1500, 0);
  pointLight(250, 255, 200, -1500, 0, -300);
  // translate(width / 2, height / 2);
  for (let i = 0; i < stars.length; i++) {
    rotateY(PI / 3);
    stars[i].update();
    stars[i].show();
    push();
    rotateY(PI / 4);
    stars[i].update();
    stars[i].show();
    pop();
    push();
    rotateX(PI / 4);
    stars[i].update();
    stars[i].show();
    pop();
  }
  noStroke();
  push();
  texture(cam);

  scale(-1, 1);
  rotateZ(PI);
  sphere(150);

  pop();
  push();
  texture(surface2);
  translate(400, 50, -1000);
  sphere(100);
  pop();
  push();
  texture(surface3);
  translate(150, 0, 500);
  sphere(80);
  pop();
  push();
  translate(0, 150, 0);

  rotateX(PI / 2);

  scale(50);

  fill(200);
  model(plant);
  pop();
}

function Star1() {
  this.x = random(-width, width);
  this.y = random(-height, height);
  this.z = random(-width, width);
  this.pz = this.z;

  this.update = function () {
    this.z = this.z - speed;
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.pz = this.z;
    }
  };

  this.show = function () {
    fill(255);
    noStroke();

    var sx = map(this.x / this.z, 0, 1, 0, width);
    var sy = map(this.y / this.z, 0, 1, 0, height);

    var r = map(this.z, 0, width, 5, 0);
    ellipse(sx, sy, r, r);

    var px = map(this.x / this.pz, 0, 1, 0, width);
    var py = map(this.y / this.pz, 0, 1, 0, height);

    this.pz = this.z;

    stroke(255);
    strokeWeight(r);
    line(px, py, sx, sy);
  };
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
