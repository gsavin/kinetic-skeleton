'use strict';

require('./stylesheet.scss');

const Strandbeest  = require('./strandbeest')
    , SkeletonMesh = require('./skeleton-mesh')
    , SkeletonMapping = require('./skeleton-mapping')
    , shapes       = require('./shapes');

const skel1  = new Strandbeest()
    , skel2 = new Strandbeest();

//
// Set initial rotation.
//

try {
  skel1.set("rotation", 0);
  skel2.set("rotation", Math.PI);
  skel1.check();
  skel2.check();
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



let gridHelper = new THREE.GridHelper(150, 10);
//gridHelper.translateZ(-75);
gridHelper.translateY(-92);
scene.add(gridHelper);

//
// Create the 3d Object
//

let shapeMaterial = new THREE.MeshLambertMaterial({
  color: 0x2a51a3,
  emissive: 0x222222,
  emissiveIntensity: 0.5,
  wireframe: false
});

let alertMaterial = new THREE.MeshLambertMaterial({
  color: 0xb82523,
  emissive: 0x222222,
  emissiveIntensity: 0.5,
  wireframe: false
});

shapeMaterial.transparent = true;
shapeMaterial.opacity = 0.75;

let skelMapping1 = skel1.getMapping(shapeMaterial);
skelMapping1.translateZ(75);

skelMapping1.onceLoaded(function() {
  let skelMapping2 = skelMapping1.clone();
  skelMapping2.translateZ(25);
  skelMapping2.skeleton = skel2;

  scene.add(skelMapping1);
  scene.add(skelMapping2);

  let clone1 = skelMapping1.clone()
    , clone2 = skelMapping2.clone();

  clone1.translateZ(-25);
  clone2.translateZ(-75);

  scene.add(clone1);
  scene.add(clone2);
});

//
// Draw skeleton
//

if (showSkel) {
  let skeletonMaterial = new THREE.LineBasicMaterial({
  	color: 0x2a51a3,
    linewidth: 4
  });

  let skelMesh = new SkeletonMesh(skel1, skeletonMaterial);
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
camera.lookAt(0, 0, 0);

let controls = new THREE.OrbitControls( camera, renderer.domElement );
//controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  //controls.handleResize();

  render();
}

renderer.setSize( window.innerWidth, window.innerHeight );
//renderer.setClearColor(0x21252b);
//renderer.setClearColor(0x282c34);

document.body.appendChild( renderer.domElement );

var i = -1;

function render() {
	renderer.render( scene, camera );
  controls.update();

  try {
    skel1.set("rotation", skel1.get("rotation") + 1 / fps);
    skel2.set("rotation", skel2.get("rotation") + 1 / fps);
  }
  catch (err) {
    console.log("Error", err);
  }
  //skel.check();
}

i = setInterval( function () {
    requestAnimationFrame( render );
}, 1000 / fps );
