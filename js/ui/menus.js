function setupGameOver() {

	gameOver = game.add.bitmapText(game.world.centerX, game.world.centerY, 'font', 'GAME OVER!', 80);
	gameOver.anchor.setTo(0.5, 0.5);
	gameOver.visible = false;
}
