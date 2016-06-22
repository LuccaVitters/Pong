function map04(game) {    
    this.configuration = {
        ball: {
            x: 380, 
            y: 150, 
            rotation: 45, 
            speed: 500
        },
        player1: {
            x: 530, 
            y: 520, 
            rotation: 38.5, 
            speed: 400, 
            up: Phaser.KeyCode.W,
            down: Phaser.KeyCode.S
        },
        player2: {
            x: 750, 
            y: 520, 
            rotation: -38.5, 
            speed: 400, 
            up: Phaser.KeyCode.UP,
            down: Phaser.KeyCode.DOWN
        },
        assets: {
            sprite_ball: 'assets/ball.png',
            sprite_paddle: 'assets/paddle.png',
            sprite_map: "assets/map04.png",
            physics_map: "assets/map04.json"
        }
    }
}

map04.prototype = gameProtoype;
