var Bullet = (function () {
    var bullet = new Physijs.BoxMesh(new THREE.CubeGeometry(10, 10, 10), new THREE.MeshLambertMaterial({color: 0xff0f0f}), 0);

    'use strict';
    function createBullet(game) {
        bullet.name = "Bullet";
        bullet.position.x = 380;
        bullet.position.y = 50;
        bullet.position.z = 1;
        game.scene.add(bullet);
    }

    function shootAttackerFromTower(tower, attacker) {

        var x = tower.position.x - attacker.position.x;

        function timeout() {
            setTimeout(function () {
                timeout();

                if (x > 0) {
                    console.log(x);
                    x -= 5;
                    bullet.position.x -= 5;
                }
                else {
                    x = tower.position.x - attacker.position.x;
                    bullet.position.x = tower.position.x;
                }
            }, 1);
        }

        timeout();

    }

    return {
        bullet: bullet,
        createBullet: createBullet,
        shootAttackerFromTower: shootAttackerFromTower
    };
})();
