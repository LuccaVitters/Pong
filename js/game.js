var gameProtoype = {
    paddleSpeed: 200,
    debug: false,
    map: null,
    ball: null,
    player1: null,
    player2: null,
    
    preload: function () {
        this.game.load.image('ball', this.configuration.assets.ball);
        this.game.load.image('paddle', this.configuration.assets.paddle);
        this.game.load.image("map_sprite", this.configuration.assets.map_sprite);
        this.game.load.physics("map_physics", this.configuration.assets.map_physics);
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

        map = this.createMap();
        ball = this.createBall(this.configuration.ball);
        player1 = this.createPlayer(this.configuration.player1, "goal1");
        player2 = this.createPlayer(this.configuration.player2, "goal2");
        
        ball.sprite.body.collides(map.collisionGroup);
        ball.sprite.body.collides(player1.paddle.collisionGroup);
        ball.sprite.body.collides(player1.goal.collisionGroup);
        ball.sprite.body.collides(player2.paddle.collisionGroup);
        ball.sprite.body.collides(player2.goal.collisionGroup);
        map.sprite.body.collides(ball.collisionGroup);
        player1.paddle.sprite.body.collides(ball.collisionGroup);
        player1.goal.sprite.body.collides(ball.collisionGroup);
        player2.paddle.sprite.body.collides(ball.collisionGroup);
        player2.goal.sprite.body.collides(ball.collisionGroup);
        
        debugKey = this.game.input.keyboard.addKey(Phaser.KeyCode.TAB);
        debugKey.onDown.add(this.onDebugKeyDown, this);
    },
    
    createMap: function () {
        var sprite = this.game.add.sprite(1280/2, 720/2, "map_sprite");
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
        var sprite = this.game.add.sprite(configuration.x, configuration.y, "ball");
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
    
    createPlayer: function (paddleX, paddleY, paddleRotation, forwardKey, backwardKey, goalKey) {
        var player = {
            paddle: this.createPaddle(paddleX, paddleY, paddleRotation),
            goal: this.createGoal(goalKey),
            controls: {
                forwardKey: this.game.input.keyboard.addKey(forwardKey),
                backwardKey: this.game.input.keyboard.addKey(backwardKey)
            }
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
        this.updatePlayer(player1);
        this.updatePlayer(player2);
    },
        
    updatePlayer: function (player) {
        player.paddle.sprite.body.setZeroVelocity();
        
        if (player.controls.forwardKey.isDown) {
            player.paddle.sprite.body.moveForward(paddleSpeed);
        }
        if (player.controls.backwardKey.isDown) {
            player.paddle.sprite.body.moveBackward(paddleSpeed);
        }
    },

    render: function () {
        if (debug) {
            var ballSpeed = Math.sqrt(
                Math.pow(ball.sprite.body.velocity.x, 2) + 
                Math.pow(ball.sprite.body.velocity.y, 2));

            this.game.debug.start(20, 20, 'white');
            this.game.debug.line("Ball speed: " + ballSpeed);
            this.game.debug.line("Ball angular speed: " + ball.sprite.body.angularVelocity);
            this.game.debug.line("Mouse position x: " + this.game.input.mousePointer.x);
            this.game.debug.line("Mouse position y: " + this.game.input.mousePointer.y);
            this.game.debug.stop();
        }
    },
    
    onDebugKeyDown: function () { 
        // toggle
        debug = !debug;

        // apply to bodies
        ball.sprite.body.debug = debug;
        player1.paddle.sprite.body.debug = debug;
        player2.paddle.sprite.body.debug = debug;
        map.sprite.body.debug = debug;

        // apply to debug canvas
        this.game.debug.reset();
    }
}
