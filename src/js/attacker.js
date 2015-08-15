var Attacker = (function () {
    "use strict";
    var attacker = new Physijs.BoxMesh(new THREE.CubeGeometry(80, 80, 80), new THREE.MeshLambertMaterial({color: 0xFF3399}), 0);

    'use strict';
    function createAtacker(game) {
        attacker.name = "attacker";
        attacker.position.x = 0;
        attacker.position.y = 40;
        attacker.position.z = 0;
        game.scene.add(attacker);
        
        return attacker;
    }

    function moveAtacker(x, z) {
        attacker.position.x = x;
        attacker.position.z = z;
    }

    return {
        attacker: attacker,
        createAtacker: createAtacker,
        moveAtacker : moveAtacker
    };
})();