/**
 * Created by root on 15.8.15.
 */
var Map = (function () {
    'use strict';

    function createRoad(game) {

        var roadTexture = THREE.ImageUtils.loadTexture('img/road.png');
        roadTexture.wrapS = roadTexture.wrapT = THREE.RepeatWrapping;
        roadTexture.repeat.set(1, 1);

        var road = new THREE.Mesh(
            new THREE.BoxGeometry(1000, 1000, 700),
            new THREE.MeshLambertMaterial({
                map: roadTexture
            })
        );


        road.name = "road";
        road.position.y = 1;
        road.position.z = 1;
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
        game.camera.position.set(0, 1000, 50);
        game.camera.rotation.set(30, 0, 0);
    }

    return {
        createRoad: createRoad,
        resetScene: resetScene,
        addLight: addLight
    };
})();