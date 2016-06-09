var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    
    game.load.image('ball', 'assets/ball.png');
    game.load.image('paddleLeft', 'assets/paddle.png');
    game.load.image('paddleRight', 'assets/paddle.png');
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

function create() {
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.restitution = 1;
    game.physics.p2.applyDamping = false;
    
    ballMaterial = game.physics.p2.createMaterial();
    game.physics.p2.createContactMaterial(ballMaterial, ballMaterial, {friction: 0, restitution: 1});
    
    createField();
    
    // ball
    ball = game.add.sprite(380, 280, 'ball');
    game.physics.p2.enable(ball, debug);
    ball.body.collideWorldBounds = true;
    ball.body.velocity.x = 200;
    ball.body.velocity.y = 200;
    ball.body.setCircle(20);
    
    
    // paddle1
    paddle1 = game.add.sprite(20, 300, 'paddleLeft');
    game.physics.p2.enable(paddle1, debug);
    paddle1.body.collideWorldBounds = true;
    paddle1.body.fixedRotation = true;
    paddle1.body.static = true;
    
    // paddle2
    paddle2 = game.add.sprite(980, 300, 'paddleRight');
    game.physics.p2.enable(paddle2, debug);
    paddle2.body.collideWorldBounds = true;
    paddle2.body.fixedRotation = true;
    paddle2.body.static = true;
    
    cursors = game.input.keyboard.createCursorKeys();

    Wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    Skey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        
}

function createField() {
    var poly = new Phaser.Polygon( 
        { x: 100, y: 100 }, 
        { x: 900, y: 100 }, 
        { x: 900, y: 500 }, 
        { x: 100, y: 500 });
    var graphics = game.add.graphics(0,0);
    graphics.beginFill(0xFF33ff);
    graphics.drawPolygon(poly.points);
    graphics.endFill();
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