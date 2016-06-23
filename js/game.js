var gameProtoype = {
    debug: false,
    map: null,
    ball: null,
    player1: null,
    player2: null,
    ballHitWorld: null,
    ballHitPaddle: null,
    scored: null,
    mapTrack: null,
    scoreTextSize: 64,
    scoreMax: 7,
    onscreenText1: null,
    onscreenText2: null,
    gameOver: false,
    
    preload: function () {
        //audio
        this.game.load.audio('ballHitWorld', 'soundAssets/ballHitWorld.ogg');
        this.game.load.audio('ballHitPaddle', 'soundAssets/ballHitPaddle.ogg');
        this.game.load.audio('scored', 'soundAssets/scored.ogg');
        this.game.load.audio('mapTrack', this.configuration.assets.track); 
        
        //physics
        this.game.load.physics("map_physics", this.configuration.assets.physics_map);
        
        //images
        this.game.load.image('ball', this.configuration.assets.sprite_ball);
        this.game.load.image('paddle', this.configuration.assets.sprite_paddle);
        this.game.load.image("map_sprite", this.configuration.assets.sprite_map);
        this.game.load.image('menuButton','assets/menuButton.png');
        this.game.load.image('gameOver','assets/gameOver.png');
        
        
        // fonts
        this.game.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
        this.game.load.bitmapFont('carrier_command_black', 'assets/fonts/carrier_command_black.png', 'assets/fonts/carrier_command_black.xml');
    },

    create: function () {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        
        this.game.sound.setDecodedCallback('mapTrack', this.soundIsDecoded, this);
        
        // turn on impact events for the world to get collision callbacks
        this.game.physics.p2.setImpactEvents(true);
        
        
        // needed for ball mechanics
        this.game.physics.p2.restitution = 1;
        this.game.physics.p2.applyDamping = false;
        var ballMaterial = this.game.physics.p2.createMaterial();
        this.game.physics.p2.createContactMaterial(ballMaterial, ballMaterial, {friction: 0, restitution: 1});
        
        this.map = this.createMap();
        this.ball = this.createBall(this.configuration.ball);
        this.player1 = this.createPlayer(this.configuration.player1, "goal1", 100, 200);
        this.player2 = this.createPlayer(this.configuration.player2, "goal2", this.game.width - 100, 200);
        
        this.ball.sprite.body.collides(this.map.collisionGroup, this.hitMap, this);
        this.ball.sprite.body.collides(this.player1.paddle.collisionGroup, this.hitPaddle1, this);
        this.ball.sprite.body.collides(this.player1.goal.collisionGroup, this.hitGoal1, this);
        this.ball.sprite.body.collides(this.player2.paddle.collisionGroup, this.hitPaddle2, this);
        this.ball.sprite.body.collides(this.player2.goal.collisionGroup, this.hitGoal2, this);
        this.map.sprite.body.collides(this.ball.collisionGroup);
        this.player1.paddle.sprite.body.collides(this.ball.collisionGroup);
        this.player1.goal.sprite.body.collides(this.ball.collisionGroup);
        this.player2.paddle.sprite.body.collides(this.ball.collisionGroup);
        this.player2.goal.sprite.body.collides(this.ball.collisionGroup);
        
        this.debugKey = this.game.input.keyboard.addKey(Phaser.KeyCode.TAB);
        this.debugKey.onDown.add(this.onDebugKeyDown, this);
        
        this.menuButton = this.game.add.button(1020, 30, 'menuButton', this.onMenuButtonClick, this, 0.5, 1, 1);
        
        // bitmap text 'Game over'
        this.onscreenText1 = this.game.add.bitmapText(450, 200, 'carrier_command_black','',34);
        this.onscreenText2 = this.game.add.bitmapText(340, 295, 'carrier_command_black','',34);
        
        // audio
        this.ballHitWorld = this.game.add.audio('ballHitWorld');
        this.ballHitPaddle = this.game.add.audio('ballHitPaddle');
        this.scored = this.game.add.audio('scored');
    },
    
    hitMap: function() {
        this.ballHitWorld.play();
    },
    
    hitPaddle1: function() {
        this.ballHitPaddle.play();
    },
    
    hitPaddle2: function() {
        this.ballHitPaddle.play();
    },
    
    hitGoal1: function() {
        this.hitGoal(this.player2);
    },
    
    hitGoal2: function() {
        this.hitGoal(this.player1);
    },
    
    hitGoal: function(player) {
        this.killBall();
        this.spawnBall();
        
        if (!this.gameOver) {
            this.scored.play();
            player.score.bmpText.text++;
            player.score.fixPosition();

            if (player.score.bmpText.text == this.scoreMax)  {
                var looserName;
                if (player == this.player1) {
                    looserName = "Player 2";
                }
                else if(player == this.player2) {
                    looserName = "Player 1"                    
                }
                console.log("Game Over");
                this.onscreenText1.text = "Game Over";
                this.onscreenText2.text = looserName + " sucks!";
                this.gameOver = true;
            }
        }
    },
    
    createMap: function () {
        var sprite = this.game.add.sprite(
            this.game.width / 2, 
            this.game.height / 2, 
            "map_sprite");
        this.game.physics.p2.enable(sprite);
        sprite.body.clearShapes();
        sprite.body.loadPolygon("map_physics", "map");
        sprite.body.static = true;
        
        var collisionGroup = this.game.physics.p2.createCollisionGroup();
        sprite.body.setCollisionGroup(collisionGroup);
        
        return {
            sprite: sprite,
            collisionGroup: collisionGroup
        };
    },
    
    createBall: function (configuration) {
        var sprite = this.game.add.sprite(
            configuration.x, 
            configuration.y, 
            "ball");
        
        this.game.physics.p2.enable(sprite);
        sprite.body.setCircle(sprite.width / 2);
        
        var collisionGroup = this.game.physics.p2.createCollisionGroup();
        sprite.body.setCollisionGroup(collisionGroup);
        
        sprite.visible = false;
        
        return {
            enabled: false,
            sprite: sprite,
            collisionGroup: collisionGroup
        };
    },
    
    spawnBall: function () {
        this.ball.enabled = true;
        this.ball.sprite.visible = true;
        this.ball.sprite.body.rotation = Math.random() * 2 * Math.PI;
        this.ball.sprite.body.moveForward(this.configuration.ball.speed);
        this.ball.sprite.body.x = this.configuration.ball.x;
        this.ball.sprite.body.y = this.configuration.ball.y;
    },
    
    killBall: function () {
        this.ball.enabled = false;
        this.ball.sprite.body.reset(this.configuration.ball.x, this.configuration.ball.y);
    },
    
    createPlayer: function (configuration, goalKey, scoreX, scoreY) {
        var player = {
            configuration: configuration,
            paddle: this.createPaddle(
                configuration.x, 
                configuration.y, 
                configuration.rotation),
            goal: this.createGoal(goalKey),
            controls: {
                upKey: this.game.input.keyboard.addKey(configuration.up),
                downKey: this.game.input.keyboard.addKey(configuration.down)
            },
            score: {
                bmpText: this.game.add.bitmapText(0, 0, 'carrier_command', '0', this.scoreTextSize),
                x: scoreX,
                y: scoreY,
                fixPosition: function() {
                    // re-center text (for multiple characters) 
                    this.bmpText.x = this.x - this.bmpText.width / 2;
                    this.bmpText.y = this.y - this.bmpText.height / 2;
                }
            }
        };
        player.score.fixPosition();
        return player;
    },
    
    createPaddle: function (x, y, rotation) {
        var sprite = this.game.add.sprite(x, y, "paddle");
        this.game.physics.p2.enable(sprite);
        sprite.body.kinematic = true;
        sprite.body.rotation = rotation / 180 * Math.PI;
        
        var collisionGroup = this.game.physics.p2.createCollisionGroup();
        sprite.body.setCollisionGroup(collisionGroup);
        
        return {
            sprite: sprite,
            collisionGroup: collisionGroup
        };
    },
    
    createGoal: function (key) {
        var sprite = this.game.add.sprite(
            this.game.width / 2, 
            this.game.height / 2, 
            "map_sprite");
        this.game.physics.p2.enable(sprite);
        sprite.body.clearShapes();
        sprite.body.loadPolygon("map_physics", key);
        sprite.body.static = true;
        sprite.visible = false;
        
        var collisionGroup = this.game.physics.p2.createCollisionGroup();
        sprite.body.setCollisionGroup(collisionGroup);
        
        return {
            sprite: sprite,
            collisionGroup: collisionGroup
        };
    },
    
    update: function () {
        this.updatePlayer(this.player1);
        this.updatePlayer(this.player2);
        if (this.ball.enabled) {
            this.setVelocity(this.ball.sprite, this.configuration.ball.speed);
        }
    },
        
    updatePlayer: function (player) {
        var body = player.paddle.sprite.body;
        var config = player.configuration;
        
        // paddle delta to center
        var delta = new Phaser.Point(body.x - config.x, body.y - config.y);
        var deltaMagnitude = delta.getMagnitude();
        
        // paddle direction 
        // NOTE:in Phaser...
        // the coordinate origin is the top-left-corner,
        // the x coordinate grows to the right, 
        // the y coordinate grows to the bottom, 
        // rotation is clockwise,
        // the default direction is towards the x axis, parallel to the y axis
        var direction = new Phaser.Point(Math.sin(body.rotation), -Math.cos(body.rotation));
        
        var directionIncreasesDelta = Phaser.Point.add(delta, direction).getMagnitude() > delta.getMagnitude();
        var hasReachedLimit = deltaMagnitude >= config.radius;
        
        body.setZeroVelocity();
        if (player.controls.upKey.isDown && (!hasReachedLimit || !directionIncreasesDelta)) {
            body.moveForward(config.speed);
        }
        if (player.controls.downKey.isDown && (!hasReachedLimit || directionIncreasesDelta)) {
            body.moveBackward(config.speed);
        }
    },

    getVelocity: function (sprite) {
        var vx, vy;
        
        x = sprite.body.velocity.x;
        y = sprite.body.velocity.y;
        
        return Math.sqrt(x * x + y * y);
    },
    
    setVelocity: function (sprite, velocity) {
        var x, y, angle;

        x = sprite.body.velocity.x;
        y = sprite.body.velocity.y;

        angle = Math.atan2(y, x);
            
        sprite.body.velocity.x = Math.cos(angle) * velocity;
        sprite.body.velocity.y = Math.sin(angle) * velocity;
    },
    
    render: function () {
        if (this.debug) {
            this.game.debug.start(20, 20, 'white');
            this.game.debug.line("Ball speed: " + this.getVelocity(this.ball.sprite));
            this.game.debug.line("Ball angular speed: " + this.ball.sprite.body.angularVelocity);
            this.game.debug.line("Mouse position x: " + this.game.input.mousePointer.x);
            this.game.debug.line("Mouse position y: " + this.game.input.mousePointer.y);
            this.game.debug.stop();
        }
    },
    
    onMenuButtonClick: function () {
        this.mapTrack.stop();
        this.game.state.start("menu");
    },
    
    onDebugKeyDown: function () { 
        // toggle
        this.debug = !this.debug;

        // apply to bodies
        this.ball.sprite.body.debug = this.debug;
        this.player1.paddle.sprite.body.debug = this.debug;
        this.player1.goal.sprite.body.debug = this.debug;
        this.player2.paddle.sprite.body.debug = this.debug;
        this.player2.goal.sprite.body.debug = this.debug;
        this.map.sprite.body.debug = this.debug;

        // apply to debug canvas
        this.game.debug.reset();
    },
    
    soundIsDecoded: function () {
        this.mapTrack = this.game.sound.play('mapTrack');
        this.mapTrack.loop = true;
        this.spawnBall();
    }
}
