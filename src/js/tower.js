var Tower = (function () {
    'use strict';

function createTower(game) {
		var tower = new Physijs.BoxMesh(new THREE.CubeGeometry(40, 160, 40), new THREE.MeshLambertMaterial({color: 0xFFFFFF }), 0);
		tower.name = "tower";
		tower.position.x = 400;
        tower.position.y = 40;
        tower.position.z = 1;
        game.scene.add(tower);
    }

      return {
        createTower: createTower
    };
})();