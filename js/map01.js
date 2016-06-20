var map01 = function(game){
    var paddleSpeed;
    
    var map;
    var ball;
    var player1, player2;
    
    var debugKey;
    var debug;
}

map01.prototype = {
    preload: function () {
        this.game.load.image('ball', 'assets/ball.png');
        this.game.load.image('paddle', 'assets/paddle.png');
        this.game.load.image("map01", "assets/map01.png");
        this.game.load.physics("map01_physics", "assets/map01.json");
    },

    create: function () {
        debug = false;
        paddleSpeed = 200;
        
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.restitution = 1;
        this.game.physics.p2.applyDamping = false;

        var ballMaterial = this.game.physics.p2.createMaterial();
        this.game.physics.p2.createContactMaterial(ballMaterial, ballMaterial, {friction: 0, restitution: 1});

        map = this.createMap();
        ball = this.createBall(380, 150, 200, 45);
        player1 = this.createPlayer(230, 500, -45, Phaser.KeyCode.W, Phaser.KeyCode.S);
        player2 = this.createPlayer(1050, 500, 45, Phaser.KeyCode.UP, Phaser.KeyCode.DOWN);
        
        debugKey = this.game.input.keyboard.addKey(Phaser.KeyCode.TAB);
        debugKey.onDown.add(this.onDebugKeyDown, this);
    },
    
    createMap: function () {
        var map = this.game.add.sprite(1280/2, 720/2, 'map01');
        this.game.physics.p2.enable(map, this.debug);
        map.body.clearShapes();
        map.body.loadPolygon("map01_physics", "map01");
        map.body.static = true;
        return map;
    },
    
    createPlayer: function (paddleX, paddleY, paddleRotation, forwardKey, backwardKey) {
        return {
            paddle: this.createPaddle(paddleX, paddleY, paddleRotation),
            goal: this.createGoal(),
            controls: {
                forwardKey: this.game.input.keyboard.addKey(forwardKey),
                backwardKey: this.game.input.keyboard.addKey(backwardKey)
            }
        };
    },
    
    createPaddle: function (x, y, rotation) {
        var paddle = this.game.add.sprite(x, y, 'paddle');
        this.game.physics.p2.enable(paddle, this.debug);
        paddle.body.kinematic = true;
        paddle.body.rotation = rotation / 180 * Math.PI;
        return paddle;
    },
    
    createBall: function (x, y, speed, rotation) {
        var ball = this.game.add.sprite(x, y, 'ball');
        this.game.physics.p2.enable(ball, this.debug);
        ball.body.rotation = rotation / 180 * Math.PI;
        ball.body.moveForward(speed);
        ball.body.setCircle(ball.width / 2);
        return ball;
    },
    
    onDebugKeyDown: function () { 
        // toggle
        debug = !debug;

        // apply to bodies
        ball.body.debug = debug;
        player1.paddle.body.debug = debug;
        player2.paddle.body.debug = debug;
        map.body.debug = debug;

        // apply to debug canvas
        this.game.debug.reset();
    },

    update: function () {
        this.updatePlayer(player1);
        this.updatePlayer(player2);
    },
        
    updatePlayer: function (player) {
        player.paddle.body.setZeroVelocity();
        
        if (player.controls.forwardKey.isDown) {
            player.paddle.body.moveForward(paddleSpeed);
        }
        if (player.controls.backwardKey.isDown) {
            player.paddle.body.moveBackward(paddleSpeed);
        }
    },

    render: function () {
        if (this.debug) {
            var ballSpeed = Math.sqrt(Math.pow(ball.body.velocity.x, 2) + Math.pow(ball.body.velocity.y, 2));

            this.game.debug.start(20, 20, 'white');
            this.game.debug.line("Ball speed: " + ballSpeed);
            this.game.debug.line("Ball angular speed: " + ball.body.angularVelocity);
            this.game.debug.stop();
        }
    }
}
