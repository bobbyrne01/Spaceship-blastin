function setupPauseMenu() {

	pause_label = game.add.text(700, 20, 'Pause', {
		font: '24px Arial',
		fill: '#fff'
	});
	pause_label.inputEnabled = true;
	pause_label.events.onInputUp.add(function () {
		game.paused = true;

		t = game.add.graphics(0, 0);
		t.beginFill(0xFFFFFF, 0.3);
		t.drawRoundedRect(800 / 3, 600 / 3, 800 / 3, 600 / 3);

		resumeText = game.add.bitmapText(800 / 3 + 40, 600 / 3 + 30, 'font', 'Resume', 32);
		controlsText = game.add.bitmapText(800 / 3 + 10, 600 / 3 + 90, 'font', 'Controls', 32);
		audioText = game.add.bitmapText(800 / 3 + 60, 600 / 3 + 150, 'font', 'Audio', 32);
	});

	game.input.onDown.add(unpause, self);

	function unpause(event) {

		if (game.paused) {
			// Calculate the corners of the menu
			var x1 = 800 / 2 - 270 / 2,
				x2 = 800 / 2 + 270 / 2,
				y1 = 600 / 2 - 180 / 2,
				y2 = 600 / 2 + 180 / 2;

			// Check if the click was inside the menu
			if (event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2) {
				// The choicemap is an array that will help us see which item was clicked
				var choisemap = ['one', 'two', 'three', 'four', 'five', 'six'];

				// Get menu local coordinates for the click
				var x = event.x - x1,
					y = event.y - y1;

				// Calculate the choice 
				var choise = Math.floor(x / 90) + 3 * Math.floor(y / 90);

				// Display the choice
				//choiseLabel.text = 'You chose menu item: ' + choisemap[choise];

			} else {
				// Remove the menu and the label
				t.destroy();
				resumeText.destroy();
				controlsText.destroy();
				audioText.destroy();

				// Unpause the game
				game.paused = false;
			}
		}
	}
}

function setupGameOver() {

	gameOver = game.add.bitmapText(game.world.centerX, game.world.centerY, 'font', 'GAME OVER!', 80);
	gameOver.anchor.setTo(0.5, 0.5);
	gameOver.visible = false;
}
