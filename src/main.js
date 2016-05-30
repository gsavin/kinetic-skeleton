'use strict';

require('./stylesheet.scss');

const Strandbeest  = require('./strandbeest')
    , SkeletonMesh = require('./skeleton-mesh')
    , SkeletonMapping = require('./skeleton-mapping')
    , shapes       = require('./shapes');

const skel = new Strandbeest();

try {
  skel.set("rotation", 0);
  skel.check();
}
catch (err) {
  console.log(err);
}

const scene     = new THREE.Scene()
    , camera    = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 )
    , renderer  = new THREE.WebGLRenderer({ antialias: true })
    , fps       = 30
    , skelMesh  = new THREE.Group()
    , showSkel  = false;

//
// Create the 3d Object
//

var shapeMaterial = new THREE.MeshLambertMaterial({
  color: 0xefefef,
  wireframe: false
});

let skelMapping = new SkeletonMapping(skel, shapeMaterial);

skelMapping.addShape("j", shapes.driveBarUpper);
skelMapping.addShape("k", shapes.driveBarLower);
skelMapping.addShape("c", shapes.legConnectorInside);
skelMapping.addShape("f", shapes.legConnectorOutside);
skelMapping.addShape("b", shapes.shoulder);
skelMapping.addShape("m", shapes.driveWheelBar);
skelMapping.addShape("g", shapes.foot);

scene.add(skelMapping);

//
// Draw skeleton
//

if (showSkel) {
  let skeletonMaterial = new THREE.LineBasicMaterial({
  	color: 0x2a51a3,
    linewidth: 4
  });

  let skelMesh = new SkeletonMesh(skel, skeletonMaterial);
  scene.add(skelMesh);
}

//
// Light, camera, controls...
//

let directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.position.set(1, 0, 1).normalize();
scene.add(directionalLight);

camera.position.y = -25;
camera.position.z = 125;

let controls = new THREE.OrbitControls( camera, renderer.domElement );
//controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = false;

/*let controls = new THREE.TrackballControls(camera);
controls.rotateSpeed = 2.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = false;
controls.dynamicDampingFactor = 0.3;*/

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  controls.handleResize();

  render();
}

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x21252b);
//renderer.setClearColor(0x282c34);

document.body.appendChild( renderer.domElement );

var i = -1;

function render() {
	renderer.render( scene, camera );
  controls.update();

  try {
    skel.set("rotation", skel.get("rotation") + 1 / fps);
  }
  catch (err) {
    console.log("Error", err);
  }
  //skel.check();
}

i = setInterval( function () {
    requestAnimationFrame( render );
}, 1000 / fps );
