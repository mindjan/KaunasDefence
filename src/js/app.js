var Game = (function () {
    'use strict';

    var scene = new THREE.Scene();
    var aspect = window.innerWidth / window.innerHeight;
    var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();

    function init() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
    }

    var defender = {};
    var attacker = {};

    return {
        init: init,
        defender: defender,
        attacker: attacker
    };
})();

$(document).ready(function () {
    $.connection.hub.url = "http://192.168.1.104:43210/signalr";
    var game = Game;
    var con = $.hubConnection();
    var hub = $.connection.mainTowerDefenseHub;

    game.init();

    $.connection.hub.start()
        .done(function () {
            hub.server.createGameRoom();
        });

    hub.on('gameRoomCreated', function () {
        $.connection.hub.start()
            .done(function () {
                hub.server.createDefender(game.defender);
            });
    });
    hub.on('gameRoomCreated', function () {
        $.connection.hub.start()
            .done(function () {
                hub.server.createAttacker(game.attacker);
            });
    });

    hub.on('defenderCreated', function () {
        $('#messages').append('asd');
    });
    hub.on('attackerCreated', function () {
                hub.server.createAttacker(game.attacker);
    });
});


