'use strict';

const Skeleton  = require('./skeleton')
    , shapes    = require('./shapes');

class Strandbeest extends Skeleton {
  constructor() {
    super();

    this
      //
      // Articulations
      //
      .addArticulation("0", [0, 0])
      .addArticulation("1", function(skeleton) {
        return [15 * Math.cos(skeleton.get("rotation")), 15 * Math.sin(skeleton.get("rotation"))]
      })
      .addArticulation("2", [-38.0, -7.8])
      .addArticulation("3")
      .addArticulation("4")
      .addArticulation("5")
      .addArticulation("6")
      //.addArticulation("7")
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
      //.addBone("h", "5", "7", 65.7)
      //.addBone("i", "4", "7", 49.0)
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
      //.addTriangle("4", "7", "5")
      .addTriangle("2", "5", "6")
      .addTriangle("4", "5", "6");
    }
}

module.exports = Strandbeest;
