var game = new Phaser.Game(600, 320, Phaser.AUTO, 'gameDiv');

// Define global variables:
game.global = {
    score: 0,
    played: 0
};
game.achievements = {
    score25: 25,
    score50: 50,
    score75: 75,
    score100: 100,
    played10: 10,
    played25: 25,
    played50: 50
};

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);

game.state.start('boot');