var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    
    game.load.image('ball', 'assets/ball.png');
    game.load.image('paddleLeft', 'assets/paddle.png');
    game.load.image('paddleRight', 'assets/paddle.png');
}

function create() {
    
    game.add.sprite(380, 280, 'ball');
    game.add.sprite(20, 300, 'paddleLeft');
    game.add.sprite(780, 300, 'paddleRight');
}

function update() {
}