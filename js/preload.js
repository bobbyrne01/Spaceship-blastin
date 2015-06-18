function preload() {

	game.time.advancedTiming = true;
	game.time.desiredFps = 60;

	game.load.image('player', 'assets/sprites/ships/F5S4.png');
	game.load.image('alien', 'assets/sprites/ships/alien4.png');
	game.load.image('missile', 'assets/sprites/ships/aliendropping0005.png');
	game.load.image('bullet', 'assets/sprites/other/bullet.png');
	game.load.image('trail', 'assets/sprites/other/trail.png');
	game.load.image('redEnemy', 'assets/sprites/ships/spshipsprite.png');

	game.load.spritesheet('kaboom', 'assets/sprites/other/explosion.png', 128, 128);
	game.load.spritesheet('rain', 'assets/sprites/other/rain.png', 17, 17);
	game.load.bitmapFont('shortStack', 'assets/sprites/other/desyrel.png', 'assets/sprites/other/desyrel.xml');

	for (var i = 1; i <= 11; i++) {
		game.load.image('bullet' + i, 'assets/sprites/bullets/bullet' + i + '.png');
	}
}