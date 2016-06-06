/* The game properties object that currently only contains the screen dimensions*/
var gameProperties = {
    screenWidth: 800,
    screenHeight: 600,
    ballVelocity: 400,
    ballStartDelay: 3,
    ballRandomStartingAngleLeft: [-120, 120],
    ballRandomStartingAngleRight: [-60, 60],
};

var graphicAssets = {
    ballURL: 'assets/ball.png',
    ballName: 'ball',
    
    paddleUrL: 'assets/paddle.lng',
    paddleName: 'paddle'
};
    

/* The main state that contains our game. Think of states like pages or screens such as the splash screen, main menu, game screen, high scores, inventory, etc.*/
var mainState = {
    
    this.ball;
    this.paddleLeft;
    this.paddleRight;

    /* The preload function is use to load assets into the game*/
    preload: function () {
        game.load.image(graphicAssets.ballName, graphicAsses.ballURL);
        game.load.image('paddleRight', graphicAssets.paddleURL);
        game.load.image('paddleLeft', graphicAssets.paddleURL);
    },
    
    
        /*The create function is called after all assets are loaded and ready for use. This is where we add all our sprites, sounds, levels, text, etc.*/
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#190707';
    
        this.ball = game.add.sprite(400, 400, 'ball');
        // this.ball.anchor.set(0.5, 0.5);
        game.physics.enable(ball, Phaser.Physics.ARCADE);
        this.ball.body.collideWorldBounds = true;
        this.ball.body.bounce.setTo(1, 1);
        
        this.paddleRight = game.add.sprite(780, 300, 'paddleRight');
        // this.paddleLeft.anchor.set(0.5, 0.5);
        
        this.paddleLeft = game.add.sprite(20, 300, 'paddleLeft');
        // this.paddleRight.anchor.set(0.5, 0.5);
    },

    /*The update function is run every frame. The default frame rate is 60 frames per second, so the update function is run 60 times per second*/
    update: function () {

    },
    
    initGraphics: function () {
        
    }
    
    initPhysics: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.enable(this.ball);
        
        this.ball.checkWorldBounds = true;
        this.ballSprite.body.collideWorldBounds = true;
        this.ballsprites.body.immovable = true;
        this.ballsprite.body.bounce.set(1);
    },
    
    startDemo: function () {
        this.ballSprite.visible = false;
        game.time.events.add(Phaser.Timer.SECOND * gameProperties.ballStartDelay, this.startBall, this);
    },
 
    startBall: function () {
        this.ballSprite.visible = true;
        var randomAngle = game.rnd.pick(gameProperties.ballRandomStartingAngleRight.concat(gameProperties.ballRandomStartingAngleLeft));
        game.physics.arcade.velocityFromAngle(randomAngle, gameProperties.ballVelocity, this.ballSprite.body.velocity);
    },
};

/* Initialise the Phaser framework by creating an instance of a Phaser.Game object and assigning it to a local variable called 'game'.
// The first two arguments are the width and the height of the canvas element. In this case 640 x 480 pixels. You can resize this in the gameProperties object above.
// The third argument is the renderer that will be used. Phaser.AUTO is used to automatically detect whether to use the WebGL or Canvas renderer.
// The fourth argument is 'gameDiv', which is the id of the DOM element we used above in the index.html file where the canvas element is inserted.*/
var game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight, Phaser.AUTO, 'gameDiv');

/* Here we declare and add a state to the game object.
// The first argument is the state name that will is used to switch between states
// The second argument is the object name that will used when a state name is called
*/
game.state.add('main', mainState);

/* We are using the 'main' state name as the argument to load our new state. */
game.state.start('main');