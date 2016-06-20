var canvasWidth = 1280;
var canvasHeight = 720;

var game = new Phaser.Game(canvasWidth, canvasHeight, Phaser.AUTO, 'pongolf', { preload: preload, create: create, update: update, render: render });

function preload() {
    
    game.load.image('ball', 'assets/ball.png');
    game.load.image('paddle', 'assets/paddle.png');
    game.load.image("map01", "assets/map01.png");
    game.load.physics("map01_physics", "assets/map01.json");
}

var ball;
var paddle1;
var paddle2;
var Wkey, Skey;
var UpKey, DownKey;
var debugKey;
var ballMaterial;
var debug = false;
var paddleSpeed = 200;
var field;

function create() {
    game.physics.startSystem(Phaser.Physics.P2JS);
    
    //  Turn on impact events for the world, without this we get no collision callbacks
    game.physics.p2.setImpactEvents(true);
    
    game.physics.p2.restitution = 1;
    game.physics.p2.applyDamping = false;
    
    ballMaterial = game.physics.p2.createMaterial();
    game.physics.p2.createContactMaterial(ballMaterial, ballMaterial, {friction: 0, restitution: 1});
    
    field = createField();
    ball = createBall(380, 150, 200, 45);
    paddle1 = createPaddle(230, 500, -45);
    paddle2 = createPaddle(1050, 500, 45);
    
    // collision callbacks
    var ballCollisionGroup = game.physics.p2.createCollisionGroup();
    var fieldCollisionGroup = game.physics.p2.createCollisionGroup();
    ball.body.setCollisionGroup(ballCollisionGroup);
    field.body.setCollisionGroup(fieldCollisionGroup);
    ball.body.collides(fieldCollisionGroup, hitMap);
    field.body.collides(ballCollisionGroup);
    
    // player 1 keys
    Wkey = game.input.keyboard.addKey(Phaser.KeyCode.W);
    Skey = game.input.keyboard.addKey(Phaser.KeyCode.S);
    
    // player 2 keys
    UpKey = game.input.keyboard.addKey(Phaser.KeyCode.UP);
    DownKey = game.input.keyboard.addKey(Phaser.KeyCode.DOWN);
    
    // debug keys
    debugKey = game.input.keyboard.addKey(Phaser.KeyCode.TAB);
    debugKey.onDown.add(onDebugKeyDown, this);
}

function createField() {
    var field = game.add.sprite(canvasWidth/2, canvasHeight/2, 'map01');
    game.physics.p2.enable(field, debug);
    field.body.clearShapes();
    field.body.loadPolygon("map01_physics", "map01");
    field.body.static = true;
    return field;
}

function createBall(x, y, speed, rotation) {
    var ball = game.add.sprite(x, y, 'ball');
    game.physics.p2.enable(ball, debug);
    ball.body.rotation = rotation / 180 * Math.PI;
    ball.body.moveForward(speed);
    ball.body.setCircle(ball.width / 2);
    return ball;
}

function createPaddle(x, y, rotation) {
    var paddle = game.add.sprite(x, y, 'paddle');
    game.physics.p2.enable(paddle, debug);
    paddle.body.kinematic = true;
    paddle.body.rotation = rotation / 180 * Math.PI;
    return paddle;
}

function hitMap(body1, body2) {
    console.log("foobar");
}

function onDebugKeyDown() { 
    // toggle
    debug = !debug;
    
    // apply to bodies
    ball.body.debug = debug;
    paddle1.body.debug = debug;
    paddle2.body.debug = debug;
    field.body.debug = debug;
    
    // apply to debug canvas
    game.debug.reset();
}

function update() {
    // paddle1
    paddle1.body.setZeroVelocity();
    if (Wkey.isDown) {
        paddle1.body.moveForward(paddleSpeed);
    } else if (Skey.isDown) {
        paddle1.body.moveBackward(paddleSpeed);
    }
    
    // paddle2
    paddle2.body.setZeroVelocity();
    if (UpKey.isDown) {
        paddle2.body.moveForward(paddleSpeed);
    } else if (DownKey.isDown) {
        paddle2.body.moveBackward(paddleSpeed);
    }
}

function render() {
    if (debug) {
        var ballSpeed = Math.sqrt(Math.pow(ball.body.velocity.x, 2) + Math.pow(ball.body.velocity.y, 2));
        
        game.debug.start(20, 20, 'white');
        game.debug.line("Ball speed: " + ballSpeed);
        game.debug.line("Ball angular speed: " + ball.body.angularVelocity);
        game.debug.stop();
    }
}