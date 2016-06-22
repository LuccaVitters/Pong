function map03(game) {    
    this.configuration = {
        ball: {
            x: 635, 
            y: 225, 
            rotation: 45, 
            speed: 600
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
            sprite_map: "assets/map03.png",
            physics_map: "assets/map03.json",
            track: "soundAssets/CarpenterBrutTurboKiller.mp3"
        }
    }
}

map03.prototype = gameProtoype;
