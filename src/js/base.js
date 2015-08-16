var Base = (function () {
    'use strict';

    var bases = [];

    function createBase(game, posX, posY, posZ, id) {
        
        var base = new Physijs.BoxMesh(new THREE.CubeGeometry(40, 10, 40), new THREE.MeshLambertMaterial({color: 0x4CAF50}), 0);
        
        base.name = "base";
        base.position.x = posX;
        base.position.y = posY-20;
        base.position.z = posZ;
        base.towerId = id;
        game.scene.add(base);
        
        bases.push(base);
        return base;
    }

    return {
        createBase: createBase,
        base: bases
    };
})();