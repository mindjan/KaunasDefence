var targetList = [];
var projector, mouse = { x: 0, y: 0 };

function onDocumentMouseDown( event ) 
{
    // the following line would stop any other event handler from firing
    // (such as the mouse's TrackballControls)
    // event.preventDefault();
    
    console.log("Click.");
    
    // update the mouse variable
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
    // find intersections

    // create a Ray with origin at the mouse position
    //   and direction into the scene (camera direction)
    var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
    projector.unprojectVector( vector, Game.camera );
    var ray = new THREE.Raycaster( Game.camera.position, vector.sub( Game.camera.position ).normalize() );

    // create an array containing all objects in the scene with which the ray intersects
    var intersects = ray.intersectObjects( targetList );
    
    // if there is one (or more) intersections
    if ( intersects.length > 0 )
    {
        console.log("Hit @ " + toString( intersects[0].point ) );
        // change the color of the closest face.
        intersects[ 0 ].face.color.setRGB( 0.8 * Math.random() + 0.2, 0, 0 ); 
        intersects[ 0 ].object.geometry.colorsNeedUpdate = true;
    }

}

var Game = (function () {
    'use strict';

    var scene = new THREE.Scene();
    var aspect = window.innerWidth / window.innerHeight;
    var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    var bullet = Bullet;
    var attacker = Attacker;
    projector = new THREE.Projector();

    function resetGame(attacker, bullet) {

        attacker.position.x = 0;
        attacker.position.y = 40;
        attacker.position.z = 0;
        bullet.clearTimeOut();


    }

    function init() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000);
        //pointerLock.init(camera, scene);
        document.body.appendChild(renderer.domElement);
        document.addEventListener( 'mousedown', onDocumentMouseDown, false );
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
    $.connection.hub.url = "http://192.168.1.107:43210/signalr";
    var game = Game;
    var map = Map;
    var tower = Tower;
    var base = Base;
    var bullet = Bullet;
    var con = $.hubConnection();
    var hub = $.connection.myHub;
    var i = 0;
    var posX_array = {};
    var posY_array = {};
    var pos_cell_id = {};
    var towers = {};
    var bases = {};

    game.init();

    bullet.createBullet(game);
    tower.createTower(game, 400, 40, 0);
    var attacker = game.attacker.createAttacker(game);
    game.scene.add(attacker);


    bullet.shootAttackerFromTower(tower.tower[0], game.attacker.attacker);
    setTimeout(function () {
        bullet.clearTimeOut();
    }, 3000);
    ///////////////////////////////

    setTimeout(function () {
        bullet.shootAttackerFromTower(tower.tower[0], game.attacker.attacker);
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

    hub.on('gameInitialized', function (data) {
        $('#messages').append('Game initialized !');
        game.mapSize = data.PosY*10;
        map.createRoad(game, data.PosY);
        $.each(data.Cells, function (index, val) {
            if (data.Cells[index].Type == "Placement") {
                var cellId = data.Cells[index].CellId;
                var posX = data.Cells[index].PosX;
                var posY = data.Cells[index].PosY;
                bases[i] = base.createBase(game, posY * 17 - 230, 40, (posX * -10) + (game.mapSize/2), cellId);
                //hub.server.placeTower(cellId);
                targetList.push(bases[i]);
                i++;                
            }
        });
    });

    hub.on('setupStarted', function () {
        $('#messages').append('Setup started !');
        
        hub.server.markAttackerReady();
        hub.server.markDefenderReady();
    });

    hub.on('attackerMoved', function (x, z) {
        var xCord = x*(-10)+(game.mapSize/2);
        game.attacker.moveAttacker(1, xCord);
        game.camera.position.x = 1;
        game.camera.position.y = 100;
        game.camera.position.z = xCord + 200;
        game.camera.rotation.set(0, 0, 0);
    });

    hub.on('attackerWasMarkedReady', function () {
        $('#messages').append('Attacker was marked ready !');

    });

    hub.on('defenderWasMarkedReady', function () {
        $('#messages').append('Defender was marked ready !');
    });

    hub.on('roundStarted', function () {
        $('#notification_bar').hide();
        $('#health_bar').show();
    });

    hub.on('attackerWon', function () {
        game.createText('Attacker wins!', attacker.position.z);

    });

    hub.on('roundFinished', function () {
        game.resetGame(attacker, bullet);
        $('#messages').append('Round finished!<br />');
        $('#notification_bar').show();
        $('#health_bar').hide();
    });


    hub.on('defenderWon', function () {
        game.createText('Defender wins!', attacker.position.z);
    });

    hub.on('attackerReceivedDamage', function (health_left) {
        $('#messages').append('Attacker received damage !');
        $('#health_bar').css("width", health_left + "%");
    });

    hub.on('towerStartedShooting', function (id) {
        $.each(towers, function (index, val) {
            if (towers[index].towerId == id) {
                val.material.color.setHex(0xff0000);
                Bullet.shootAttackerFromTower(val, Attacker.attacker);
            }
        });        
    });

    hub.on('towerStoppedShooting', function (id) {
        $.each(towers, function (index, val) {
            if (towers[index].towerId == id) {
                val.material.color.setHex(0xFFFFFF);
            }
        });  
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