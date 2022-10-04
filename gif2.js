// 2. CLOCK

function setup() {
    createCanvas(500, 500);
    angleMode(DEGREES);
  }
  
  function draw() {
    background(0);
    translate(250, 250);

  
    let hr = hour();
    let mn = minute();
    let sc = second();

    fill(255);
    noStroke();
    text(hr + ':' + mn + ':' + sc, 10, 50);
  
    // Resetting the starting axis point to -90 degrees with respect to the 0 degrees x-axis. 
    rotate(-90); 

    strokeWeight(8);
    stroke(255, 100, 150);
    noFill();
    let secondAngle = map(sc, 0, 60, 0, 360);
    arc(0, 0, 300, 300, 0, secondAngle);
  
    stroke(150, 100, 255);
    let minuteAngle = map(mn, 0, 60, 0, 360);
    arc(0, 0, 280, 280, 0, minuteAngle, PIE);
  
    stroke(150, 255, 100);
    let hourAngle = map(hr % 12, 0, 12, 0, 360);
    arc(0, 0, 260, 260, 0, hourAngle, PIE);
  
    push();
    rotate(secondAngle);
    stroke(255, 100, 150);
    line(0, 0, 100, 0);
    pop();
  
    push();
    rotate(minuteAngle);
    stroke(150, 100, 255);
    line(0, 0, 75, 0);
    pop();
  
    push();
    rotate(hourAngle);
    stroke(150, 255, 100);
    line(0, 0, 50, 0);
    pop();
  
    stroke(255);
    point(0, 0);

  }
