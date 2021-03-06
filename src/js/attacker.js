var Attacker = (function () {
    "use strict";
    var attacker = new Physijs.BoxMesh(new THREE.CubeGeometry(80, 80, 80), new THREE.MeshLambertMaterial({color: 0x81D4FA}), 0);

    function createAtacker(game) {
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
        createAttacker: createAtacker,
        moveAttacker : moveAttacker
    };
})();