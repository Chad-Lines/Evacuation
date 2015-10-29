var menuState = {
  
    create: function () {
        
        var menuimg = game.add.sprite(0, 0, 'menu');        
        
        // Using the Local Storage to store variables
        if (!localStorage.getItem('topScore')) {
            localStorage.setItem('topScore', 0);    
        }        
        if (game.global.score > localStorage.getItem('topScore')) {
            localStorage.setItem('topScore', game.global.score);    
        }
        if (!localStorage.getItem('played')) {
            localStorage.setItem('played', 0);    
        }
        if (game.global.played > localStorage.getItem('played')) {
            localStorage.setItem('played', game.global.played);    
        }
        
        // Setting the text values
        var text = 'your score: ' + game.global.score + '\ntop score: ' + localStorage.getItem('topScore');
        var scoreLabel = game.add.text(32, 175, text, {font: '20px Tahoma', fill: '#ffffff' });
        var startLabel = game.add.text(32, game.world.height-70, 'Press the SPACEBAR to start', {font: '25px Tahoma', fill: '#ffffff' });
        var instrLabel = game.add.text(32, game.world.height-32, 'Use arrow keys or w,a,s,d to move', 
                                       {font: '12px Tahoma', fill: '#ffffff' });
        
        // Setting text values for Achievements
        
        // Displaying the grtaphics for the Achievements
        if (localStorage.getItem('topScore') > game.achievements.score25) {
            var score25Image = game.add.sprite(450, 164, 'score25');
            var score25Text = game.add.text(score25Image.x - 19, score25Image.y + 32, 'Saved 25 people!',
                                            {font: '10px Tahoma', fill: '#ffffff' });
        } 
        if (localStorage.getItem('topScore') > game.achievements.score50) {
            var score50Image = game.add.sprite(535, 164, 'score50');
            var score50Text = game.add.text(score50Image.x - 19, score50Image.y + 32, 'Saved 50 people!',
                                            {font: '10px Tahoma', fill: '#ffffff' });
        }
        if (localStorage.getItem('played') > game.achievements.played25) {
            var played25Image = game.add.sprite(450, 228, 'play25');
            var score25Text = game.add.text(played25Image.x - 21, played25Image.y + 32, 'Played 25 Times!',
                                            {font: '10px Tahoma', fill: '#ffffff' });
        }
        if (localStorage.getItem('played') > game.achievements.played50) {
            var played50Image = game.add.sprite(535, 228, 'play50');
            var score50Text = game.add.text(played50Image.x - 21, played50Image.y + 32, 'Played 50 Times!',
                                            {font: '10px Tahoma', fill: '#ffffff' });
        }
        
        
        var startKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        startKey.onDown.addOnce(this.start, this);
    },
    
    start: function () {
        //this.music.stop();
        game.state.start('play');    
    },    
};