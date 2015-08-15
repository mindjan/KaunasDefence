var Bullet = (function () {
    var bullet = new Physijs.BoxMesh(new THREE.CubeGeometry(10, 10, 10), new THREE.MeshLambertMaterial({color: 0xff0f0f}), 0);

    'use strict';
    function createBullet(game) {
        bullet.name = "Bullet";
        bullet.position.x = 380;
        bullet.position.y = 50;
        bullet.position.z = 0;
        game.scene.add(bullet);
    }

    function shootAttackerFromTower(tower, attacker) {
        var attackerWidth = attacker.position.x;
        var distYAttacker = attacker.position.z;

        var x = tower.position.x - attackerWidth;
        var z = distYAttacker - tower.position.z;
        var distance = Math.sqrt(Math.pow(x, 2) + Math.pow(z, 2));

        var interval = 50;
        var intervalValue = 0;
        var distValue = distance / interval;
        var distX = attacker.position.x;

        console.log(distValue);

        function timeout() {
            setTimeout(function () {
                timeout();

                if (intervalValue * distValue < distance) {

                    /**
                     * Moving x position
                     */
                    distX = tower.position.x - attacker.position.x;
                    bullet.position.x -= distX / interval;
                    distX -= bullet.position.x;


                    /**
                     * Moving z position
                     */

                    bullet.position.z = Math.sqrt(Math.pow(distance/interval * intervalValue, 2) - Math.pow(intervalValue * x/interval, 2));
                    intervalValue++;
                }
                else {
                    intervalValue = 0;
                    bullet.position.x = 400;
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
