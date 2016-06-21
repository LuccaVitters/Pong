function map03(game) {    
    this.configuration = {
        ball: {
            x: 380, 
            y: 150, 
            rotation: 45, 
            speed: 200
        },
        player1: {
            x: 530, 
            y: 520, 
            rotation: 38.5,
            up: Phaser.KeyCode.W,
            down: Phaser.KeyCode.S
        },
        player2: {
            x: 750, 
            y: 520, 
            rotation: -38.5,
            up: Phaser.KeyCode.UP,
            down: Phaser.KeyCode.DOWN
        },
        assets: {
            ball: 'assets/ball.png',
            paddle: 'assets/paddle.png',
            map_sprite: "assets/map03.png",
            map_physics: "assets/map03.json"
        }
    }
}

map03.prototype = gameProtoype;
