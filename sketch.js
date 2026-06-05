//Emergent: a series of animations by EL Putnam

let mgr;

function setup() {
  let cnv = createCanvas(windowWidth*.9, windowHeight*.6);
  cnv.parent('canvas-container');
  colorMode(HSB, 360, 100, 100, 100);
  frameRate(60); // Run loop fast; each scene throttles itself via millis()
  mgr = new SceneManager();

  mgr.addScene(Progress);
  mgr.addScene(AngstyGeomtries);
  mgr.addScene(CautiousDrug);
  mgr.addScene(KindlyNotions);
  mgr.addScene(BurnOut);
  mgr.addScene(AfterImage);
  mgr.addScene(BroadPixie);
  mgr.showNextScene();
}

function draw() {
  mgr.draw();
}

function mousePressed() {
  changeScene();
}

function changeScene() {
  //mgr.showNextScene();
  let chance = floor(random(1,7.9));

    if (chance == 1){
    mgr.showScene(BurnOut);
    } else if (chance == 2){
      mgr.showScene(AngstyGeomtries);
    } else if (chance == 3) {
      mgr.showScene(CautiousDrug);
    } else if (chance == 4) {
      mgr.showScene(KindlyNotions);
     } else if (chance == 5){
      mgr.showScene(Progress);
     } else if (chance == 6){
      mgr.showScene(AfterImage);
    } else if (chance == 7){
      mgr.showScene(BroadPixie);
  }
}
// Returns true only when enough time has passed for the desired fps
function throttle(lastMs, fps) {
  return millis() - lastMs >= 1000 / fps;
}

//========================================================================
//=========================Scenes=========================================
//========================================================================

//==================Progress=======================================

function Progress(){
  let x1, y1, x2, y2;
let change1 = 0;
let change2;
let x1speed = 2;
let y1speed = -1.25;
let x2speed = 1;
let y2speed = -0.75;

this.setup = function() {
  //background(0);
  x1 = 0;
  y1 = height;
  x2 = 30;
  y2 = height-30;
  change2 = change1 + 180;
}

this.draw = function() {
  //strokeWeight(3);
  background(0, 0.1);
  //background(change2, 100, 100, 0.5);
  noStroke();
  fill(255);
  ellipse(x1, y1, 10);
  //fill(change1, 100, 100, 10);
  //ellipse(x2, y2, random(100));
  fill(change1, random(100), random(100));
  for (let i = 0; i < 4; i++)
    ellipse(x2 + random(-50, 50), y2 + random(-50, 50), 5);
  x1 += x1speed;
  y1 += y1speed;
  this.parameters2();
  
  // if (x2 > width*.1){
    x2 += random(-1, 5) * x2speed;
     y2 += random(-1, 5) * y2speed;
//  } else {
//      x2 += random(-1, 5) * x2speed;
//      y2 += random(-5, 1) * y2speed;
//  }

 if (change1 > 360){
  change1 = 0;
}

if (change1 < 180){
change2 = change1 + 180;
  } else {
    change2 = change1 - 180;
  }
  
}

this.parameters1 = function(){

 if (x1 >= width || x1 <= 0 ){
   //background(10, 10);
   x1 *= 0;
   y1 = random(height)
 }
 if (y1 < 0){
   //background(10, 10);
   x1 = 0;
   y1 = random(height);
 }

 if (x2 >= width){
   //background(10, 10);
   x2 = 0;
   y2 = random(height);
   change1 += 10;
 }
 if (y2 < 0){
  // background(10, 10);
   x2 = 0;
   y2 = random(height);
   change1 += 10;
 }



}

this.parameters2 = function(){
  if ((x1 > width) || (x1 < 0)){
    x1speed *= -1;
    background(change2, 50, 100, 25);
    //change2 = random(1, 255);
  }
  if ((y1 > height) || (y1 < 0)){
    background(change2, 50, 100, 25);
    y1speed *= -1;
  }

  if ((x2 > width-30) || x2 < 30){
    //background(10, 10);
    x2speed *= -1;
    change1 += 10;
  }
  if ((y2 < 30) || (y2 > height-30)){
   // background(10, 10);
    y2speed *= -1;
    change1 += 10;
  }
}
}

//==================Burn Out=======================================

function BurnOut() {
  let tileCount;
  let x;
  let change;
  let lastMs = 0;
  const FPS = 20;

  this.setup = function () {
    colorMode(HSB, 360, 100, 100, 100);
    x = 1;
    lastMs = millis();
    change = int(random(500, 2000));
  }

  this.draw = function () {
    if (!throttle(lastMs, FPS)) return;
    lastMs = millis();
    frameCount++;

    background(0, 1);
    noStroke();
    fill(0);
    rectMode(CENTER);
    rect(width / 2, random(height), width, random(50));
    tileCount = width * random(0.001, 0.03);
    fill(0);
    rect(random(width), random(height), random(100));

    if (frameCount % 30 == 0) {
      this.grid();
    }
    x += 1;

    if (frameCount == change) {
      changeScene();
    }
  }

  this.grid = function () {
    for (let gridY = 0; gridY < tileCount; gridY++) {
      for (let gridX = 0; gridX < tileCount; gridX++) {
        let posX = (width / tileCount) * gridX;
        let posY = (height / tileCount) * gridY;
        noStroke();
        rectMode(CORNER);
        var toggle = floor(random(2));
        if (toggle == 1) {
          fill(0, 0);
          rect(posX, posY, width / tileCount, height / tileCount);
        } else {
          fill(100, random(100), 100);
          rect(posX, posY, width / tileCount, height / tileCount);
        }
      }
    }
  }
}

