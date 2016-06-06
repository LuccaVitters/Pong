var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    
    game.load.image('ball', 'assets/ball.png');
    game.load.image('paddleLeft', 'assets/paddle.png');
    game.load.image('paddleRight', 'assets/paddle.png');
}

function create() {
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    
    
    game.add.sprite(380, 280, 'ball');
    
    
    game.add.sprite(20, 300, 'paddleLeft');
    
    
    game.add.sprite(780, 300, 'paddleRight');
    
    
    game.physics.arcade.enable(ball);
    game.physics.arcade.enable(paddleLeft);
    game.physics.arcade.enable(paddleRight);
}

function update() {
    
    game.physics.arcade.collide(this.ball, this.paddleLeft);
    game.physics.arcade.collide(this.ball, this.paddleRight);
    
}