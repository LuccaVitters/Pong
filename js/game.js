var canvasWidth = 1280;
var canvasHeight = 720;

var game = new Phaser.Game(canvasWidth, canvasHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    
    game.load.image('ball', 'assets/ball.png');
    game.load.image('paddle', 'assets/paddle.png');
    
    // game.load.image('texture', 'assets/texture.png');
    
    game.load.image("map01", "assets/map01.png");
    game.load.physics("map01_physics", "assets/map01.json");
}

var ball;
var paddle1;
var paddle2;
var cursors;
var Wkey;
var Akey;
var ballMaterial;
var debug = false;
var paddleSpeed = 200;
var field;

function create() {
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.restitution = 1;
    game.physics.p2.applyDamping = false;
    
    ballMaterial = game.physics.p2.createMaterial();
    game.physics.p2.createContactMaterial(ballMaterial, ballMaterial, {friction: 0, restitution: 1});
    
    
    field = game.add.sprite(canvasWidth/2, canvasHeight/2, 'map01');
    game.physics.p2.enable(field, debug);
    field.body.clearShapes();
    field.body.loadPolygon("map01_physics", "map01");
    field.body.static = true;
    
    // ball
    ball = game.add.sprite(380, 280, 'ball');
    game.physics.p2.enable(ball, debug);
    ball.body.collideWorldBounds = true;
    ball.body.velocity.x = 200;
    ball.body.velocity.y = 200;
    ball.body.setCircle(20);
    
    paddle1 = createPaddle(300, 300, -45);
    paddle2 = createPaddle(900, 300, 45);
    
    cursors = game.input.keyboard.createCursorKeys();

    Wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    Skey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        
}

function createPaddle(x, y, rotation) {
    var paddle = game.add.sprite(x, y, 'paddle');
    game.physics.p2.enable(paddle, debug);
    paddle.body.kinematic = true;
    paddle.body.rotation = rotation / 180 * Math.PI;
    return paddle;
}


function update() {
    // paddle1
    paddle1.body.setZeroVelocity();
    if (Wkey.isDown) {
        paddle1.body.moveUp(paddleSpeed);
    } else if (Skey.isDown) {
        paddle1.body.moveDown(paddleSpeed);
    }
    
    // paddle2
    paddle2.body.setZeroVelocity();
    if (cursors.up.isDown) {
        paddle2.body.moveUp(paddleSpeed);
    } else if (cursors.down.isDown) {
        paddle2.body.moveDown(paddleSpeed);
    }
}