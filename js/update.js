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

	lives--;
	healthMeter = healthMeter - 10;
	healthContainer.clear();
	healthContainer.beginFill(0x01DF01, 1.0);
	healthContainer.drawRect(5, 55, healthMeter, 10);

	var explosion = explosions.getFirstExists(false);
	explosion.reset(enemy.body.x + enemy.body.halfWidth, enemy.body.y + enemy.body.halfHeight);
	explosion.body.velocity.y = enemy.body.velocity.y;
	explosion.alpha = 0.7;
	explosion.play('kaboom', 30, false, true);
	enemy.kill();
}

function update() {

	player.bringToTop();

	game.physics.arcade.overlap(player, greenEnemies, shipCollide, null, this);
	game.physics.arcade.overlap(player, blueEnemies, shipCollide, null, this);

	player.body.acceleration.x = 0;
	player.body.acceleration.y = 0;

	if (leftButton.isDown) {
		player.body.acceleration.x = -acceleration;
	}

	if (rightButton.isDown) {
		player.body.acceleration.x = acceleration;
	}

	if (upButton.isDown) {
		player.body.acceleration.y = -acceleration;
	}

	if (downButton.isDown) {
		player.body.acceleration.y = acceleration;
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
	bank = player.body.velocity.x / maxSpeed;
	player.scale.x = 0.25 - Math.abs(bank) / 20;
	player.angle = bank * 10;

	//  Keep the shipTrail lined up with the ship
	shipTrail.x = player.x + player.body.width / 2;
	shipTrail.y = player.y + player.body.height;

	if (fireButton.isDown) {
		weapons[currentWeapon].fire(player);
	}

	changeKey.onDown.add(toggleWeapon);
}
