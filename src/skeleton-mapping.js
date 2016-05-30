'use strict';

class SkeletonMapping extends THREE.Group {
  constructor(skeleton, material) {
    super();

    this._skeleton = skeleton;
    this._material = material;
    this._meshes = [];

    skeleton.on('update', this.updateMapping.bind(this));
  }

  addShape(bone, def, rotation = null, translation = null, material = null) {
    if (material == null) {
      material = this._material;
    }

    let s = new THREE.Mesh(def.shape(), material);

    if (rotation != null) {
      s.rotation.x = rotation[0];
      s.rotation.y = rotation[1];
      s.rotation.z = rotation[2];

      let g = new THREE.Group();
      g.add(s);
      s = g;
    }

    if (translation != null) {
      s.translateX(translation[0]);
      s.translateY(translation[1]);
      s.translateZ(translation[2]);
    }

    //s.position.z = def.z;

    this._meshes.push({bone:this._skeleton.getBone(bone), mesh:s});
    this.add(s);
  }

  updateMapping() {
    for (let m of this._meshes) {
      m.mesh.rotation.z = m.bone.rotation;
      m.mesh.position.x = m.bone.source.x;
      m.mesh.position.y = m.bone.source.y;
    }
  }
}

module.exports = SkeletonMapping;
