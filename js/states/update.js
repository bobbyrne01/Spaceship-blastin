function shipCollide(player, enemy) {

	hit.play();

	healthMeter = healthMeter - enemy.damageAmount;
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

	player.score = player.score + enemy.reward;

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
	if (player.x > game.width - (player.width / 2)) {
		player.x = game.width - (player.width / 2);
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
	player.shipTrail.x = player.x + player.width / 2;
	player.shipTrail.y = player.y + player.height;

	if (fireButton.isDown) {
		weapons[player.currentWeapon].fire(player);
	}

	
	if (player.score >= 0 && player.score < 100){
		player.currentWeapon = 0;
		
	}else if (player.score >= 100 && player.score < 200){
		
		player.currentWeapon = 1;
		
		if (player.scatterUnlocked === false){
			player.scatterUnlocked = true;
			
			weaponText.setText('Scatter unlocked!');
			game.time.events.add(5000, resetUnlocked);
		}
		
	}else if (player.score >= 200 && player.score < 300){
		player.currentWeapon = 2;
		
		if (player.threeUnlocked === false){
			player.threeUnlocked = true;
			
			weaponText.setText('Three unlocked!');
			game.time.events.add(5000, resetUnlocked);
		}
		
	}else if (player.score >= 300 && player.score < 400){
		player.currentWeapon = 3;
		
		if (player.splitUnlocked === false){
			player.splitUnlocked = true;
			
			weaponText.setText('split unlocked!');
			game.time.events.add(5000, resetUnlocked);
		}
		
	}else if (player.score >= 400 && player.score < 500){
		player.currentWeapon = 4;
		
		if (player.eightUnlocked === false){
			player.eightUnlocked = true;
			
			weaponText.setText('eight unlocked!');
			game.time.events.add(5000, resetUnlocked);
		}
		
	}else if (player.score >= 500 && player.score < 600){
		player.currentWeapon = 5;
		
		if (player.rocketUnlocked === false){
			player.rocketUnlocked = true;
			
			weaponText.setText('rocket unlocked!');
			game.time.events.add(5000, resetUnlocked);
		}
		
	}else if (player.score >= 600 && player.score < 700){
		player.currentWeapon = 6;
		
		if (player.scaleUnlocked === false){
			player.scaleUnlocked = true;
			
			weaponText.setText('scale unlocked!');
			game.time.events.add(5000, resetUnlocked);
		}
	}
	
	weapons[player.currentWeapon].visible = true;


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

function resetUnlocked() {
	weaponText.setText('');
}