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
  mgr.addScene(Tether);
  mgr.addScene(IndustriousFiber);
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
  let chance = floor(random(1,9.9));

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
  } else if (chance == 8){
      mgr.showScene(Tether);
  } else if (chance == 9){
      mgr.showScene(IndustriousFiber);
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
  let inc3 = 5;
  let x = 0;
  let y = 0;
  let el1 = 51;
  const MIN_C = 50; MAX_C = 300;
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


    push();
    translate(width / 2, height / 2);
    //translate(mouseX, mouseY);
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

    pop();

    // stroke(255);
    // strokeWeight(random(1,5))
    fill(0);
    noStroke();
    ellipse(mouseX, mouseY, el1+random(-10,10), el1+random(-10,10), alf);
    alf -= inc1;
    deg -= inc2;
    el1 += inc3;

     if (el1 <= 50 || el1 >= 100) {
        inc3 *= -1;  
    }

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
    fill(0, bright2, 100);
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
          fill(180, 100, bright1, 10);
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
  background(10, 10);
  noFill();
  strokeWeight(random(10));
  stroke(random(300-360), random(100), random(100), random(50));
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
    strokeWeight(random(1,3));
    //fill(H-50, random(100), random(360), 0.2);
    stroke(random(200,300), 100, 100, 20);

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

//===============Tether===========================

function Tether(){
  let dance = [];
  let num;  
  let j;
  let lastMs = 0;
  const FPS = 30;
  

this.setup = function() {
  //background(random(30), 10);
  num = height*0.05;
  j = 0;
  //num = 30;
  for (i = 0; i < num; i++){
    dance.push(new Element());
  }
  lastMs = millis();
  }

  this.draw = function() {
     if (!throttle(lastMs, FPS)) return;
    lastMs = millis();
    background(random(30), random(10));

  
  for (i = 0; i < dance.length; i++){
    dance[i].display();
    dance[i].update();
    dance[i].edges();
  }
  this.scribble();
    
  } 

this.scribble = function(){
  noFill();
  for (i = 0; i < num; i++){
    stroke(random(300,360), random(0,100), 100);
    curveTightness(random(3,6));
    curve(random(width), random(height), mouseX, mouseY, mouseX, mouseY,random(width), random(height));
  }
}

class Element{
  constructor(){
    this.loc = createVector(random(width), random(height));
    this.vel = createVector(0,0);
    this.len = random(10,30);
    //this.len = random(width*0.03, width*0.07);
    this.ts = 3;
    this.a = 0;
  }
  
  display(){
    strokeWeight(1);
    fill(random(200,300), random(360), random(360));
     //tethers
    stroke(random(0,100), random(0,100), 100, 50);
    line(this.loc.x, this.loc.y, mouseX, mouseY);
    //bodies
    stroke(0);
    rectMode(CENTER);
    circle(this.loc.x, this.loc.y, this.len);
  }
  
  update(){
    this.a = p5.Vector.random2D();
    //this.a.mult(random(4));
    this.a.mult(this.len*.3)
    //this.a = createVector(random(-.1, .1), random(-.1, .1));
    this.vel.add(this.a);
    this.vel.limit(this.ts);
    this.loc.add(this.vel);
  }
  
  edges(){
    if (this.loc.x > width) {
      this.loc.x = 0;
    }
    if (this.loc.x < 0) {
      this.loc.x = width;
    }
    if (this.loc.y > height) {
      this.loc.y = 0;
    }
    if (this.loc.y < 0) {
      this.loc.y = height;
      }
    }
  }
}

//=================Industrious Fiber=================

function IndustriousFiber(){
  //I had some idea to create a web or net, but ended up with angsty threads and nervous pixels

let nodes = [];
let pixels = [];
let rad = 0;
let MAX = 200;
let MIN = 0;
let H1;
let grow = 0.1;
let lastMs = 0;
  const FPS = 30;

this.setup = function() {
  rectMode(CENTER);
  frameRate(30);
  H1 = random(50,255);
  //strings
  for (var j = 0; j < 70; j++) {
		nodes[j] = new Node(random(width), random(height), random(width), random(height));
  }
  //pixels
  for (var k = 0; k < 100; k++){
    pixels[k] = new Pixel(random(width), random(height), random(0.2));
  }
    lastMs = millis();
  }

  this.draw = function() {
     if (!throttle(lastMs, FPS)) return;
    lastMs = millis();
  background(10, 10);
 
  for (let l = 0; l < pixels.length; l++){
    pixels[l].show();
  }
  
  for (let i = 0; i < nodes.length; i++){
    nodes[i].edges();
    nodes[i].show();
    nodes[i].move();
  }

 
  
}

class Node {
  constructor(x1, y1, x2, y2){
    this.v1 = createVector(x1, y1);
    this.v2 = createVector(x2, y2);
    // this.v3 = createVector(x3, y3);
    this.grow = grow;
  }
  move(){
    this.v1.add(random(-3, 3), random(-3, 3));
    this.v2.add(random(-1,1), random(-1, 1));
  }

  edges(){
    if (this.v1.x < 0 || this.v1.x > width){
      this.v1.x = random(width);
    }
    if (this.v1.y < 0 || this.v1.y > height){
      this.v1.y = random(height);
    }
    if (this.v2.x < 0 || this.v2.x > width){
      this.v2.x = random(width);
    }
    if (this.v2.y < 0 || this.v2.y > height){
      this.v2.y = random(height);
    }
  }
  show(){
    strokeWeight(1)
    // stroke(0, random(100), random(100));
    stroke(0, 100, 100);
    line(this.v1.x, this.v1.y, this.v2.x, this.v2.y);
     fill(0);
    // fill(180, random(100), random(100));
    noStroke();
    circle(this.v1.x, this.v1.y, 20);
    circle(this.v2.x, this.v2.y, 10);
    


  }
}

class Pixel{
  constructor(x, y, grow){
    this.v3 = createVector(x, y);
    this.grow = grow; 
  }

  show(){
    strokeWeight(3);
    stroke(0);
    // noStroke();
    fill(H1, 30);
    square(this.v3.x, this.v3.y, rad);
    rad += this.grow;

    //breathing
    if (rad <= MIN || rad >= MAX){
      this.grow *= -1;
      H1 = random(50,255);
      this.v3.x = random(width);
      this.v3.y = random(height);
    }
  }
}
}