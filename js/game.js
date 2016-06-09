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

function create() {
    game.physics.startSystem(Phaser.Physics.P2JS);
    
    // ball
    ball = game.add.sprite(380, 280, 'ball');
    game.physics.p2.enable(ball);
    ball.body.collideWorldBounds = true;
    ball.body.velocity.x = 200;
    ball.body.velocity.y = 200;
    
    // paddleLeft
    paddleLeft = game.add.sprite(20, 300, 'paddleLeft');
    game.physics.p2.enable(paddleLeft);
    paddleLeft.body.collideWorldBounds = true;
    paddleLeft.body.fixedRotation = true;
    
    // paddleRight
    paddleRight = game.add.sprite(960, 300, 'paddleRight');
    game.physics.p2.enable(paddleRight);
    paddleRight.body.collideWorldBounds = true;
    paddleRight.body.fixedRotation = true;
    
    cursors = game.input.keyboard.createCursorKeys();

    Wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    Skey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        
}

function update() {
    
    game.physics.arcade.collide(ball, paddleLeft, collisionHandlerPaddleLeft, null, this);
    game.physics.arcade.collide(ball, paddleRight, collisionHandlerPaddleRight, null, this);
    
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

function collisionHandlerPaddleLeft (ball, paddleLeft) {
    
    ball.body.velocity.y = -ball.body.velocity.y;
    ball.body.velocity.x = -ball.body.velocity.x
}

function collisionHandlerPaddleRight (ball, paddleRight) {
    
    ball.body.velocity.y = -ball.body.velocity.y;
    ball.body.velocity.x = -ball.body.velocity.x
}