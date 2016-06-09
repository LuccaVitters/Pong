var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    
    game.load.image('ball', 'assets/ball.png');
    game.load.image('paddleLeft', 'assets/paddle.png');
    game.load.image('paddleRight', 'assets/paddle.png');
}

var ball;
var paddleLeft;
var paddleRight;
var cursors;
var Wkey;
var Akey;
var ballMaterial;

function create() {
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.restitution = 1;
    game.physics.p2.applyDamping = false;
    
    ballMaterial = game.physics.p2.createMaterial();
    game.physics.p2.createContactMaterial(ballMaterial, ballMaterial, {friction: 0, restitution: 1});
    
    // ball
    ball = game.add.sprite(380, 280, 'ball');
    game.physics.p2.enable(ball, true);
    ball.body.collideWorldBounds = true;
    ball.body.velocity.x = 200;
    ball.body.velocity.y = 200;
    ball.body.setCircle(20);
    
    
    // paddleLeft
    paddleLeft = game.add.sprite(20, 300, 'paddleLeft');
    game.physics.p2.enable(paddleLeft, true);
    paddleLeft.body.collideWorldBounds = true;
    paddleLeft.body.fixedRotation = true;
    paddleLeft.body.static = true;
    
    // paddleRight
    paddleRight = game.add.sprite(970, 300, 'paddleRight');
    game.physics.p2.enable(paddleRight, true);
    paddleRight.body.collideWorldBounds = true;
    paddleRight.body.fixedRotation = true;
    paddleRight.body.static = true;
    
    cursors = game.input.keyboard.createCursorKeys();

    Wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    Skey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        
}

function update() {
    // left paddle movement
    paddleLeft.body.setZeroVelocity();
    if (Wkey.isDown)
    {
        paddleLeft.body.velocity.y = -200;
    }
    else if (Skey.isDown)
    {
        paddleLeft.body.velocity.y = 200;
    }
    
    // right paddle movement
    paddleRight.body.setZeroVelocity();
    if (cursors.up.isDown)
    {
        paddleRight.body.velocity.y = -200;
    }
    else if (cursors.down.isDown)
    {
        paddleRight.body.velocity.y = 200;
    }
}