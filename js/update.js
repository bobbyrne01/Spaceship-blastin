function toggleWeapon() {

	if (currentWeapon === 7) {
		currentWeapon = 0;
	} else {
		currentWeapon++;
	}

	weapons[currentWeapon].visible = true;
	weaponName.text = weapons[currentWeapon].name;
}

function shipCollide(player, enemy) {

	healthMeter = healthMeter - 10;
	healthContainer.clear();
	healthContainer.beginFill(0x01DF01, 1.0);
	healthContainer.drawRect(600, 5, healthMeter, 10);

	var explosion = explosions.getFirstExists(false);
	explosion.reset(enemy.body.x + enemy.body.halfWidth, enemy.body.y + enemy.body.halfHeight);
	explosion.body.velocity.y = enemy.body.velocity.y;
	explosion.alpha = 0.7;
	explosion.play('kaboom', 30, false, true);
	enemy.kill();

	if (healthMeter < 1) {
		player.alive = false;

		var explosion = explosions.getFirstExists(false);
		explosion.reset(player.body.x + player.body.halfWidth, player.body.y + player.body.halfHeight);
		explosion.body.velocity.y = player.body.velocity.y;
		explosion.alpha = 0.7;
		explosion.play('kaboom', 30, false, true);
		player.shipTrail.kill();
		player.kill();
	}
}

function bulletCollide(enemy, bullet) {
	
	hit.play();

	score = score + enemy.reward;

	var explosion = explosions.getFirstExists(false);
	explosion.reset(enemy.body.x + enemy.body.halfWidth, enemy.body.y + enemy.body.halfHeight);
	explosion.body.velocity.y = enemy.body.velocity.y;
	explosion.alpha = 0.7;
	explosion.play('kaboom', 30, false, true);
	enemy.kill();
	bullet.kill();
}

function restart() {

	//  Reset the enemies
	greenEnemies.callAll('kill');
	game.time.events.remove(greenEnemyLaunchTimer);
	game.time.events.add(1000, launchGreenEnemy);

	//  Revive the player
	player.revive();
	player.health = 100;
	//shields.render();
	//score = 0;
	//scoreText.render();

	//  Hide the text
	gameOver.visible = false;
}

function update() {

	player.bringToTop();

	game.physics.arcade.overlap(player, greenEnemies, shipCollide, null, this);
	game.physics.arcade.overlap(player, blueEnemies, shipCollide, null, this);

	for (var j = 0; j < weapons.length; j++) {

		game.physics.arcade.overlap(greenEnemies, weapons[j], bulletCollide, null, this);
		game.physics.arcade.overlap(blueEnemies, weapons[j], bulletCollide, null, this);
	}


	player.body.acceleration.x = 0;
	player.body.acceleration.y = 0;

	if (leftButton.isDown) {
		player.body.acceleration.x = -player.acceleration;
	}

	if (rightButton.isDown) {
		player.body.acceleration.x = player.acceleration;
	}

	if (upButton.isDown) {
		player.body.acceleration.y = -player.acceleration;
	}

	if (downButton.isDown) {
		player.body.acceleration.y = player.acceleration;
	}

	//  Stop at screen edges
	if (player.x > game.width - (player.body.width / 2)) {
		player.x = game.width - (player.body.width / 2);
		player.body.acceleration.x = 0;
	}
	if (player.x < 0) {
		player.x = 0;
		player.body.acceleration.x = 0;
	}

	//  Squish and rotate ship for illusion of "banking"
	player.bank = player.body.velocity.x / player.maxSpeed;
	player.scale.x = 0.25 - Math.abs(player.bank) / 20;
	player.angle = player.bank * 10;

	//  Keep the shipTrail lined up with the ship
	player.shipTrail.x = player.x + player.body.width / 2;
	player.shipTrail.y = player.y + player.body.height;

	if (fireButton.isDown) {
		weapons[currentWeapon].fire(player);
	}

	changeKey.onDown.add(toggleWeapon);


	//  Game over?
	if (!player.alive && gameOver.visible === false) {
		gameOver.visible = true;
		var fadeInGameOver = game.add.tween(gameOver);
		fadeInGameOver.to({
			alpha: 1
		}, 1000, Phaser.Easing.Quintic.Out);
		fadeInGameOver.onComplete.add(setResetHandlers);
		fadeInGameOver.start();

		function setResetHandlers() {
			//  The "click to restart" handler
			tapRestart = game.input.onTap.addOnce(_restart, this);
			spaceRestart = fireButton.onDown.addOnce(_restart, this);

			function _restart() {
				tapRestart.detach();
				spaceRestart.detach();
				restart();
			}
		}
	}
}
