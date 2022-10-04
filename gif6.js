// 6. Actually Turning
let colors = ['#ea5e1e', '#f893b1',
	'#027225', '#ebd3e4',
	'#fdb601', '#7cbe80',
	'#7b3372', '#b3d6e5', '#e40d62'
]
let txt = ['T', 'U', 'R', 'N', 'I', 'N', 'G', '.', '.']

function setup() {
	createCanvas(800, 900);
	background(0);
}


let x = 50,
	y = 600,
	xx = 0,
	yy = 0
let d = 100,
	w = 100

function draw() {
	// background(0)
	noStroke()
	// x = lerp(x, mouseX / 10, 0.05)
	fill('white')
	if (frameCount % 7 < 4) {
		fill(random(colors))
	}

	rect(xx, yy, w)
	xx += 100
	if (xx > width) {
		xx = 0
		yy += 100
	}
	
	fill('#ea5e1e')
	rect(x, y, w)
	fill('#f893b1')
	rect(x + d, y, w)
	fill('#027225')
	rect(x + d * 2, y, w)
	fill('#ebd3e4')
	rect(x + d * 3, y, w)
	fill('#fdb601')
	rect(x + d * 4, y, w)
	fill('#7cbe80')
	rect(x, y + d, w)
	fill('#7b3372')
	rect(x + d, y + d, w)
	fill('#b3d6e5')
	rect(x + d * 2, y + d, w)
	fill('#e40d62')
	rect(x + d * 3, y + d, w)

	fill(255)
	stroke(255)
	strokeWeight(5)
	textSize(60)
	textAlign(CENTER, CENTER)
	//H
	text(txt[0], x + 50, y + 55)

	push() //E
	translate(x + 150, y + 55)
	rotate(mouseY / 100)
	text(txt[1], 0, 0)
	pop()

	let m = minute()
	let angleM = map(m, 0, 60, 0, PI * 2)
	push() //L
	translate(x + 250, y + 55)
	rotate(angleM)
	angleMode(RADIANS)
	text(txt[2], 0, 0)
	pop()

	let s = second()
	let angleS = map(s, 0, 60, 0, PI * 2)
	push() //L
	translate(x + 350, y + 55)
	rotate(angleS)
	// angleMode(CENTER)
	text(txt[3], 0, 0)
	pop()

	text(txt[4], x + 450, y + 55) //O

	push() //R
	translate(x + 50, y + 155)
	rotate(mouseX / 100)
	text(txt[5], 0, 0)
	pop()
	push() //U
	translate(x + 145, y + 150)
	rotate(HALF_PI)
	text(txt[6], 0, 0)
	pop()

	push() //B
	translate(x + 250, y + 155)
	rotate(frameCount / 80)
	text(txt[7], 0, 0)
	pop()

	push() //Y
	translate(x + 350, y + 155)
	text(txt[8], 0, 0)
	pop()
}
