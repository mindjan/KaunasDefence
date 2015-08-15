var Attacker = (function () {
    "use strict";
    var attacker = new Physijs.BoxMesh(new THREE.CubeGeometry(80, 80, 80), new THREE.MeshLambertMaterial({color: 0xFF3399}), 0);

    'use strict';
    function createAttacker(game) {
        attacker.name = "attacker";
        attacker.position.x = 0;
        attacker.position.y = 40;
        attacker.position.z = 0;
        game.scene.add(attacker);
        
        return attacker;
    }

    function moveAttacker(x, z) {
        attacker.position.x = x;
        attacker.position.z = z;
    }

    return {
        attacker: attacker,
        createAttacker: createAttacker,
        moveAttacker : moveAttacker
    };
})();