var Attacker = (function () {
    'use strict';

function createAtacker(game) {
		var attacker = new Physijs.BoxMesh(new THREE.CubeGeometry(80, 80, 80), new THREE.MeshLambertMaterial({color: 0xFF3399 }), 0);
		attacker.name = "attacker";
		attacker.position.x = 1;
        attacker.position.y = 40;
        attacker.position.z = 1;
        game.scene.add(attacker);
    }

      return {
        createAtacker: createAtacker
    };
})();