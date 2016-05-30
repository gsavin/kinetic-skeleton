'use strict';

class SkeletonMesh extends THREE.Group {
  constructor(skeleton, material) {
    super();

    this.skeleton = skeleton;
    this.material = material;
    this.lines = {};

    for (let bone of this.skeleton.bones()) {
      let geometry = new THREE.Geometry();

      geometry.vertices.push(
      	new THREE.Vector3(bone.source.x, bone.source.y, 10),
      	new THREE.Vector3(bone.target.x, bone.target.y, 10)
      );

      let line = new THREE.Line(geometry, material);
      this.add(line);

      this.lines[bone.name] = line;
    }

    skeleton.on('update', this.onUpdate.bind(this));
  }

  onUpdate() {
    for (let bone of this.skeleton.bones()) {
      let geometry = this.lines[bone.name].geometry;

      geometry.vertices[0].x = bone.source.x;
      geometry.vertices[0].y = bone.source.y;
    	geometry.vertices[1].x = bone.target.x;
      geometry.vertices[1].y = bone.target.y;

      geometry.verticesNeedUpdate = true;
    }
  }
}

module.exports = SkeletonMesh;
