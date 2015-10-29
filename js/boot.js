var bootState = {
    
    preload: function () {
        // Loading th image
        game.load.image('progressBar', 'assets/progressBar.png');
    },
    
    create: function () {
        // Starting the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Start the load  
        game.state.start('load');
    }   
};