//==================Angsty Geometries=======================================

function AngstyGeomtries() {
  let deg = 0;
  let alf = 10;
  const MIN_B = 0; MAX_B = 100;
  let inc1 = 1;
  let inc2 = 0.01;
  let x = 0;
  let y = 0;
  let change;
  let lastMs = 0;
  const FPS = 20;

  this.setup = function () {
    colorMode(HSB, 360, 100, 100, 100);
    lastMs = millis();
    change = int(random(500, 2000));
  }

  this.draw = function () {
    if (!throttle(lastMs, FPS)) return;
    lastMs = millis();
    frameCount++;

    background(0, alf);
    translate(width / 2, height / 2);
    rotate(deg);

    for (let i = 0; i < 30; i++) {
      rectMode(CENTER);
      fill(180, random(100), random(100), random(10));
      stroke(random(255));
      rotate(i + deg * 0.05);
      rect(x, y, 10 * i);
      noStroke();
      fill(random(300, 360), 100, 100, 50);
      ellipse(random(50, 250), 0, 50);
    }

    alf -= inc1;
    deg -= inc2;

    if (alf == MIN_B || alf == MAX_B) {
      inc1 *= -1;
      x = random(width / 3);
      y = random(height / 3);
    }

    if (frameCount == change) {
      changeScene();
    }
  }
}

//==================Cautious Drug=======================================

function CautiousDrug() {
  let bright1 = 0;
  let bright2 = 100;
  let inc1 = 1;
  let inc2 = -1;
  let wid;
  let heig;
  const MIN_B = 0; MAX_B = 100;
  let deg = 0;
  let tileCount;
  let change;
  let lastMs = 0;
  const FPS = 15;

  this.setup = function () {
    wid = width;
    heig = height;
    colorMode(HSB, 360, 100, 100, 100);
    tileCount = (height * .08);
    lastMs = millis();
    change = int(random(500, 2000));
  }

  this.draw = function () {
    if (!throttle(lastMs, FPS)) return;
    lastMs = millis();
    frameCount++;

    background(100, 100, bright1, 1);

    noStroke();
    fill(random(360), bright2, 100);
    push();
    translate(width / 2, height / 2);
    rotate(deg);
    rectMode(CENTER);
    rect(0, 0, wid, heig);
    pop();

    this.grid();

    bright1 += inc1;
    bright2 += inc2;
    wid -= inc1 * 15;
    heig -= inc1 * 10;
    deg -= 0.01;
    if (bright2 == MIN_B || bright2 == MAX_B) inc2 *= -1;
    if (bright1 == MIN_B || bright1 == MAX_B) inc1 *= -1;

    if (frameCount == change) {
      changeScene();
    }
  }

  this.grid = function () {
    for (let gridY = 0; gridY < tileCount; gridY++) {
      for (let gridX = 0; gridX < tileCount; gridX++) {
        let posX = (width / tileCount) * gridX;
        let posY = (height / tileCount) * gridY;
        noStroke();
        rectMode(CORNER);
        var toggle = floor(random(2));
        if (toggle == 1) {
          fill(0);
          rect(posX, posY, width / tileCount, height / tileCount);
        } else {
          fill(100, 100, bright1, 10);
          rect(posX, posY, width / tileCount, height / tileCount);
        }
      }
    }
  }
}

//==================Kindly Notions=======================================

function KindlyNotions() {
  let swarm = [];
  let num_particles = 500;
  const MIN = 0; MAX = 1000;
  let diam = 0;
  let inc = 1;
  let alf = 100;
  let deg = 0;
  let H1 = 0;
  let x = 0;
  let y = 0;
  let reset1;
  let change;
  let lastMs = 0;
  const FPS = 20;

  this.setup = function () {
    colorMode(HSB, 360, 100, 100, 100);
    //background(0);
    swarm = [];
    for (let i = 0; i < num_particles; i++) {
      swarm.push(new this.particle(random(width), random(height)));
    }
    lastMs = millis();
    change = int(random(500, 2000));
  }

  this.draw = function () {
    if (!throttle(lastMs, FPS)) return;
    lastMs = millis();
    frameCount++;

    background(0, 1);
    reset1 = width < height ? width / 2 : height / 2;

    for (let i = 0; i < swarm.length; i++) {
      swarm[i].display();
    }

    rectMode(CENTER);
    strokeWeight(random(1, 3));
    stroke(H1, random(100), random(100), 100);
    fill(H1, 100, 100, 5);

    push();
    translate(width / 2, height / 2);
    rotate(deg);
    rect(x, y, diam);
    pop();

    diam += inc;
    alf -= inc;
    deg += random(0.01, 0.05);

    if (diam == MIN || diam >= reset1) {
      inc *= -1;
    }

    if (diam <= 0) {
      H1 = random(360);
      x = random(-width * .3, width * .3);
      y = random(-height * .3, height * .3);
    }

    if (frameCount == change) {
      changeScene();
    }
  }

  this.particle = function (x, y) {
    this.loc = createVector(x, y);
    this.display = function () {
      noStroke();
      fill(180, random(100), random(100), random(100));
      circle(this.loc.x, this.loc.y, random(5));
    }
  }
}

