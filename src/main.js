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

shapeMaterial.transparent = true;
shapeMaterial.opacity = 0.75;

scene.add(new THREE.Mesh(shapes.support.shape(), shapeMaterial));

let skelMapping = new SkeletonMapping(skel, shapeMaterial);

skelMapping.addShape("j", shapes.driveBarUpper          , null              , [0, 0, 3 * shapes.thickness]);
skelMapping.addShape("k", shapes.driveBarLower          , null              , [0, 0, 5 * shapes.thickness]);
skelMapping.addShape("c", shapes.legConnectorInside     , null              , [0, 0, 4 * shapes.thickness]);
skelMapping.addShape("f", shapes.legConnectorOutside    , null              , [0, 0, 4 * shapes.thickness]);
skelMapping.addShape("b", shapes.shoulder               , null              , [0, 0, 2 * shapes.thickness]);
skelMapping.addShape("m", shapes.driveWheelBar          , null              , [0, 0, 1 * shapes.thickness]);
skelMapping.addShape("g", shapes.foot                   , null              , [0, 0, 2 * shapes.thickness]);
skelMapping.addShape("b", shapes.spacer                 , null              , [0, 0, 1 * shapes.thickness]);
skelMapping.addShape("b", shapes.spacer                 , null              , [0, 0, 3 * shapes.thickness]);
skelMapping.addShape("g", shapes.spacer                 , null              , [0, 0, 3 * shapes.thickness]);
skelMapping.addShape("f", shapes.spacer                 , null              , [0, 0, 3 * shapes.thickness]);

skelMapping.addShape("j'", shapes.driveBarUpper         , [Math.PI, 0, 0]   , [0, 0, 2 * shapes.thickness]);
skelMapping.addShape("k'", shapes.driveBarLower         , [Math.PI, 0, 0]   , [0, 0, 4 * shapes.thickness]);
skelMapping.addShape("c'", shapes.legConnectorInside    , [Math.PI, 0, 0]   , [0, 0, 2 * shapes.thickness]);
skelMapping.addShape("f'", shapes.legConnectorOutside   , [Math.PI, 0, 0]   , [0, 0, 2 * shapes.thickness]);
skelMapping.addShape("b'", shapes.shoulder              , [Math.PI, 0, 0]   , [0, 0, 3 * shapes.thickness]);
skelMapping.addShape("g'", shapes.foot                  , [Math.PI, 0, 0]   , [0, 0, 3 * shapes.thickness]);
skelMapping.addShape("b'", shapes.spacer                , null              , [0, 0, 1 * shapes.thickness]);

scene.add(skelMapping);

/*var shapeMaterial2 = new THREE.MeshLambertMaterial({
  color: 0xff0000,
  wireframe: false
});

let s1 = new THREE.Mesh(shapes.foot.shape(), shapeMaterial)
  , s2 = new THREE.Mesh(shapes.foot.shape(), shapeMaterial2);

s2.rotation.x = -Math.PI;

let g1 = new THREE.Group()
  , g2 = new THREE.Group();

g1.add(s1);
g2.add(s2);

g1.rotation.z = Math.PI / 2;
g2.rotation.z = Math.PI / 2;

g2.translateZ(10);

scene.add(g1);
scene.add(g2);*/

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
  //controls.handleResize();

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
