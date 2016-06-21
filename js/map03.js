var map03 = function(game){
    
    var paddleSpeed;
    
    var map;
    var ball;
    var player1, player2;
    
    var debugKey;
    var debug;
}

map03.prototype = {
    preload: function () {
        this.game.load.image('ball', 'assets/ball.png');
        this.game.load.image('paddle', 'assets/paddle.png');
        this.game.load.image("map_sprite", "assets/map03.png");
        this.game.load.physics("map_physics", "assets/map03.json");
    },

    create: function () {
        paddleSpeed = 200;
        debug = false;
        
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        
        //  turn on impact events for the world, without this we get no collision callbacks
        this.game.physics.p2.setImpactEvents(true);
        
        // needed for ball mechanics
        this.game.physics.p2.restitution = 1;
        this.game.physics.p2.applyDamping = false;
        var ballMaterial = this.game.physics.p2.createMaterial();
        this.game.physics.p2.createContactMaterial(ballMaterial, ballMaterial, {friction: 0, restitution: 1});

        map = this.createMap();
        ball = this.createBall(380, 150, 200, 45);
        player1 = this.createPlayer(230, 500, -45, Phaser.KeyCode.W, Phaser.KeyCode.S, "goal1");
        player2 = this.createPlayer(1050, 500, 45, Phaser.KeyCode.UP, Phaser.KeyCode.DOWN, "goal2");
        
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
    
    createBall: function (x, y, speed, rotation) {
        var sprite = this.game.add.sprite(x, y, "ball");
        this.game.physics.p2.enable(sprite);
        sprite.body.rotation = rotation / 180 * Math.PI;
        sprite.body.moveForward(speed);
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
