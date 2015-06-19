function gofull() {
	game.scale.startFullScreen();
}

function create() {

	music = game.add.audio('music', 1, true); // key, volume, loop
	music.play('', 0, 1, true);
	hit = game.add.audio('hit');

	setupEffects();
	setupGameOver();
	setupPauseMenu();
	setupHUD();
	setupPlayer();
	setupEnemies();
	setupControls();

	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.stage.backgroundColor = '#000';
	game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL; // Maintain aspect ratio
	game.input.onDown.add(gofull, this);
}
