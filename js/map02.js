function map02(game) {    
    this.configuration = {
        ball: {
            x: 380, 
            y: 150, 
            rotation: 45, 
            speed: 200
        },
        player1: {
            x: 380, 
            y: 625, 
            rotation: 90,
            up: Phaser.KeyCode.D,
            down: Phaser.KeyCode.A
        },
        player2: {
            x: 900, 
            y: 625, 
            rotation: 90,
            up: Phaser.KeyCode.RIGHT,
            down: Phaser.KeyCode.LEFT
        },
        assets: {
            ball: 'assets/ball.png',
            paddle: 'assets/paddle.png',
            map_sprite: "assets/map02.png",
            map_physics: "assets/map02.json"
        }
    }
}

map02.prototype = gameProtoype;
