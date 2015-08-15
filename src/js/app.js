var Game = (function () {
    'use strict';

    var scene = new THREE.Scene();
    var aspect = window.innerWidth / window.innerHeight;
    var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();

    function init() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xE0EEEE);
        pointerLock.init(camera, scene);
        document.body.appendChild(renderer.domElement);
    }

    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    var defender = {};
    var attacker = {};

    return {
        init: init,
        render: render,
        camera: camera,
        scene: scene,
        defender: defender,
        attacker: attacker

    };
})();


$(document).ready(function () {
    $.connection.hub.url = "http://192.168.1.104:43210/signalr";
    var game = Game;
    var map = Map;
    var con = $.hubConnection();
    var hub = $.connection.myHub;

    game.init();

    map.resetScene(game);
    map.addLight(game);
    map.createRoad(game);


    /** Lighting **/


    $.connection.hub.start()
        .done(function () {
            hub.server.createGameRoom();
            document.location.hash = "mode=initial";
        });

    hub.on('gameRoomCreated', function () {
        $('#messages').append('Game room created !<br />');
        hub.server.createDefender();
        hub.server.createAttacker();
    });

    hub.on('defenderCreated', function () {
        $('#messages').append('Defender created !<br />');
        $('#player_1').css("background-color", "green");
    });

    hub.on('attackerCreated', function () {
        $('#messages').append('Attacker created !<br />');
        $('#player_2').css("background-color", "green");
    });

    hub.on('setupStarted', function () {
        $('#messages').append('Setup started !<br />');
        hub.server.attackerReady();
        hub.server.defenderReady();
    });

    hub.on('attackerPrepared', function () {
        $('#messages').append('Attacker prepared !<br />');

    });

    hub.on('defenderPrepared', function () {
        $('#messages').append('Defender prepared !<br />');
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