var Bullet = (function () {
    var bullet = new Physijs.BoxMesh(new THREE.CubeGeometry(10, 10, 10), new THREE.MeshLambertMaterial({color: 0xFF1744}), 0);
    var intervalValue = 0;
    var intervalTimeout;

    'use strict';
    function createBullet(game) {
        bullet.name = "Bullet";
        bullet.position.x = 380;
        bullet.position.y = 50;
        bullet.position.z = 0;
        game.scene.add(bullet);
    }

    function clearTimeOut() {
        window.clearTimeout(intervalTimeout);
        bullet.position.x = 400;
        bullet.position.z = 0;
    }

    function shootAttackerFromTower(tower, attacker) {

        var distance = Math.sqrt(Math.pow(tower.position.x - attacker.position.x, 2) + Math.pow(attacker.position.z - tower.position.z, 2));

        var interval = 50;
        var distValue = distance / interval;
        var distX;

        function timeout() {
            intervalTimeout = setTimeout(function () {
                timeout();

                if (intervalValue * distValue < distance * 0.8) {
                    distance = Math.sqrt(Math.pow(tower.position.x - attacker.position.x, 2) + Math.pow(attacker.position.z - tower.position.z, 2));

                    /**
                     * Moving x position
                     */
                    distX = tower.position.x - attacker.position.x;
                    bullet.position.x -= distX / interval;
                    distX -= bullet.position.x;


                    /**
                     * Moving z position
                     */

                    bullet.position.z = Math.sqrt(Math.pow(distance / interval * intervalValue, 2) - Math.pow(intervalValue * (tower.position.x - attacker.position.x) / interval, 2));
                    intervalValue++;
                }
                else {

                    intervalValue = 0;
                    bullet.position.x = 400;
                }

            }, 100);
        }

        timeout();

    }

    return {
        bullet: bullet,
        createBullet: createBullet,
        shootAttackerFromTower: shootAttackerFromTower,
        clearTimeOut: clearTimeOut
    };
})();
