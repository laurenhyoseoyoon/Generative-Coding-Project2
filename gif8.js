const interpolateCubic = (a, b, c, d, t) => {
	const t2 = t * t,
		ti = 1.0 - t,
		ti2 = ti * ti;
	return a * (ti2 * ti) + b * (3.0 * ti2 * t) + c * (3.0 * ti * t2) + d * (t2 * t);
}

p5.Vector.fromAngleEllipse = function(angle, a, b) {
	return new p5.Vector(a * Math.cos(angle), b * Math.sin(angle), 0);
}

const getCoords = ({
	x: cx,
	y: cy
}, phi, a, b = a) => {
	return {
		x: cx + Math.cos(phi) * a,
		y: cy + Math.sin(phi) * b
	};
};

const amount = 90;
const frames = [];

function setup() {
	createCanvas(512, 512);
	ellipseMode(RADIUS);
	strokeJoin(ROUND);

	for (let frame = 0; frame < amount; frame += 1) {
		frames.push(createFrame(frame / amount));
	}
}

function draw() {
	let {
		radius,
		body,
		eyes,
		mouth,
		left,
		right,
		shadow
	} = frames[frameCount % amount];

	background((179, 240, 255));

	fill(180);
	noStroke();
	ellipse(shadow.pos.x, shadow.pos.y, shadow.a, shadow.b);

	noFill();
	stroke(34);
	strokeWeight(8);

	beginShape();
	for (const v of Object.values(left.leg)) vertex(...v.array());
	endShape();
	
	beginShape();
	for (const v of Object.values(left.arm)) vertex(...v.array());
	endShape();
	
	fill(255);
	ellipse(body.x, body.y, radius);

	noFill();
	strokeWeight(10);
	point(...eyes.left.array());
	point(...eyes.right.array());

	strokeWeight(8);
	line(mouth.left.x, mouth.left.y, mouth.right.x, mouth.right.y);

	
	beginShape();
	for (const v of Object.values(right.leg)) vertex(...v.array());
	endShape();
	
	beginShape();
	for (const v of Object.values(right.arm)) vertex(...v.array());
	endShape();
}

