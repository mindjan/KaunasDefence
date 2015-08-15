'use strict';

$.connection.hub.url = "http://172.16.243.156:18080/signalr";

var con = $.hubConnection();
var hub = $.connection.mainTowerDefenseHub;
hub.on('onMonitorConnected', function (game) {
});

$.connection.hub.start()
    .done(function () {
        hub.server.connectMonitor();
    });