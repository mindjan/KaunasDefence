var Attacker = (function () {
    var attacker = new Physijs.BoxMesh(new THREE.CubeGeometry(80, 80, 80), new THREE.MeshLambertMaterial({color: 0xFF3399}), 0);

    'use strict';
    function createAtacker(game) {
        attacker.name = "attacker";
        attacker.position.x = 1;
        attacker.position.y = 40;
        attacker.position.z = 1;
        game.scene.add(attacker);
    }

    return {
        attacker: attacker,
        createAtacker: createAtacker
    };
})();