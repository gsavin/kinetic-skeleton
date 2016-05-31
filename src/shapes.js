'use strict';

const thickness = 3;

const extrudeSettings = {
	bevelEnabled: false,
	amount: thickness
};

const loader = new THREE.STLLoader();

function extrude(shape, cb) {
  let g = shape.extrude(extrudeSettings);
  g.translate(0, 0, -thickness / 2);

  cb(g);
}

function driveBarUpper(cb) {
  let shape = new THREE.Shape();
  shape.moveTo(0, 6);
  shape.quadraticCurveTo(-6,  6, -6,  0);
  shape.quadraticCurveTo(-6, -6,  0, -6);
  shape.quadraticCurveTo(25, 0, 50, -6);
  shape.quadraticCurveTo(56, -6, 56, 0);
  shape.quadraticCurveTo(56,  6, 50, 6);
  shape.quadraticCurveTo(25, 0, 0, 6);

  let rightHole = new THREE.Path();
	rightHole.absarc(0, 0, 3, 0, Math.PI*2, true);
	shape.holes.push(rightHole);

  let leftHole = new THREE.Path();
	leftHole.absarc(50, 0, 3, 0, Math.PI*2, true);
	shape.holes.push(leftHole);

  return extrude(shape, cb);
}

function driveBarLower2(cb) {
  let shape = new THREE.Shape();
  shape.moveTo(0, 6);
  shape.quadraticCurveTo(-6,  6, -6,  0);
  shape.quadraticCurveTo(-6, -6,  0, -6);
  shape.quadraticCurveTo(31, 6, 61.9, -6);
  shape.quadraticCurveTo(67.9, -6, 67.9, 0);
  shape.quadraticCurveTo(67.9,  6, 61.9, 6);
  shape.quadraticCurveTo(31, 12, 0, 6);

  let rightHole = new THREE.Path();
	rightHole.absarc(0, 0, 3, 0, Math.PI*2, true);
	shape.holes.push(rightHole);

  let leftHole = new THREE.Path();
	leftHole.absarc(61.9, 0, 3, 0, Math.PI*2, true);
	shape.holes.push(leftHole);

  return extrude(shape, cb);
}

function legConnectorInside(cb) {
  let shape = new THREE.Shape()
    , x = 39.3;

  shape.moveTo(0, 6);
  shape.quadraticCurveTo(-6,  6, -6,  0);
  shape.quadraticCurveTo(-6, -6,  0, -6);
  shape.quadraticCurveTo(x / 2, 0, x, -6);
  shape.quadraticCurveTo(x + 6, -6, x + 6, 0);
  shape.quadraticCurveTo(x + 6,  6, x, 6);
  shape.quadraticCurveTo(x / 2, 0, 0, 6);

  let rightHole = new THREE.Path();
	rightHole.absarc(0, 0, 3, 0, Math.PI*2, true);
	shape.holes.push(rightHole);

  let leftHole = new THREE.Path();
	leftHole.absarc(x, 0, 3, 0, Math.PI*2, true);
	shape.holes.push(leftHole);

  return extrude(shape, cb);
}

function legConnectorOutside(cb) {
  let shape = new THREE.Shape()
    , x = 39.4;

  shape.moveTo(0, 6);
  shape.quadraticCurveTo(-6,  6, -6,  0);
  shape.quadraticCurveTo(-6, -6,  0, -6);
  shape.quadraticCurveTo(x / 2, 0, x, -6);
  shape.quadraticCurveTo(x + 6, -6, x + 6, 0);
  shape.quadraticCurveTo(x + 6,  6, x, 6);
  shape.quadraticCurveTo(x / 2, 0, 0, 6);

  let rightHole = new THREE.Path();
	rightHole.absarc(0, 0, 3, 0, Math.PI*2, true);
	shape.holes.push(rightHole);

  let leftHole = new THREE.Path();
	leftHole.absarc(x, 0, 3, 0, Math.PI*2, true);
	shape.holes.push(leftHole);

  return extrude(shape, cb);
}

function shoulder(cb) {
	loader.load( './strandbeest/shoulder.stl', cb);
}

function foot(cb) {
	loader.load( './strandbeest/foot.stl', cb);
}

function driveBarLower(cb) {
	loader.load( './strandbeest/drive_bar_lower.stl', cb);
}

function driveWheelBar(cb) {
  let shape = new THREE.Shape()
    , x = 15;

  shape.moveTo(0, 6);
  shape.quadraticCurveTo(-6,  6, -6,  0);
  shape.quadraticCurveTo(-6, -6,  0, -6);
  shape.quadraticCurveTo(x / 2, -3, x, -6);
  shape.quadraticCurveTo(x + 6, -6, x + 6, 0);
  shape.quadraticCurveTo(x + 6,  6, x, 6);
  shape.quadraticCurveTo(x / 2, 3, 0, 6);

  let rightHole = new THREE.Path();
	rightHole.absarc(0, 0, 3, 0, Math.PI*2, true);
	shape.holes.push(rightHole);

  let leftHole = new THREE.Path();
	leftHole.absarc(x, 0, 3, 0, Math.PI*2, true);
	shape.holes.push(leftHole);

  return extrude(shape, cb);
}

function support(cb) {
  let shape = new THREE.Shape()
    , x = 41.5;

  /*shape.moveTo(-50, -7.8);
  shape.quadraticCurveTo(0, 26, 50, -7.8);
  shape.bezierCurveTo(38, -20, -38, -20, -50, -7.8);*/
  shape.moveTo(-6, 0);
  shape.quadraticCurveTo(-6, 6, 0, 6);
  shape.quadraticCurveTo(6, 6, 6, 0);
  shape.lineTo(38, -1.8);
  shape.quadraticCurveTo(44, -1.8, 44, -7.8);
  shape.quadraticCurveTo(44, -13.8, 38, -13.8);
  shape.quadraticCurveTo(0, 3, -38, -13.8);
  shape.quadraticCurveTo(-44, -13.8, -44, -7.8);
  shape.quadraticCurveTo(-44, -1.8, -38, -1.8);
  shape.lineTo(-6, 0);

  let rightHole = new THREE.Path();
	rightHole.absarc(38, -7.8, 3, 0, Math.PI*2, true);
	shape.holes.push(rightHole);

  let leftHole = new THREE.Path();
	leftHole.absarc(-38, -7.8, 3, 0, Math.PI*2, true);
	shape.holes.push(leftHole);

  let thirdHole = new THREE.Path();
	thirdHole.absarc(0, 0, 3, 0, Math.PI*2, true);
	shape.holes.push(thirdHole);

  return extrude(shape, cb);
}

function spacer(cb) {
  let shape = new THREE.Shape();
	shape.absarc(0, 0, 6, 0, Math.PI*2, true);

  let hole = new THREE.Path();
	hole.absarc(0, 0, 3, 0, Math.PI*2, true);
	shape.holes.push(hole);

  return extrude(shape, cb);
}

module.exports = {
  driveBarUpper: 				driveBarUpper,
  driveBarLower: 				driveBarLower,
  driveWheelBar: 				driveWheelBar,
  legConnectorInside: 	legConnectorInside,
  legConnectorOutside: 	legConnectorOutside,
  shoulder: 						shoulder,
  foot: 								foot,
  support: 							support,
  spacer: 							spacer,
  thickness: 						thickness
};
