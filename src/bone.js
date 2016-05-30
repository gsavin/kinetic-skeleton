'use strict';

class Bone {
  constructor(skeleton, name, source, target, length) {
    this._skeleton = skeleton;
    this._name = name;
    this._source = source;
    this._target = target;
    this._length = length;
  }

  get name() {
    return this._name;
  }

  get length() {
    return this._length;
  }

  get source() {
    return this._source;
  }

  get target() {
    return this._target;
  }

  get rotation() {
    let x1 = this.source.x
      , y1 = this.source.y
      , x2 = this.target.x
      , y2 = this.target.y;

    return Math.atan2(y2 - y1, x2 - x1);
  }

  oppositeOf(bone) {
    return this.source == bone ? this.target : (this.target == bone ? this.source : null);
  }
}

module.exports = Bone;
