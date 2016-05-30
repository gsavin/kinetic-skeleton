'use strict';

const Bone          = require('./bone.js')
    , Articulation  = require('./articulation.js');

const EventEmitter  = require('events');

class Skeleton extends EventEmitter {
  constructor() {
    super();

    this._articulations = {};
    this._bones = {};
    this._precision = 3;
    this._properties = new Map();
    this._debug = false;
  }

  addArticulation(name, position = null) {
    let a = new Articulation(this, name, position);

    if (this._articulations[name]) {
      console.log("Articulation", name, "already exists.");
    }

    this._articulations[name] = a;

    return this;
  }

  addBone(name, source, target, length) {
    let s = this._articulations[source]
      , t = this._articulations[target];

    if (!s || !t) {
      console.log("Articulation", (!s ? source : target), "is missing.");
    }
    else {
      let b = new Bone(this, name, s, t, length);

      if (this._bones[name]) {
        console.log("Bone", name, "already exists.");
      }

      s.addBone(b);
      t.addBone(b);

      this._bones[name] = b;
    }

    this.computeDistancesToFixedArticulations();

    return this;
  }

  addTriangle(a, b, c) {
    let artA = this._articulations[a]
      , artB = this._articulations[b]
      , artC = this._articulations[c];

    if (!artA) {
      throw "Unknown articulation " + a;
    }

    if (!artB) {
      throw "Unknown articulation " + b;
    }

    if (!artC) {
      throw "Unknown articulation " + c;
    }

    artA.addTriangle(b, c);
    artB.addTriangle(c, a);
    artC.addTriangle(a, b);

    return this;
  }

  get debug() {
    return this._debug;
  }

  getBone(id) {
    return this._bones[id];
  }

  get(property) {
    if (!this._properties.has(property)) {
      console.log("unknown property", property);
      return null;
    }

    return this._properties.get(property);
  }

  set(property, value) {
    this._properties.set(property, value);
    this.solvePositions();
  }

  *[Symbol.iterator]() {
    for(let name of Object.keys(this._articulations)) {
      yield this._articulations[name];
    }
  }

  *orderedArticulations() {
    let keys = Object.keys(this._articulations).sort((a, b) => {
      return this._articulations[b].solutionOrder - this._articulations[a].solutionOrder;
    });

    for(let name of keys) {
      yield this._articulations[name];
    }
  }

  *bones() {
    for (let name of Object.keys(this._bones)) {
      yield this._bones[name];
    }
  }

  computeDistancesToFixedArticulations() {
    let change = 0
      , distances = {}
      , next = [];

    for (let articulation of this) {
      distances[articulation.name] = articulation.isFixed ? 0 : -1;

      if (articulation.isFixed) {
        next.push(articulation);
      }
    }

    while (next.length > 0) {
      let nextNext = [];

      for (let articulation of next) {
        let childDistance = distances[articulation.name] + 1;

        for (let bone of articulation.bones) {
          let o = bone.oppositeOf(articulation);

          if (distances[o.name] < 0 || childDistance < distances[o.name]) {
            distances[o.name] = childDistance;
            nextNext.push(o);
          }
        }
      }

      next = nextNext;
    }

    for (let articulation of this) {
      articulation.distanceToFixedArticulation = distances[articulation.name];
    }
  }

  show() {
    for(let articulation of this) {
      console.log("-", articulation.name, articulation.position, articulation.solutionOrder);
    }
  }

  check() {
    let f = Math.pow(10, this._precision);

    for (let bone of this.bones()) {
      let l = Math.sqrt(Math.pow(bone.source.x - bone.target.x, 2) + Math.pow(bone.source.y - bone.target.y, 2));

      if (Math.round(l*f) != Math.round(bone.length*f)) {
        console.log("Warning : length of", bone.name, ", expecting", bone.length, ", got", l);
      }
    }
  }

  svg() {
    console.log("<svg>");
    for (let bone of this.bones()) {
      console.log(`<line id="${bone.name}" x1="${bone.source.position[0]}" y1="${bone.source.position[1]}" x2="${bone.target.position[0]}" y2="${bone.target.position[1]}" style="stroke:rgb(0,0,0);stroke-width:0.5"/>`)
    }
    console.log("</svg>");
  }

  solvePositions() {
    for (let articulation of this) {
      articulation.resetSolved();
    }

    for(let articulation of this.orderedArticulations()) {
      articulation.solvePosition();
    }

    this.emit('update');
  }
}

module.exports = Skeleton;
