function setupControls() {
	
	game.input.onDown.add(gofull, this);

	fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	leftButton = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	rightButton = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	upButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	downButton = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	changeKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
}

function gofull() {
	game.scale.startFullScreen();
}