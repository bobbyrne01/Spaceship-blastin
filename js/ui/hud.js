function setupHUD() {

	fpsText = game.add.bitmapText(625, 0, 'font', '', 32);
	scoreText = game.add.bitmapText(0, 0, 'font', '', 32);
	weaponText = game.add.bitmapText(game.world.width / 2 - 250, game.world.height / 2, 'font', '', 32);

	healthContainer = game.add.graphics(0, 0);
	healthContainer.beginFill(0x01DF01, 1.0);
	healthContainer.drawRect(600, 5, healthMeter, 10);

	health = game.add.graphics(0, 0);
	health.beginFill(0xFFFFFF, 0.3);
	health.drawRect(595, 0, 200, 20);
	
	fullScreenText = game.add.bitmapText(0, 30, 'font', '\'f\': full screen', 18);
}