//==================AfterImage=======================================
function AfterImage() {
let dance =[];
let num = 100;
//let l1;
let H = 100;
let wid = 0;
var cirx;
var ciry;
//let cx = 200;
//let cy = 200;
//let color = []

this.setup = function() {
  for (let i = 0; i < num; i++){
    dance.push(new Lattice());
  }
  //background(255);
 //cirx = 0;
 //ciry = 0;
}

this.draw = function() {
  background(10, 0.01);
  noFill();
  strokeWeight(random(10));
  stroke(random(300-360), random(100), random(360), random(50));
  ellipse(mouseX, mouseY, wid);
  for (let i = 0; i < dance.length; i++) {
  dance[i].display();
  dance[i].step();
  dance[i].edges();
  }

  H += 1;
  wid += random(10);



  if (H > 300){
    H = 100;
  }

  if (wid > width){
    //cirx = random(width);
    //ciry = random(height);
    wid = 0;
  }
}

class Lattice{
  constructor(){
  //this.loc = createVector(width/2,height/2);
    this.loc = createVector(width, height);
    this.len = random(20, 60);
  }

  display(){
    //lines
    strokeWeight(1);
    //fill(H-50, random(100), random(360), 0.2);
    stroke(H, random(360), random(360));

    beginShape();
    vertex(this.loc.x, this.loc.y);
    vertex(this.loc.x + this.len, this.loc.y);
    vertex(this.loc.x + this.len, this.loc.y + this.len);
    endShape();
  }

  edges(){
    if (this.loc.x <= 0){
        this.loc.x += 5
    }
    if (this.loc.x >= width){
        this.loc.x -= 5
    }
    if (this.loc.y <= 0){
        this.loc.y += 5
    }
    if (this.loc.y >= height){
      this.loc.y -= 5
      }
    }

  step(){
    let choice = floor(random(4));
    if (choice == 0){
        this.loc.x+= random(5,10);
    }
    else if (choice == 1){
        this.loc.x -= random(5,10);
    }
    else if (choice == 2){
        this.loc.y += random(5,10);
    } else {
      this.loc.y -= random(5,10);
      }
    }
  }
}

//==================Broad Pixie=======================================

function BroadPixie(){
  let cells = [];
let protection = 0;
let r = 0;
let num;

this.setup = function() {
  num = height*0.05;
  }
  
this.draw = function() {
  //background(random(150,200), 50, 50, 5);
  while (cells.length < height*.5){
    var cell = {
      x: random(width),
      y: random(height-80),
      len: 20
    };

    var overlapping = false;
    for (var j = 0; j < cells.length; j++){
      var other = cells[j];
      var d = dist(cell.x, cell.y, other.x, other.y);
      if (d < cell.len + other.len){
        overlapping = true;
      }
    }

    if (!overlapping){
      cells.push(cell);
    }

    protection++;
    if (protection > 10000){
      break;
    }
  }
  this.honeyComb();
  this.flower()
  this.bee();

  }


this.honeyComb = function(){
  for (let i = 0; i < cells.length; i++){
    stroke(random(30,50), 100, 100);
    strokeWeight(3)
    //strokeWeight(map(mouseX, 0, width, 5, 50));
    fill(random(30,50), random(50), 100, 50);
    beginShape();
    vertex(cells[i].x + random(-2,2), cells[i].y+cells[i].len*0.5 + random(-2,2));
    vertex(cells[i].x + cells[i].len + random(-2,2), cells[i].y + cells[i].len + random(-2,2));
    vertex(cells[i].x + cells[i].len + random(-2,2), cells[i].y + 2*cells[i].len + random(-2,2));
    vertex(cells[i].x + random(-2,2), cells[i].y + cells[i].len*2.5 + random(-2,2));
    vertex(cells[i].x - cells[i].len + random(-2,2), cells[i].y + 2 * cells[i].len + random(-2,2));
    vertex(cells[i].x - cells[i].len + random(-2,2), cells[i].y + cells[i].len + random(-2,2));
    endShape(CLOSE);
  }
}

this.bee = function(){
  for (i = 0; i < 20; i++){
    fill(55, random(100), random(100), random(20))
    circle(mouseX, mouseY,random(100));
  }
}

this.flower = function(){
  fill(random(300,360), random(50), 100, 20);
  stroke(random(300,360), random(50), 100, 20);
  for (i = 0; i < num; i++){
    curveTightness(random(3,6));
    curve(random(width), random(height), mouseX, mouseY, mouseX, mouseY,random(width), random(height));
  } 
}
}