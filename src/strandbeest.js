'use strict';

const Skeleton        = require('./skeleton')
    , shapes          = require('./shapes')
    , SkeletonMapping = require('./skeleton-mapping');

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
      .addArticulation("2'", [38.0, -7.8])
      .addArticulation("3'")
      .addArticulation("4'")
      .addArticulation("5'")
      .addArticulation("6'")
      //
      // Bones
      //
      .addBone("b", "2", "3", 41.5)
      .addBone("c", "2", "4", 39.3)
      .addBone("d", "2", "6", 40.1)
      .addBone("e", "3", "6", 55.8)
      .addBone("f", "5", "6", 39.4)
      .addBone("g", "4", "5", 36.7)
      .addBone("j", "1", "3", 50.0)
      .addBone("k", "1", "4", 61.9)
      .addBone("m", "0", "1", 15.0)
      .addBone("b'", "2'", "3'", 41.5)
      .addBone("c'", "2'", "4'", 39.3)
      .addBone("d'", "2'", "6'", 40.1)
      .addBone("e'", "3'", "6'", 55.8)
      .addBone("f'", "5'", "6'", 39.4)
      .addBone("g'", "4'", "5'", 36.7)
      .addBone("j'", "1", "3'", 50.0)
      .addBone("k'", "1", "4'", 61.9)
      //
      // Triangles
      //
      .addTriangle("1", "2", "3")
      .addTriangle("1", "4", "2")
      .addTriangle("3", "2", "6")
      .addTriangle("2", "4", "5")
      .addTriangle("2", "5", "6")
      .addTriangle("4", "5", "6")
      .addTriangle("1", "3'", "2'")
      .addTriangle("1", "2'", "4'")
      .addTriangle("3'", "6'", "2'")
      .addTriangle("2'", "5'", "4'")
      .addTriangle("2'", "6'", "5'")
      .addTriangle("4'", "6'", "5'");

      /*
    this
      .addArticulation("7")
      .addBone("a", 38.0)
      .addBone("h", "5", "7", 65.7)
      .addBone("i", "4", "7", 49.0)
      .addBone("l", 7.8)
      .addTriangle("4","7", "5")*/;
    }

    getMapping(shapeMaterial = null) {
      if (shapeMaterial == null) {
        shapeMaterial = new THREE.MeshLambertMaterial({
          color: 0x2a51a3,
          emissive: 0x222222,
          emissiveIntensity: 0.5,
          wireframe: false
        });
      }

      let skelMapping1 = new SkeletonMapping(this, shapeMaterial);

      shapes.support(geometry => {
        skelMapping1.add(new THREE.Mesh(geometry, shapeMaterial));
      });
      
      skelMapping1.addShape("j", shapes.driveBarUpper          , null              , [0, 0, 3 * shapes.thickness]);
      skelMapping1.addShape("k", shapes.driveBarLower          , null              , [0, 0, 5 * shapes.thickness]);
      skelMapping1.addShape("c", shapes.legConnectorInside     , null              , [0, 0, 4 * shapes.thickness]);
      skelMapping1.addShape("f", shapes.legConnectorOutside    , null              , [0, 0, 3 * shapes.thickness]);
      skelMapping1.addShape("b", shapes.shoulder               , null              , [0, 0, 2 * shapes.thickness]);
      skelMapping1.addShape("m", shapes.driveWheelBar          , null              , [0, 0, 1 * shapes.thickness]);
      skelMapping1.addShape("g", shapes.foot                   , null              , [0, 0, 2 * shapes.thickness]);
      skelMapping1.addShape("b", shapes.spacer                 , null              , [0, 0, 1 * shapes.thickness]);
      skelMapping1.addShape("b", shapes.spacer                 , null              , [0, 0, 3 * shapes.thickness]);
      skelMapping1.addShape("g", shapes.spacer                 , null              , [0, 0, 3 * shapes.thickness]);
      //skelMapping1.addShape("f", shapes.spacer                 , null              , [0, 0, 3 * shapes.thickness]);

      skelMapping1.addShape("j'", shapes.driveBarUpper         , [Math.PI, 0, 0]   , [0, 0, 2 * shapes.thickness]);
      skelMapping1.addShape("k'", shapes.driveBarLower         , [Math.PI, 0, 0]   , [0, 0, 4 * shapes.thickness]);
      skelMapping1.addShape("c'", shapes.legConnectorInside    , [Math.PI, 0, 0]   , [0, 0, 2 * shapes.thickness]);
      skelMapping1.addShape("f'", shapes.legConnectorOutside   , [Math.PI, 0, 0]   , [0, 0, 2 * shapes.thickness]);
      skelMapping1.addShape("b'", shapes.shoulder              , [Math.PI, 0, 0]   , [0, 0, 3 * shapes.thickness]);
      skelMapping1.addShape("g'", shapes.foot                  , [Math.PI, 0, 0]   , [0, 0, 3 * shapes.thickness]);
      skelMapping1.addShape("b'", shapes.spacer                , null              , [0, 0, 1 * shapes.thickness]);

      return skelMapping1;
    }
}

module.exports = Strandbeest;
