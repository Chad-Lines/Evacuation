var playState = {
    
    create: function() {
        
        game.time.advancedTiming = true;
        
        // Configuring the stage and variables
        game.stage.backgroundColor = '#054fb5';        
        game.global.score = 0;        
        this.varObstacles = 0;
        this.loopStop = 0;
        this.velocity = -250;              
        
        // Calling Functions
        this.createObstacles();
        this.createPeople();
        this.timers(750);
        
        // Used for particle physics (when the plane explodes)
        this.emitter = game.add.emitter(0, 0, 15);
        this.emitter.makeParticles('pixel');
        this.emitter.setYSpeed(-100, 100);
        this.emitter.setXSpeed(0, 100);
        this.emitter.gravity = 0;
        
        // Adding the player
        this.player = game.add.sprite(284, 64, 'player');
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        game.camera.follow(this.player);
        this.player.body.collideWorldBounds = true;
        
        // Adding the Score Text
        this.scoreText = game.add.text(32, 32, "People Saved: ", {font:"20px Arial", fill:"#ffffff"});
        this.scoreText.fixedToCamera = true;
        this.scoreText.cameraOffset.setTo(16, 2);
        
        // enabling keyboard input
        keyboard = game.input.keyboard;        
    },
    update: function() {
    
        game.physics.arcade.collide(this.player, this.obstaclesGroup, this.death, null, this);
        game.physics.arcade.overlap(this.player, this.peopleGroup, this.collectPeople, null, this);
                
        //this.delay();      
        
        // Enabling movement long the y axis
        if (keyboard.isDown(Phaser.Keyboard.W) || keyboard.isDown(Phaser.Keyboard.UP)) {
            this.player.body.velocity.y = -200;
        } else if (keyboard.isDown(Phaser.Keyboard.S) || keyboard.isDown(Phaser.Keyboard.DOWN)) {
            this.player.body.velocity.y = 200;
        } else {
            this.player.body.velocity.y = 0;
        }
        
        if (keyboard.isDown(Phaser.Keyboard.A) || keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.player.body.velocity.x = -200;
        } else if (keyboard.isDown(Phaser.Keyboard.D) || keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.player.body.velocity.x = 200;    
        } else {
            this.player.body.velocity.x = 0;    
        }
    },    
    getRandom: function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;    
    },    
    createObstacles: function () {
        this.obstaclesGroup = game.add.group();
        this.obstaclesGroup.enableBody = true;
        this.obstaclesGroup.createMultiple(100, 'tile');
    },    
    createPeople: function() {
        this.peopleGroup = game.add.group();
        this.peopleGroup.enableBody = true;
        this.peopleGroup.createMultiple(20, 'person');        
    },    
    addOneObstacle: function(x, y) {
        this.obs = this.obstaclesGroup.getFirstDead();
        this.obs.reset(x, y);
        this.obs.body.velocity.x = this.velocity;
        this.obs.checkWorldBounds = true;
        this.obs.outOfBoundsKill = true;
    },    
    addOnePerson: function(x, y) {
        this.person = this.peopleGroup.getFirstDead();
        this.person.reset(x, y);
        this.person.body.velocity.x = this.velocity;
        this.person.checkWorldBounds = true;
        this.person.outOfBoundsKill = true;
    },    
    addManyObstacles: function() {
        for (var i = 0; i < 1; i++) {
            x = game.world.width;
            y = this.getRandom(0, 10) * 32;
            this.addOneObstacle(x, y);    
        }
    },    
    addManyPeople: function() {
        for (var i = 0; i < 1; i++) {
            x = game.world.width;
            y = this.getRandom(0, 10) * 32;
            this.addOnePerson(x, y);    
        }
    },    
    collectPeople: function(player, person) {
        
        person.kill();
        
        // Update the score variable
        game.global.score ++;
        this.scoreText.text = "people saved: " + game.global.score;
        
        // Check if achievement
        if (game.global.score == 25) {
            var score25Image = game.add.sprite(470, 8, 'score25');    
        }
        if (game.global.score == 50) {
            var score50Image = game.add.sprite(535, 8, 'score50');
        }
        
        var score = game.global.score;
        var rate = this.obsTimer.delay;
        this.obsTimer.delay = rate - (rate * ((score - 1) / 650)); 
        this.velocity = this.velocity - 5;

    },    
    timers: function(n) {
        this.obsTimer = game.time.events.loop(n, this.addManyObstacles, this);
        this.peopleTimer = game.time.events.loop(400, this.addManyPeople, this);
    },   
    death: function(player, obstacle) {
        
        // make the player disappear:
        this.player.kill();
        obstacle.kill();
        
        // Play sound and start the particles: 
        this.emitter.x = this.player.x;
        this.emitter.y = this.player.y;        
        // explode 15 particles that will live for 1000ms
        this.emitter.start(true, 1000, null, 25);
        
        // call the 'startMenu' function in 1000ms
        game.time.events.add(1000, this.startMenu, this);
    },    
    startMenu: function() {
        game.global.played ++;
        
        if (game.global.played == 10) {
            game.achievements.played10 = true  
        } else if (game.global.played == 25) {
            game.achievements.played25 = true    
        } else if (game.global.played == 50) {
            game.achievements.played50 = true;    
        }
        if (game.global.score == 25) {
            game.achievements.score25 = true;
        } else if (game.global.score == 50) {
            game.achievements.score50 == true;
        } /*else if (game.global.score == 75) {
            game.achievements.score75 == true;
        } else if (game.global.score == 100) {
            game.achievements.score100 == true;
        } */
        
        game.state.start('menu');
    },
};
