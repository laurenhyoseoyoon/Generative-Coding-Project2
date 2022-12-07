const frames = 600;
const count = 24;

// @setup
let size;

// @draw
let time;
let steps;
let angle;

// @recursiveRect
const localCoords = [];
const maxCoords = 100;

const clamp = (v, e1, e2) => Math.min(Math.max(v, e1), e2);

const smoothStep = (e1, e2, v) => {
	t = clamp((v - e1) / (e2 - e1), 0.0, 1.0);
 	return t * t * (3.0 - 2.0 * t);
}

const recursiveRect = (x, y, w, h, a, i = 0) => {
	i++;

	stroke(i / (count - 1), 0.75, 0.75, 1);
	fill(i / (count - 1), 0.75, 0.75, .5);

	if (i < count) {
		push();
			rotate(a);
			rect(x, y, w, h);
			translate(w, h);
			recursiveRect(0, 0, 0.615 * w, 0.615 * h, a, i);

			if (i === count - 1) {
				// thank you dave!
				const matrix = drawingContext.getTransform();
				localCoords.push(matrix.transformPoint(new DOMPoint(y, x)));
				if (localCoords.length > maxCoords) localCoords.shift();
			}
		pop();
	}
}


function setup() {
	document.body.style.backgroundColor = 'rgb(212, 212, 212)';
	
	let s = min(windowWidth, windowHeight);
	createCanvas(s, s);
	
	pixelDensity(1);
	colorMode(HSB, 1, 1, 1, 1);
	
	strokeCap(SQUARE);
	
	size = 0.1875 * s;
}

function draw() {
	push();
		translate(0.2875 * width, 0.5 * height);
		rotate(-QUARTER_PI);
		background(0, 0, 0.875);

		time = frameCount % frames / frames;
		steps = [...Array(4).keys()].map((key) => smoothStep(key * 0.25, (key + 1) * 0.25, time));
		angle = steps.reduce((result, value) => result += value * HALF_PI, 0);

		recursiveRect(0, 0, size, size, angle);
	pop();
	
	noFill();
	strokeWeight(2);

	for (const [index, coord] of localCoords.entries()) {
		if (index === 0) continue;
		stroke(0, 0, 0, index / maxCoords);

		const prev = localCoords[index - 1];
		line(prev.x, prev.y, coord.x, coord.y);
	}
}

function windowResized() {
	let s = min(windowWidth, windowHeight);
	resizeCanvas(s, s);
	size = 0.1875 * s;
}