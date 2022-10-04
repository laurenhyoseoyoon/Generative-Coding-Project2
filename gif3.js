// 3. FOURIER SERIES
let time = 0;
let wave = [];
let path = [];

let slider;

function setup() {
  createCanvas(500, 500);
  slider = createSlider(1, 50, 5);
}

function draw() {
  background(240, 237, 213);
  translate(150, 200);

  let x = 0;
  let y = 0;

  for (let i = 0; i < slider.value(); i++) {
    let prevx = x;
    let prevy = y;

    let n = i * 2 + 1;
    let radius = 75 * (4 / (n * PI));
    x += radius * cos(n * time);
    y += radius * sin(n * time);

    stroke(255, 176, 92);
    noFill();
    ellipse(prevx, prevy, radius * 2);

    //fill(255);
    stroke(115, 176, 65);
    line(prevx, prevy, x, y);
    //ellipse(x, y, 8);
  }
  wave.unshift(y);

  translate(200, 0);
  line(x - 200, y, 0, wave[0]);
  beginShape();
  noFill();
  for (let i = 0; i < wave.length; i++) {
    vertex(i, wave[i]);
  }
  endShape();

  time += 0.05;

  if (wave.length > 250) {
    wave.pop();
  }
}