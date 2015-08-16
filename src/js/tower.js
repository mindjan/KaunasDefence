var Tower = (function () {
    'use strict';

    var towers = [];

    function createTower(game, posX, posY, posZ) {
        
        var tower = new Physijs.BoxMesh(new THREE.CubeGeometry(40, 160, 40), new THREE.MeshLambertMaterial({color: 0xFFFFFF}), 0);
        
        tower.name = "tower";
        tower.position.x = posX;
        tower.position.y = posY;
        tower.position.z = posZ;
        game.scene.add(tower);
        
        towers.push(tower);
        return tower;
    }

    return {
        createTower: createTower,
        tower: towers
    };
})();