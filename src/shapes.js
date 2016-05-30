'use strict';

const thickness = 3;

const extrudeSettings = {
	bevelEnabled: false,
	amount: thickness
};

function driveBarUpper() {
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

  return shape.extrude(extrudeSettings);
}

function driveBarLower() {
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

  return shape.extrude(extrudeSettings);
}

function legConnectorInside() {
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

  return shape.extrude(extrudeSettings);
}

function legConnectorOutside() {
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

  return shape.extrude(extrudeSettings);
}

function shoulder() {
  let shape = new THREE.Shape()
    , x = 41.5;

  shape.moveTo(0, -6);
  shape.lineTo(x, -6);
  shape.quadraticCurveTo(x + 6, -6, x + 6, 0);
  shape.quadraticCurveTo(x + 6,  6, x, 6);
  shape.lineTo(8.60, 40.01);
  shape.quadraticCurveTo(8.60, 46.01, 2.60, 46.01);
  shape.quadraticCurveTo(-4.60, 46.01, -4.60, 40.01);
  shape.lineTo(0, 6);
  shape.quadraticCurveTo(-6, 6, -6, 0);
  shape.quadraticCurveTo(-6, -6, 0, -6);

  let rightHole = new THREE.Path();
	rightHole.absarc(0, 0, 3, 0, Math.PI*2, true);
	shape.holes.push(rightHole);

  let leftHole = new THREE.Path();
	leftHole.absarc(x, 0, 3, 0, Math.PI*2, true);
	shape.holes.push(leftHole);

  let thirdHole = new THREE.Path();
	thirdHole.absarc(2.60, 40.01, 3, 0, Math.PI*2, true);
	shape.holes.push(thirdHole);

  return shape.extrude(extrudeSettings);
}

function driveWheelBar() {
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

  return shape.extrude(extrudeSettings);
}

function foot() {
  let shape = new THREE.Shape()
    , x = 36.7
    , ex = -7.75
    , ey = 48.38;

  shape.moveTo(0, -6);
  shape.quadraticCurveTo(-6, -6, -6, 0);
  shape.quadraticCurveTo(ex / 2, ey / 2, ex + 2 * Math.cos(3 * Math.PI / 4), ey + 2 * Math.sin(3 * Math.PI / 4));
  shape.quadraticCurveTo(ex, ey + 4,ex + 2 * Math.cos(Math.PI / 4), ey + 2 * Math.sin(Math.PI / 4));
  shape.quadraticCurveTo(ex + (x - ex) / 2, ey / 2, x + 6, 0);
  shape.quadraticCurveTo(x + 6, -6, x, -6);
  shape.quadraticCurveTo(x / 2, 0, 0, -6);

  let rightHole = new THREE.Path();
	rightHole.absarc(0, 0, 3, 0, Math.PI*2, true);
	shape.holes.push(rightHole);

  let leftHole = new THREE.Path();
	leftHole.absarc(x, 0, 3, 0, Math.PI*2, true);
	shape.holes.push(leftHole);

  return shape.extrude(extrudeSettings);
}

module.exports = {
  driveBarUpper: {
    shape: driveBarUpper,
    z: 3 * thickness
  },
  driveBarLower: {
    shape: driveBarLower,
    z: 4 * thickness
  },
  driveWheelBar: {
    shape: driveWheelBar,
    z: 2 * thickness
  },
  legConnectorInside: {
    shape: legConnectorInside,
    z: 3 * thickness
  },
  legConnectorOutside: {
    shape: legConnectorOutside,
    z: 3 * thickness
  },
  shoulder: {
    shape: shoulder,
    z: 2 * thickness
  },
  foot: {
    shape: foot,
    z: 2 * thickness
  }
};