function createFrame(t) {
	let centre = new p5.Vector(256, 256);

	let u = (2 * t) % 1;
	let v = (t + 0.4) % 1;
	let w = (t + 0.9) % 1;

	let radius = 100;
	let bodyStep = interpolateCubic(0.25, -0.5, 1.5, 0.25, u);
	let body = new p5.Vector(
		centre.x + 20 * bodyStep,
		centre.y - 40 * bodyStep
	);
	let shadowStep = interpolateCubic(0.75, 0.875, 0.675, 0.75, u);
	let shadow = {
		pos: new p5.Vector(
			centre.x,
			centre.y + 1.45 * radius
		),
		a: radius * shadowStep,
		b: 0.1 * radius * shadowStep
	};

	let offsetEyes = p5.Vector.add(
		body,
		p5.Vector.fromAngle(
			PI * interpolateCubic(-0.125, 0.0, -0.25, -0.125, u),
			0.675 * radius));
	let offsetEyeSingle = p5.Vector.fromAngle(
		PI * interpolateCubic(-0.9, -0.95, -0.85, -0.9, u),
		0.1 * radius);
	let eyes = {
		left: new p5.Vector(
			offsetEyes.x + offsetEyeSingle.x,
			offsetEyes.y + offsetEyeSingle.y),
		right: new p5.Vector(
			offsetEyes.x - offsetEyeSingle.x,
			offsetEyes.y + offsetEyeSingle.y),
	};
	let offsetMouth = p5.Vector.add(
		body,
		p5.Vector.fromAngle(
			PI * interpolateCubic(0.0, 0.125, -0.125, 0.0, u),
			0.675 * radius));
	let offsetMouthCorner = p5.Vector.fromAngle(
		PI,
		0.1 * radius * Math.abs(Math.cos(PI * t)));
	let mouth = {
		left: offsetMouth,
		right: p5.Vector.add(offsetMouth, offsetMouthCorner)
	};

	let radiusUpperArm = 0.25 * radius;
	let radiusForeArm = 0.3 * radius;
	
	let radiusHip = 0.9 * radius;
	let radiusKnee = 1.2 * radius;
	let radiusFoot = 0.3 * radius;

	let offsetLeftArm = p5.Vector.add(
		body,
		p5.Vector.fromAngle(-0.125 * PI, 0.6 * radius));
	
	let positionLeftShoulder = p5.Vector.add(
		offsetLeftArm,
		p5.Vector.fromAngleEllipse(
			PI * interpolateCubic(0.5, -0.25, 1.25, 0.5, w),
			0.5 * radius,
			0.25 * radius));
	
	let positionLeftEllbow = p5.Vector.add(
		positionLeftShoulder,
		p5.Vector.fromAngleEllipse(
			PI * interpolateCubic(0.5, -0.25, 1.25, 0.5, w),
			radiusUpperArm,
			0.5 * radiusUpperArm));
	
	let positionLeftHand = p5.Vector.add(
		positionLeftEllbow,
		p5.Vector.fromAngleEllipse(
			PI * interpolateCubic(0.0, -1, 1, 0.0, w),
			radiusForeArm,
			0.5 * radiusForeArm));
	
	let angleLeftLeg = PI * interpolateCubic(0.5, -0.5, 1.5, 0.5, v);
	let positionLeftHip = p5.Vector.add(body, p5.Vector.fromAngle(angleLeftLeg, radiusHip));
	let positionLeftKnee = p5.Vector.add(body, p5.Vector.fromAngle(angleLeftLeg, radiusKnee));
	let positionLeftFoot = p5.Vector.add(positionLeftKnee, p5.Vector.fromAngle(
		PI * interpolateCubic(1.0, -1.25, 2.25, 1.0, v),
		radiusFoot));
	
	let left = {
		arm: {
			a: positionLeftShoulder,
			b: positionLeftEllbow,
			c: positionLeftHand,
		},
		leg: {
			a: positionLeftHip,
			b: positionLeftKnee,
			c: positionLeftFoot
		}
	}
	let offsetRightArm = p5.Vector.add(
		body,
		p5.Vector.fromAngle(-0.875 * PI, 0.6 * radius));
	
	let positionRightShoulder = p5.Vector.add(
		offsetRightArm,
		p5.Vector.fromAngleEllipse(
			PI * interpolateCubic(0.5, -0.25, 1.25, 0.5, v),
			0.5 * radius,
			0.25 * radius));
	
	let positionRightEllbow = p5.Vector.add(
		positionRightShoulder,
		p5.Vector.fromAngleEllipse(
			PI * interpolateCubic(0.5, -0.25, 1.25, 0.5, v),
			radiusUpperArm,
			0.5 * radiusUpperArm));
	
	let positionRightHand = p5.Vector.add(
		positionRightEllbow,
		p5.Vector.fromAngleEllipse(
			PI * interpolateCubic(0.0, -1, 1, 0.0, v),
			radiusForeArm,
			0.5 * radiusForeArm));
	
	let angleRightLeg = PI * interpolateCubic(0.5, -0.5, 1.5, 0.5, w);
	let positionRightHip = p5.Vector.add(body, p5.Vector.fromAngle(angleRightLeg, radiusHip));
	let positionRightKnee = p5.Vector.add(body, p5.Vector.fromAngle(angleRightLeg, radiusKnee));
	let positionRightFoot = p5.Vector.add(positionRightKnee, p5.Vector.fromAngle(
		PI * interpolateCubic(1.0, -1.25, 2.25, 1.0, w),
		radiusFoot));
	
	let right = {
		arm: {
			a: positionRightShoulder,
			b: positionRightEllbow,
			c: positionRightHand,
		},
		leg: {
			a: positionRightHip,
			b: positionRightKnee,
			c: positionRightFoot
		}
	}

	return {
		radius,
		body,
		eyes,
		mouth,
		left,
		right,
		shadow
	}
}