var Attacker = (function () {
    'use strict';

var attacker;

function createAtacker() {
		attacker = new Physijs.BoxMesh(new THREE.CubeGeometry(80, 80, 80), new THREE.MeshLambertMaterial({color: 0xFF6666 }), 0);
		attacker.name = "attacker";
		attacker.position.x = 1;
        attacker.position.y = 40;
        attacker.position.z = 1;

        return attacker;
    }
function moveAtacker(x, z) {
    // var attacker = game.scene.getObjectByName( "attacker", true );
    attacker.position.x = x;
    attacker.position.z = z;
    }
function moveAtackertest(x,z, game )
{
        game.attacker.moveAtacker(x, z);
        game.camera.position.x = x;
        game.camera.position.y = 100;
        game.camera.position.z = z+200;
        game.camera.rotation.set(0, 0, 0);
}
      return {
        createAtacker: createAtacker,
        moveAtacker : moveAtacker,
        moveAtackertest : moveAtackertest
    };

})();
