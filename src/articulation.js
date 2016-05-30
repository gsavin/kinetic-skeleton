'use strict';

class Articulation {
  constructor(skeleton, name, position = null) {
    this._skeleton = skeleton;
    this._name = name;
    this._position = position;
    this._fixed = (position != null);
    this._bones = [];
    this._solutionOrder = 0;
    this._distanceToFixedArticulation = -1;
    this._solved = false;
    this._triangles = {};
  }

  get name() {
    return this._name;
  }

  get bones() {
    return this._bones;
  }

  get position() {
    if (typeof this._position == 'function') {
      return this._position.call(this, this._skeleton);
    }
    else {
      return this._position;
    }
  }

  get x() {
    return this.position[0];
  }

  get y() {
    return this.position[1];
  }

  get isSolved() {
    return this._solved;
  }

  resetSolved() {
    this._solved = false;
  }

  get isFixed() {
    return this._fixed;
  }

  get distanceToFixedArticulation() {
    return this._distanceToFixedArticulation;
  }

  set distanceToFixedArticulation(d) {
    this._distanceToFixedArticulation = d;
  }

  addBone(bone) {
    this._bones.push(bone);
  }

  addTriangle(b, c) {
    if (!this._triangles[b]) {
      this._triangles[b] = [];
    }

    this._triangles[b].push(c);
  }

  hasTriangle(b, c) {
    if (!this._triangles[b]) {
      return false;
    }

    return this._triangles[b].indexOf(c) >= 0;
  }

  get fixedConstraints() {
    let c = 0;

    for (let bone of this._bones) {
      let o = bone.oppositeOf(this);

      if (o.isFixed) {
        c++;
      }
    }

    return c;
  }

  get solutionOrder() {
    if (this.isFixed) {
      return Number.MAX_SAFE_INTEGER;
    }

    let fc = this.fixedConstraints;

    if (fc > 0) {
      return fc;
    }

    return -this.distanceToFixedArticulation;
  }

  solvePosition() {
    if (!this.isFixed) {
      if (this._skeleton.debug) {
        console.log("solving", this.name, "...");
      }

      if (this._bones.length == 0) {
        console.log("articulation", this.name, "has no bone to compute its position.");
        return;
      }

      let c = this.fixedConstraints
        , used = [];

      for (let bone of this.bones) {
        let o = bone.oppositeOf(this);

        if (o.isSolved) {
          if (this._skeleton.debug) {
            console.log("  solve", this.name, "using", o.name, o.position);
          }

          used.push(bone);
        }
      }

      switch (used.length) {
        case 0:
        case 1:
          throw "missing solved articulation to solve " + this.name;
        default:
          let b1 = used[0]
            , b2 = used[1];

          if (b2.oppositeOf(this).x < b1.oppositeOf(this).x) {
            b1 = used[1];
            b2 = used[0];
          }

          let e1 = b1.oppositeOf(this)
            , e2 = b2.oppositeOf(this)
            , x1 = e1.x
            , y1 = e1.y
            , l1 = b1.length
            , x2 = e2.x
            , y2 = e2.y
            , l2 = b2.length
            , l3 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

          let gamma1 = Math.acos((Math.pow(l1, 2) + Math.pow(l3, 2) - Math.pow(l2, 2)) / ( 2 * l1 * l3))
            , gamma2 = -gamma1
            , delta = y2 == y1 ? 0 : Math.asin(Math.abs(y2 - y1) / l3);

          if (y1 < y2) {
            gamma1 += delta;
            gamma2 += delta;
          }
          else {
            gamma1 -= delta;
            gamma2 -= delta;
          }

          if (this._skeleton.debug) {
            console.log("  x1,y1 from", b1.name, l1, ", x2,y2 from", b2.name, l2);
            console.log("  gamma is", gamma1, gamma2);
          }

          let x3 = x1 + l1 * Math.cos(gamma1)
            , y3 = y1 + l1 * Math.sin(gamma1)
            , x4 = x1 + l1 * Math.cos(gamma2)
            , y4 = y1 + l1 * Math.sin(gamma2);

          if (isNaN(x3) || isNaN(y3) || isNaN(x4) || isNaN(y4)) {
            console.log("ERROR",
              this._skeleton.get("rotation"),
              this.name,
              [b1.name, b2.name],
              [gamma1, gamma2, (Math.pow(l1, 2) + Math.pow(l3, 2) - Math.pow(l2, 2)) / ( 2 * l1 * l3)],
              delta,
              [x1, y1],
              [x2, y2],
              [l1, l2, l3]
            );

            throw "NaN";
          }

          if (this.hasTriangle(e2.name, e1.name)) {
            if (this._skeleton.debug) {
              console.log("  using triangle#1", this.name, e2.name, e1.name);
            }

            this._position = [x3, y3];
          }
          else if (this.hasTriangle(e1.name, e2.name)) {
            if (this._skeleton.debug) {
              console.log("  using triangle#2", this.name, e1.name, e2.name);
            }

            this._position = [x4, y4];
          }
          else {
            console.log("Warning : no triangle to solve position of", this.name, [e1.name, e2.name]);
            this._position = [x3, y3];
          }

          if (this._skeleton.debug) {
            console.log("  position is", this._position);
          }

          this._solved = true;

          break;
      }
    }
    else {
      if (this._skeleton.debug) {
        console.log("articulation", this.name, "is fixed :", this.position);
      }

      this._solved = true;
    }
  }
}

module.exports = Articulation;
