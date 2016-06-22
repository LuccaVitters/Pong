function map01(game) {    
    this.configuration = {
        ball: {
            x: 633, 
            y: 190, 
            rotation: 45, 
            speed: 600
        },
        player1: {
            x: 230, 
            y: 500, 
            rotation: -45,
            speed: 400, 
            up: Phaser.KeyCode.W,
            down: Phaser.KeyCode.S
        },
        player2: {
            x: 1050, 
            y: 500, 
            rotation: 45, 
            speed: 400, 
            up: Phaser.KeyCode.UP,
            down: Phaser.KeyCode.DOWN
        },
        assets: {
            sprite_ball: 'assets/ball.png',
            sprite_paddle: 'assets/paddle.png',
            sprite_map: "assets/map01.png",
            physics_map: "assets/map01.json"
        }
    }
}

map01.prototype = gameProtoype;
