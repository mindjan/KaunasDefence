var Bullet = (function () {
    var bullet = new Physijs.BoxMesh(new THREE.CubeGeometry(10, 10, 10), new THREE.MeshLambertMaterial({color: 0xff0f0f}), 0);

    'use strict';
    function createBullet(game) {
        bullet.name = "Bullet";
        bullet.position.x = 380;
        bullet.position.y = 100;
        bullet.position.z = 1;
        game.scene.add(bullet);
    }

    function shootAttackerFromTower(tower, attacker) {

        var i = tower.position.x - attacker.position.x;

        console.log(i);
        console.log("Aaaaaaaaaaaaaaa");

        function timeout() {
            setTimeout(function () {
                timeout();


                if (attacker.x < 1000) {

                    bullet.position.x -= 5;
                }
                else clearInterval();
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
