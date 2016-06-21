var gameProtoype = {
    paddleSpeed: 200,
    debug: false,
    map: null,
    ball: null,
    player1: null,
    player2: null,
    fx: null,
    music: null;
    
    preload: function () {
        this.game.load.image('ball', this.configuration.assets.ball);
        this.game.load.image('paddle', this.configuration.assets.paddle);
        this.game.load.image("map_sprite", this.configuration.assets.map_sprite);
        this.game.load.physics("map_physics", this.configuration.assets.map_physics);
        this.game.load.image('menuButton','assets/menuButton.png');
        this.game.load.audio('track1', 'soundAssets/TrackZweihaenderInferno.mp3');
        this.game.load.audio('ballHitWorld', 'soundAssets/ballHitWorld2.ogg');
    },

    create: function () {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        
        //  turn on impact events for the world, without this we get no collision callbacks
        this.game.physics.p2.setImpactEvents(true);
        
        // needed for ball mechanics
        this.game.physics.p2.restitution = 1;
        this.game.physics.p2.applyDamping = false;
        var ballMaterial = this.game.physics.p2.createMaterial();
        this.game.physics.p2.createContactMaterial(ballMaterial, ballMaterial, {friction: 0, restitution: 1});

        this.map = this.createMap();
        this.ball = this.createBall(this.configuration.ball);
        this.player1 = this.createPlayer(this.configuration.player1, "goal1");
        this.player2 = this.createPlayer(this.configuration.player2, "goal2");
        
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
        
        this.menuButton = this.game.add.button(60, 30, 'menuButton', this.actionOnClickMenuButton, this, 0.5, 1, 1);
        
        this.music = this.game.add.audio('track1');
        this.music.play('track1');
        
        this.fx = this.game.add.audio('ballHitWorld');
    },
    
    hitMap: function() {
        this.fx.play();
    },
    
    hitPaddle1: function() {
        
    },
    
    hitPaddle2: function() {
        
    },
    
    hitGoal1: function() {
        
    },
    
    hitGoal2: function() {
        
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
        sprite.body.rotation = configuration.rotation / 180 * Math.PI;
        sprite.body.moveForward(configuration.speed);
        sprite.body.setCircle(sprite.width / 2);
        
        var collisionGroup = this.game.physics.p2.createCollisionGroup();
        sprite.body.setCollisionGroup(collisionGroup);
        
        return {
            sprite: sprite,
            collisionGroup: collisionGroup
        };
    },
    
    createPlayer: function (configuration, goalKey) {
        var player = {
            paddle: this.createPaddle(
                configuration.x, 
                configuration.y, 
                configuration.rotation),
            goal: this.createGoal(goalKey),
            controls: {
                forwardKey: this.game.input.keyboard.addKey(configuration.up),
                backwardKey: this.game.input.keyboard.addKey(configuration.down)
            },
            score: 0
        };
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
        var sprite = this.game.add.sprite();
        this.game.physics.p2.enable(sprite);
        sprite.body.clearShapes();
        sprite.body.loadPolygon("map_physics", key);
        sprite.body.static = true;
        
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
    },
        
    updatePlayer: function (player) {
        player.paddle.sprite.body.setZeroVelocity();
        
        if (player.controls.forwardKey.isDown) {
            player.paddle.sprite.body.moveForward(this.paddleSpeed);
        }
        if (player.controls.backwardKey.isDown) {
            player.paddle.sprite.body.moveBackward(this.paddleSpeed);
        }
    },

    render: function () {
        if (this.debug) {
            var ballSpeed = Math.sqrt(
                Math.pow(this.ball.sprite.body.velocity.x, 2) + 
                Math.pow(this.ball.sprite.body.velocity.y, 2));

            this.game.debug.start(20, 20, 'white');
            this.game.debug.line("Ball speed: " + ballSpeed);
            this.game.debug.line("Ball angular speed: " + this.ball.sprite.body.angularVelocity);
            this.game.debug.line("Mouse position x: " + this.game.input.mousePointer.x);
            this.game.debug.line("Mouse position y: " + this.game.input.mousePointer.y);
            this.game.debug.stop();
        }
    },
    
    actionOnClickMenuButton: function () {
        this.game.state.start("menu");
    },
    
    onDebugKeyDown: function () { 
        // toggle
        this.debug = !this.debug;

        // apply to bodies
        this.ball.sprite.body.debug = this.debug;
        this.player1.paddle.sprite.body.debug = this.debug;
        this.player2.paddle.sprite.body.debug = this.debug;
        this.map.sprite.body.debug = this.debug;

        // apply to debug canvas
        this.game.debug.reset();
    }
}
