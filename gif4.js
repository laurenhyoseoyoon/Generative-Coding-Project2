// 4. BLOBBING
var perlin;
var mycircle;
var perlinR, circleR, deltaX, deltaY, angle;
var x1, y1, x2, y2;
var loopR, loopAngle;
var steps;
var iteration;

function setup() {
    initializeFields();
    createCanvas(500, 500);
    frameRate(30);
    noStroke();
    perlin = new Array(100);
    mycircle = new Array(perlin.length);
    angle = TWO_PI / perlin.length;
    perlinR = 0.4;
    circleR = width / 2;
    steps = 100;
    loopR = 0.4;
    deltaX = loopR;
    deltaY = loopR;
    loopAngle = TWO_PI / steps;
}

function draw() {
    // background(64,64,64);
    fill(255, 227, 220, 50);
    rect(0, 0, width, height);
    fill(64, 223, 247);
    updatePerlin();
    translate(width / 2, height / 2);
    beginShape();
    for (var i = 0; i < perlin.length; i++) {
        var x = perlin[i] * cos(angle * i) * circleR;
        var y = perlin[i] * sin(angle * i) * circleR;
        circle[i] = new createVector(x, y);
        curveVertex(x, y);
    }
    endShape();
    iteration++;
}

function updatePerlin() {
    deltaX = loopR * cos(loopAngle * iteration);
    deltaY = loopR * sin(loopAngle * iteration);
    for (var i = 0; i < perlin.length; i++) {
        var x = (perlinR * cos(angle * i));
        var y = (perlinR * sin(angle * i));
        perlin[i] = noise(x + deltaX + loopR * 2, y + deltaY + loopR * 2);
    }
}

function initializeFields() {
    perlin = null;
    mycircle = null;
    perlinR = 0;
    circleR = 0;
    deltaX = 0;
    deltaY = 0;
    angle = 0;
    x1 = 0;
    y1 = 0;
    x2 = 0;
    y2 = 0;
    loopR = 0;
    loopAngle = 0;
    steps = 0;
    iteration = 0;
}
