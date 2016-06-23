function map02(game) {    
    this.configuration = {
        ball: {
            x: 633, 
            y: 166, 
            speed: 600
        },
        player1: {
            x: 405, 
            y: 615, 
            rotation: 90, 
            speed: 400, 
            radius: 160, 
            up: Phaser.KeyCode.D,
            down: Phaser.KeyCode.A
        },
        player2: {
            x: 875, 
            y: 615, 
            rotation: 90, 
            speed: 400, 
            radius: 155, 
            up: Phaser.KeyCode.RIGHT,
            down: Phaser.KeyCode.LEFT
        },
        assets: {
            sprite_ball: 'assets/ball.png',
            sprite_paddle: 'assets/paddle.png',
            sprite_map: "assets/map02.png",
            physics_map: "assets/map02.json",
            track: 'soundAssets/map02Track.mp3'

        }
    }
}

map02.prototype = gameProtoype;
