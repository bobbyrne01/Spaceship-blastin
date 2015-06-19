function create() {

	setupAudio();
	setupEffects();
	setupGameOver();
	setupPauseMenu();
	setupHUD();
	setupPlayer();
	setupEnemies();
	setupControls();

	game.stage.backgroundColor = '#000';
	game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL; // Maintain aspect ratio
	game.physics.startSystem(Phaser.Physics.ARCADE);
}
