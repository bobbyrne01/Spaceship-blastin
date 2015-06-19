function preload() {

	game.time.advancedTiming = true;
	game.time.desiredFps = 60;

	game.load.audio('music', 'assets/audio/POL-dual-dragon-short.wav');
	game.load.audio('hit', 'assets/audio/Blast-SoundBible.com-2068539061.mp3');

	game.load.image('player', 'assets/sprites/ships/F5S4.png');
	game.load.image('alien', 'assets/sprites/ships/alien4.png');
	game.load.image('trail', 'assets/sprites/other/trail.png');
	game.load.image('redEnemy', 'assets/sprites/ships/spshipsprite.png');

	game.load.spritesheet('kaboom', 'assets/sprites/other/explosion.png', 128, 128);
	game.load.spritesheet('rain', 'assets/sprites/other/rain.png', 17, 17);
	game.load.bitmapFont('font', 'assets/fonts/Xenotron.png', 'assets/fonts/Xenotron.fnt');

	for (var i = 1; i <= 10; i++) {
		game.load.image('bullet' + i, 'assets/sprites/bullets/bullet' + i + '.png');
	}
}
