var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    
    game.load.image('ball', 'assets/ball.png');
    game.load.image('paddleLeft', 'assets/paddle.png');
    game.load.image('paddleRight', 'assets/paddle.png');
}


var ball;
var paddleLeft;
var paddleRight;
var cursors;

function create() {
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    
    
    ball = game.add.sprite(380, 280, 'ball');
    
    
    paddleLeft = game.add.sprite(20, 300, 'paddleLeft');
    
    
    paddleRight = game.add.sprite(750, 300, 'paddleRight');
    
    
    game.physics.arcade.enable(ball);
    ball.body.collideWorldBounds = true;
    ball.body.velocity.setTo(200,200);
    ball.body.bounce.set(1);
    
    game.physics.arcade.enable(paddleLeft);
    paddleLeft.body.collideWorldBounds = true;
    
    game.physics.arcade.enable(paddleRight);
    paddleRight.body.collideWorldBounds = true;
    
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    
    game.physics.arcade.collide(ball, paddleLeft, collisionHandler, null, this);
    game.physics.arcade.collide(ball, paddleRight, collisionHandler2, null, this);
    
    if (cursors.left.isDown)
        {
            paddleLeft.body.velocity.x = -200;
        }
        else if (cursors.right.isDown)
        {
            paddleLeft.body.velocity.x = 200;
        }
    
}

function collisionHandler (ball, paddleLeft) {
    
}

function collisionHandler2 (ball, paddleRight) {
    
}