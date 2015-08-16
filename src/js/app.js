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
    game.scene.add(game.attacker.createAttacker(game));


    bullet.shootAttackerFromTower(tower.tower[0], game.attacker.attacker);


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
        $.each(data["Cells"], function(index, val) {
            if (data["Cells"][index]["Type"] == "Placement") {
                pos_cell_id[i] = data["Cells"][i]["CellId"];
                posX_array[i] = data["Cells"][i]["PosX"];
                posY_array[i] = data["Cells"][i]["PosY"];
                towers[i] = tower.createTower(game, posY_array[i]*10, 40, posX_array[i]*10);
/*                console.log("id = " + pos_cell_id[i] + " posX - " + posX_array[i] + " posY - " + posY_array[i]);*/
                i++;
            } 
            
        });
        
        hub.server.markAttackerReady();
        hub.server.markDefenderReady();
    });

    hub.on('attackerMove', function (x, z) {
        game.attacker.moveAttacker(1, z*10*-1);
        game.camera.position.x = 1;
        game.camera.position.y = 100;
        game.camera.position.z = z*10*-1 +200;
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
        $('#messages').append('Attacker won!');
    });

      hub.on('defenderWon', function () {
        $('#messages').append('Defender won!');
    });
    
    hub.on('roundFinished', function () {
        $('#messages').append('Round finished!');
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