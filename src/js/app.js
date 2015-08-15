var Game = (function () {
    'use strict';

    var scene = new THREE.Scene();
    var aspect = window.innerWidth / window.innerHeight;
    var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();

    function init() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000);
        pointerLock.init(camera, scene);
        document.body.appendChild(renderer.domElement);
    }

    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    var defender = {};
    var attacker = Attacker;
    var tower = {};

    return {
        init: init,
        camera: camera,
        render: render,
        scene: scene,
        attacker: attacker
    };
})();


$(document).ready(function () {
    $.connection.hub.url = "http://192.168.1.104:43210/signalr";
    var game = Game;
    var map = Map;
    var tower = Tower;
    var bullet = Bullet;
    var con = $.hubConnection();
    var hub = $.connection.myHub;

    game.init();

    /**
     * On commit delete
     */
    map.createRoad(game, 4000);
    bullet.createBullet(game);
    tower.createTower(game, 400, 40, 1);
    game.scene.add(game.attacker.createAtacker(game));

    bullet.shootAttackerFromTower(tower.tower, game.attacker.attacker);

    /*$.connection.hub.start()
        .done(function () {
            hub.server.createGameRoom();
            document.location.hash = "mode=initial";
        });

    hub.on('gameRoomCreated', function () {
        $('#messages').append('Game room created !<br />');
        hub.server.connectDefender();
        hub.server.connectttacker();
    });

    hub.on('attackerConnected', function () {
        $('#messages').append('Attacker connected !<br />');
        $('#player_2').css("background-color", "green");
    });

    hub.on('setupStarted', function (data) {
        $('#messages').append('Setup started !<br />');
        /!**
         * On commit uncomment
         *!/
            //map.createRoad(game, data.posY);
        hub.server.markAttackerReady();
        hub.server.markDefenderReady();
    });

    hub.on('attackerMove', function (x, z) {
        attacker.moveAtacker(x, z);
        game.camera.position.set(x, 200, z + 50);
        game.camera.rotation.set(50, 0, 0);
    });


    hub.on('setupStarted', function () {
        $('#messages').append('Setup started !<br />');
        hub.server.markAttackerReady();
        hub.server.markDefenderReady();
    });

    hub.on('attackerWasMarkedReady', function () {
        $('#messages').append('Attacker was marked ready !<br />');

    });

    hub.on('defenderWasMarkedReady', function () {
        $('#messages').append('Defender was marked ready !<br />');
    });

    hub.on('defenderWasMarkedReady', function () {
        $('#messages').append('Defender was marked ready !<br />');
    });

    hub.on('roundStarted', function () {
        $('#messages').append('Round started!<br />');
    });

    hub.on('attackerWon', function () {
        $('#messages').append('Attacker won!<br />');
    });

    hub.on('roundFinished', function () {
        $('#messages').append('Round finished!<br />');
    });


    hub.on('defenderWon', function () {
        $('#messages').append('Defender won!<br />');
    });

    hub.on('attackerReceivedDamage', function (health_left) {
        $('#messages').append('Attacker received damage !<br />');
        $('#health_bar').css("width", health_left + "%");
    });
*/

    $('#player_1').click(function () {
        document.location.hash = "mode=attacker";
    });

    $('#player_2').click(function () {
        document.location.hash = "mode=defender";
    });


    window.onhashchange = function () {
        var what_to_do = document.location.hash;
        if (what_to_do == "#mode=initial") {
            console.log("initial mode");
        } else if (what_to_do == "#mode=attacker") {
            console.log("attacker mode");
        } else if (what_to_do == "#mode=defender") {
            console.log("defender mode");
        }
    };


});