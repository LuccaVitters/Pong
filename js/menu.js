var menu = function(game){
    
    var map01Button;
    var map02Button;
    var map03Button;
    var map04Button;
    var menuTrack;
    var startGame;
    
};


menu.prototype = {
    
    preload: function() {
    
    this.game.load.audio('menuTrack', 'soundAssets/ZweihaenderVideoGames.mp3');
    this.game.load.image('map01Button','assets/map01Button.png');
    this.game.load.image('map02Button','assets/map02Button.png');
    this.game.load.image('map03Button','assets/map03Button.png');
    this.game.load.image('map04Button','assets/bonusButton.png');
    this.game.load.audio('startGame', 'soundAssets/startGame.mp3');
    },

   create: function () {

        map01Button = this.game.add.button(150, 300, 'map01Button', this.actionOnClickMap01, this, 1, 0, 1);
        map02Button = this.game.add.button(400, 300, 'map02Button', this.actionOnClickMap02, this, 1, 0, 1);
        map03Button = this.game.add.button(650, 300, 'map03Button', this.actionOnClickMap03, this, 1, 0, 1);
        map04Button = this.game.add.button(900, 300, 'map04Button', this.actionOnClickMap04, this, 1, 0, 1);
        
        this.startGame = this.game.add.audio('startGame');
        this.menuTrack = this.game.sound.play('menuTrack');
        this.menuTrack.loop = true;


    },

    actionOnClickMap01: function () {
        
        this.startGame.play();
        this.menuTrack.stop();
        this.game.state.start('map01',false,false);
        

    },

    actionOnClickMap02:  function () {
        
        this.startGame.play();
        this.menuTrack.stop();
        this.game.state.start('map02',false,false);
        
        
    },
    
    actionOnClickMap03: function () {
        
        this.startGame.play();
        this.menuTrack.stop();
        this.game.state.start('map03',false,false);
        
    },
    
    actionOnClickMap04: function () {
        
        this.startGame.play();
        this.menuTrack.stop();
        this.game.state.start('map04',false,false);
        
    }
}

