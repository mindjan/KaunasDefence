/**
 * Created by root on 15.8.15.
 */
var Map = (function () {
    'use strict';

    function createRoad(game, roadLength) {

        var roadTexture = THREE.ImageUtils.loadTexture('img/road.png');
        roadTexture.wrapS = roadTexture.wrapT = THREE.RepeatWrapping;
        roadTexture.repeat.set(1, 1);

        var road = new THREE.Mesh(
            new THREE.BoxGeometry(500, 20, roadLength),
            new THREE.MeshLambertMaterial({
                map: roadTexture
            })
        );


        road.name = "road";
        resetScene(game);
        addLight(game);

        game.scene.add(road);
    }

    function addLight(game) {
        var ambientLight = new THREE.AmbientLight(0xcccccc);
        game.scene.add(ambientLight);

        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(0, 200, -50);
        game.scene.add(spotLight);

        game.render();
    }

    function resetScene(game) {
        game.camera.position.set(-100, 100, 500);
        game.camera.rotation.set(50, 0, 0);
    }

    return {
        createRoad: createRoad,
        resetScene: resetScene,
        addLight: addLight
    };
})();