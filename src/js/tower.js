var Tower = (function () {
    'use strict';

    var tower = new Physijs.BoxMesh(new THREE.CubeGeometry(40, 160, 40), new THREE.MeshLambertMaterial({color: 0xB71C1C}), 0);

    function createTower(game, posX, posY, posZ) {
        tower.name = "tower";
        tower.position.x = posX;
        tower.position.y = posY;
        tower.position.z = posZ;
        game.scene.add(tower);
    }

    return {
        tower: tower,
        createTower: createTower
    };
})();