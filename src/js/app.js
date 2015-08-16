var Game = (function () {
    'use strict';

    var scene = new THREE.Scene();
    var aspect = window.innerWidth / window.innerHeight;
    var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    var bullet = Bullet;
    var attacker = Attacker;

    function resetGame(attacker, bullet) {

        attacker.position.x = 0;
        attacker.position.y = 40;
        attacker.position.z = 0;
        bullet.clearTimeOut();


    }

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

    /*Winning text*/
    function createText(textContent, zCoordinate) {

        var text3d = new THREE.TextGeometry(textContent, {
            size: 50,
            height: 20,
            curveSegments: 2
        });

        var textMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
        var textMesh = new THREE.Mesh(text3d, textMaterial);

        textMesh.position.set(0, 100, zCoordinate);
        textMesh.name = textContent;

        scene.add(textMesh);
    }


    var defender = {};

    var tower = {};

    return {
        init: init,
        camera: camera,
        render: render,
        scene: scene,
        attacker: attacker,
        resetGame: resetGame,
        createText: createText
    };
})();


$(document).ready(function () {
    $.connection.hub.url = "http://localhost:43210/signalr";
    var game = Game;
    var map = Map;
    var tower = Tower;
    var bullet = Bullet;
    var con = $.hubConnection();
    var hub = $.connection.myHub;
    var i = 0;
    var posX_array = {};
    var posY_array = {};
    var pos_cell_id = {};
    var towers = {};

    game.init();

    bullet.createBullet(game);
    tower.createTower(game, 400, 40, 0);
    var attacker = game.attacker.createAttacker(game);
    game.scene.add(attacker);


    bullet.shootAttackerFromTower(tower.tower[0], game.attacker.attacker);
    ////////////// On commit delete :)
    bullet.shootAttackerFromTower(tower.tower, game.attacker.attacker);
    setTimeout(function () {
        bullet.clearTimeOut();
    }, 3000);
    ///////////////////////////////

    setTimeout(function () {
        bullet.shootAttackerFromTower(tower.tower, game.attacker.attacker);
    }, 6000);
    //////////////////////////////////////

    $.connection.hub.start()
        .done(function () {
            hub.server.createGameRoom();
            document.location.hash = "mode=initial";
        });

    hub.on('gameRoomCreated', function () {
        $('#messages').append('Game room created !');
        hub.server.connectDefender();
        hub.server.connectAttacker();
    });

    hub.on('defenderConnected', function () {
        $('#messages').append('Attacker connected !');
        $('#player_1').css("background-color", "#8BC34A");
    });

    hub.on('attackerConnected', function () {
        $('#messages').append('Defender connected !');
        $('#player_2').css("background-color", "#8BC34A");
    });

    hub.on('setupStarted', function (data) {
        $('#messages').append('Setup started !');
        map.createRoad(game, data.PosY);
        $.each(data["Cells"], function (index, val) {
            if (data["Cells"][index]["Type"] == "Placement") {
                pos_cell_id[i] = data["Cells"][i]["CellId"];
                posX_array[i] = data["Cells"][i]["PosX"];
                posY_array[i] = data["Cells"][i]["PosY"];
                towers[i] = tower.createTower(game, posY_array[i] * 10, 40, posX_array[i] * 10);
                /*                console.log("id = " + pos_cell_id[i] + " posX - " + posX_array[i] + " posY - " + posY_array[i]);*/
                i++;
                hub.server.placeTower(data["Cells"][i]["CellId"]);
            }

        });

        hub.server.markAttackerReady();
        hub.server.markDefenderReady();
    });

    hub.on('attackerMoved', function (x, z) {
        game.attacker.moveAttacker(1, x * 10 * -1);
        game.camera.position.x = 1;
        game.camera.position.y = 100;
        game.camera.position.z = x * 10 * -1 + 200;
        game.camera.rotation.set(0, 0, 0);
    });

    hub.on('attackerWasMarkedReady', function () {
        $('#messages').append('Attacker was marked ready !');

    });

    hub.on('defenderWasMarkedReady', function () {
        $('#messages').append('Defender was marked ready !');
    });

    hub.on('roundStarted', function () {
        $('#messages').append('Round started!');
    });

    hub.on('attackerWon', function () {
        game.createText('Attacker wins!', attacker.position.z);

    });

    hub.on('roundFinished', function () {
        game.resetGame(attacker, bullet);
        $('#messages').append('Round finished!<br />');
        $('#notification_bar').show();
        $('#health_bar').hide();
        hub.server.markAttackerReady();
        hub.server.markDefenderReady();
        setTimeout(function () {
            $('#notification_bar').hide();
        }, 3000);
    });


    hub.on('defenderWon', function () {
        game.createText('Defender wins!', attacker.position.z);
    });

    hub.on('attackerReceivedDamage', function (health_left) {
        $('#messages').append('Attacker received damage !');
        $('#health_bar').css("width", health_left + "%");
    });

    hub.on('towerStartedShooting', function () {
        bullet.shootAttackerFromTower(tower.tower, game.attacker.attacker);
    });

    hub.on('towerStoppedShooting', function () {
        bullet.clearTimeOut();
    });

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