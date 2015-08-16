var Tower = (function () {
    'use strict';

    var towers = [];

    function createTower(game, posX, posY, posZ, id) {
        
        var tower = new Physijs.BoxMesh(new THREE.CubeGeometry(40, 160, 40), new THREE.MeshLambertMaterial({color: 0xFFFFFF}), 0);
        
        tower.name = "tower";
        tower.position.x = posX;
        tower.position.y = posY+60;
        tower.position.z = posZ;
        tower.towerId = id;
        game.scene.add(tower);
        
        towers.push(tower);
        return tower;
    }

    return {
        createTower: createTower,
        tower: towers
    };
})();