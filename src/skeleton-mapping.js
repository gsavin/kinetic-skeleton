'use strict';

class SkeletonMapping extends THREE.Group {
  constructor(skeleton, material) {
    super();

    this._skeleton = skeleton;
    this._material = material;
    this._meshes = [];

    skeleton.on('update', this.updateMapping.bind(this));
  }

  addShape(bone, def, material = null) {
    if (material == null) {
      material = this._material;
    }

    let s = new THREE.Mesh(def.shape(), material);
    s.position.z = def.z;

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
