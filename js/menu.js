var menu = function(game){
    
    var map01Button;
    var map02Button;
};


menu.prototype = {
    
    preload: function() {
    
    this.game.load.image('map01Button','assets/map01Button.png');
    this.game.load.image('map02Button','assets/map02Button.png');

    },

   create: function () {

        map01Button = this.game.add.button(200, 300, 'map01Button', this.actionOnClickMap01, this, 1, 0, 1);
        map02Button = this.game.add.button(400, 300, 'map02Button', this.actionOnClickMap02, this, 1, 0, 1);


    },

    actionOnClickMap01: function  () {

        this.game.state.start('map01',false,false);

    },

    actionOnClickMap02:  function  () {

        this.game.state.start('map02',false,false);

    }
}

