var loadState= {

    preload: function() {
        
        //g9 b6Gp o0Oca zsZS tjTJ iIl1|[!:;
        
        // Add a loading label on the screen
        var loadingLabel = game.add.text(80, 150, 'loading...', 
                                         {font: '30px Arial', fill: '#ffffff'});
        
        // Add the progress bar
        var progressBar = game.add.sprite(80, 200, 'progressBar');      
        
        // Load all assets
        game.load.image('player', 'assets/player.png');	
        game.load.image('person', 'assets/person.png');
        game.load.image('tile', 'assets/tile.png');
        game.load.image('pixel', 'assets/pixel.png');
        game.load.image('menu', 'assets/menu.png');
        game.load.image('play25', 'assets/played25.png');
        game.load.image('play50', 'assets/played50.png');
        game.load.image('score25', 'assets/saved25.png');
        game.load.image('score50', 'assets/saved50.png');
    },
    
    create: function() {
        // Go to the menu state
        game.state.start('menu');
    },    
};


