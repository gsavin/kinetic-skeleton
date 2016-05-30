'use strict';

require('./stylesheet.scss');

const Skeleton  = require('./skeleton')
    , shapes    = require('./shapes');

const skel = new Skeleton();

skel
  //
  // Articulations
  //
  .addArticulation("0", [0, 0])
  .addArticulation("1", function(skeleton) { return [15 * Math.cos(skeleton.get("rotation")), 15 * Math.sin(skeleton.get("rotation"))]})
  .addArticulation("2", [-38.0, -7.8])
  .addArticulation("3")
  .addArticulation("4")
  .addArticulation("5")
  .addArticulation("6")
  .addArticulation("7")
  //
  // Bones
  //
  //  .addBone("a", 38.0)
  .addBone("b", "2", "3", 41.5)
  .addBone("c", "2", "4", 39.3)
  .addBone("d", "2", "6", 40.1)
  .addBone("e", "3", "6", 55.8)
  .addBone("f", "5", "6", 39.4)
  .addBone("g", "4", "5", 36.7)
  .addBone("h", "5", "7", 65.7)
  .addBone("i", "4", "7", 49.0)
  .addBone("j", "1", "3", 50.0)
  .addBone("k", "1", "4", 61.9)
  //  .addBone("l", 7.8)
  .addBone("m", "0", "1", 15.0)
  //
  // Triangles
  //
  .addTriangle("1", "2", "3")
  .addTriangle("1", "4", "2")
  .addTriangle("3", "2", "6")
  .addTriangle("2", "4", "5")
  .addTriangle("4", "7", "5")
  .addTriangle("2", "5", "6")
  .addTriangle("4", "5", "6");

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

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x21252b);
//renderer.setClearColor(0x282c34);

let directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.position.set(1, 0, 1).normalize();
scene.add(directionalLight);

document.body.appendChild( renderer.domElement );

var material = new THREE.LineBasicMaterial({
	color: 0x2a51a3,
  linewidth: 4
});

var shapeMaterial = new THREE.MeshLambertMaterial({
  color: 0x2a51a3,
  emissive: 0x00000,
  wireframe: false
});

var meshes = [];

function addShape(bone, def) {
  let s = new THREE.Mesh(def.shape(), shapeMaterial);
  s.position.z = def.z;

  meshes.push({bone:skel.getBone(bone), mesh:s});
  scene.add(s);
}

addShape("j", shapes.driveBarUpper);
addShape("k", shapes.driveBarLower);
addShape("c", shapes.legConnectorInside);
addShape("f", shapes.legConnectorOutside);
addShape("b", shapes.shoulder);
addShape("m", shapes.driveWheelBar);
addShape("g", shapes.foot);

function updateMapping() {
  for (let m of meshes) {
    m.mesh.rotation.z = m.bone.rotation;
    m.mesh.position.x = m.bone.source.x;
    m.mesh.position.y = m.bone.source.y;
  }
}

updateMapping();

var lines = {};

for (let bone of skel.bones()) {
  let geometry = new THREE.Geometry();

  geometry.vertices.push(
  	new THREE.Vector3(bone.source.x, bone.source.y, 10),
  	new THREE.Vector3(bone.target.x, bone.target.y, 10)
  );

  let line = new THREE.Line(geometry, material);
  skelMesh.add(line);

  lines[bone.name] = line;
}

if (showSkel) {
  scene.add(skelMesh);

  skel.on('update', () => {
    for (let bone of skel.bones()) {
      let vertices = lines[bone.name].geometry.vertices;

      vertices[0].x = bone.source.x;
      vertices[0].y = bone.source.y;
    	vertices[1].x = bone.target.x;
      vertices[1].y = bone.target.y;

      lines[bone.name].geometry.verticesNeedUpdate = true;
    }
  });
}

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

var i = -1;

function render() {
	renderer.render( scene, camera );
  controls.update();

  try {
    skel.set("rotation", skel.get("rotation") + 1 / fps);
    updateMapping();
  }
  catch (err) {
    console.log("Error", err);
  }
  //skel.check();
}

i = setInterval( function () {
    requestAnimationFrame( render );
}, 1000 / fps );

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  controls.handleResize();

  render();
}
