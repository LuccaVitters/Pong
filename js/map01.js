function map01(game) {    
    this.configuration = {
        ball: {
            x: 633, 
            y: 190, 
            speed: 800
        },
        player1: {
            x: 260, 
            y: 520, 
            rotation: -45,
            speed: 400, 
            radius: 150, 
            up: Phaser.KeyCode.W,
            down: Phaser.KeyCode.S
        },
        player2: {
            x: 1030, 
            y: 510, 
            rotation: 45, 
            speed: 400, 
            radius: 150,
            up: Phaser.KeyCode.UP,
            down: Phaser.KeyCode.DOWN
        },
        assets: {
            sprite_ball: 'assets/ball.png',
            sprite_paddle: 'assets/paddle.png',
            sprite_map: "assets/map01.png",
            physics_map: "assets/map01.json",
            track: "soundAssets/map01Track.mp3"
        }
    }
}

map01.prototype = gameProtoype;
