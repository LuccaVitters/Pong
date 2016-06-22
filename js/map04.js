function map04(game) {    
    this.configuration = {
        ball: {
            x: 634, 
            y: 337, 
            rotation: 45, 
            speed: 1000
        },
        player1: {
            x: 295, 
            y: 130, 
            rotation: 0, 
            speed: 400, 
            up: Phaser.KeyCode.W,
            down: Phaser.KeyCode.S
        },
        player2: {
            x: 975, 
            y: 560, 
            rotation: 0, 
            speed: 400, 
            up: Phaser.KeyCode.UP,
            down: Phaser.KeyCode.DOWN
        },
        assets: {
            sprite_ball: 'assets/ball.png',
            sprite_paddle: 'assets/paddle.png',
            sprite_map: "assets/map04.png",
            physics_map: "assets/map04.json",
            track: "soundAssets/CarpenterBrutRunSallyRun.mp3"
        }
    }
}

map04.prototype = gameProtoype;
