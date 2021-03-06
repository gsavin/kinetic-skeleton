'use strict';

class SkeletonMapping extends THREE.Group {
  constructor(skeleton, material) {
    super();

    this._skeleton = skeleton;
    this._material = material;
    this._meshes = [];
    this._promises = [];

    this.updateMapping = this.updateMapping.bind(this);

    skeleton.on('update', this.updateMapping);
  }

  addShape(bone, geometryFactory, rotation = null, translation = null, material = null) {
    if (material == null) {
      material = this._material;
    }

    let p = new Promise((resolve, reject) => {
      geometryFactory(geometry => {
        let s = new THREE.Mesh(geometry, material);

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

        this._meshes.push({bone:this._skeleton.getBone(bone), mesh:s});
        this.add(s);

        resolve();
      });
    });

    this._promises.push(p);
  }

  onceLoaded(cb) {
    Promise.all(this._promises).then(() => {
      this._promises = [];
      cb();
    });
  }

  clone() {
    let c = new SkeletonMapping(this._skeleton, this._material)
      , t = [];

    for (let m of this._meshes) {
      let s = m.mesh.clone();

      c._meshes.push({bone:m.bone, mesh: s});
      c.add(s);

      t.push(m.mesh.id);
    }

    for (let child of this.children) {
      if (t.indexOf(child.id) < 0) {
        t.push(child.id);
        c.add(child.clone());
      }
    }

    return c;
  }

  get skeleton() {
    return this._skeleton;
  }

  set skeleton(skeleton) {
    this._skeleton.removeListener('update', this.updateMapping);

    this._skeleton = skeleton;

    for (let m of this._meshes) {
      m.bone = skeleton.getBone(m.bone.name);
    }

    this._skeleton.on('update', this.updateMapping);
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
