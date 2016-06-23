function map04(game) {    
    this.configuration = {
        ball: {
            x: 634, 
            y: 337, 
            speed: 1000
        },
        player1: {
            x: 305, 
            y: 145, 
            rotation: 0, 
            speed: 400, 
            radius: 74, 
            up: Phaser.KeyCode.W,
            down: Phaser.KeyCode.S
        },
        player2: {
            x: 965, 
            y: 567, 
            rotation: 0, 
            speed: 400, 
            radius: 74, 
            up: Phaser.KeyCode.UP,
            down: Phaser.KeyCode.DOWN
        },
        assets: {
            sprite_ball: 'assets/ball.png',
            sprite_paddle: 'assets/paddle.png',
            sprite_map: "assets/map04.png",
            physics_map: "assets/map04.json",
            track: "soundAssets/BonusTrack.mp3"
        }
    }
}

map04.prototype = gameProtoype;
