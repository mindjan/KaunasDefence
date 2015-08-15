$.connection.hub.url = "http://172.16.243.156:18080/signalr";

var con = $.hubConnection();
var hub = $.connection.mainTowerDefenseHub;
hub.on('onMonitorConnected', function (game) {

});

$.connection.hub.start()
    .done(function () {
        hub.server.connectMonitor();
    });


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

    return {
        init: init
    };
})();

$(document).ready(function () {
    var game = Game;
    game.init();
});