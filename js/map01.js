function map01(game) {    
    this.configuration = {
        ball: {
            x: 380, 
            y: 150, 
            rotation: 45, 
            speed: 200
        },
        player1: {
            x: 230, 
            y: 500, 
            rotation: -45,
            up: Phaser.KeyCode.W,
            down: Phaser.KeyCode.S
        },
        player2: {
            x: 1050, 
            y: 500, 
            rotation: 45,
            up: Phaser.KeyCode.UP,
            down: Phaser.KeyCode.DOWN
        },
        assets: {
            ball: 'assets/ball.png',
            paddle: 'assets/paddle.png',
            map_sprite: "assets/map01.png",
            map_physics: "assets/map01.json"
        }
    }
}

map01.prototype = gameProtoype;