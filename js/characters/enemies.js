function setupEnemies() {

	greenEnemies = game.add.group();
	greenEnemies.enableBody = true;
	greenEnemies.physicsBodyType = Phaser.Physics.ARCADE;
	greenEnemies.createMultiple(5, 'alien');
	greenEnemies.setAll('anchor.x', 0.5);
	greenEnemies.setAll('anchor.y', 0.5);
	greenEnemies.setAll('scale.x', 0.5);
	greenEnemies.setAll('scale.y', 0.5);
	greenEnemies.setAll('angle', 180);
	greenEnemies.setAll('outOfBoundsKill', true);
	greenEnemies.setAll('checkWorldBounds', true);
	greenEnemies.forEach(function (enemy) {
		enemy.damageAmount = 40;
		enemy.reward = 5;
	});
	launchGreenEnemy();

	blueEnemies = game.add.group();
	blueEnemies.enableBody = true;
	blueEnemies.physicsBodyType = Phaser.Physics.ARCADE;
	blueEnemies.createMultiple(30, 'redEnemy');
	blueEnemies.setAll('anchor.x', 0.5);
	blueEnemies.setAll('anchor.y', 0.5);
	blueEnemies.setAll('scale.x', 0.5);
	blueEnemies.setAll('scale.y', 0.5);
	blueEnemies.setAll('angle', 180);
	blueEnemies.forEach(function (enemy) {
		enemy.damageAmount = 20;
		enemy.reward = 10;
	});

	game.time.events.add(1000, launchBlueEnemy);
}

function setupInvader(invader) {

	invader.anchor.x = 0.5;
	invader.anchor.y = 0.5;
	invader.animations.add('kaboom');
}

function launchGreenEnemy() {
	var MIN_ENEMY_SPACING = 300;
	var MAX_ENEMY_SPACING = 3000;
	var ENEMY_SPEED = 300;

	var enemy = greenEnemies.getFirstExists(false);
	if (enemy) {
		enemy.reset(game.rnd.integerInRange(0, game.width), -20);
		enemy.body.velocity.x = game.rnd.integerInRange(-300, 300);
		enemy.body.velocity.y = ENEMY_SPEED;
		enemy.body.drag.x = 100;
		enemy.body.setSize(enemy.width * 4 / 2, enemy.height * 4 / 2);

		enemy.update = function () {
			enemy.angle = 180 - game.math.radToDeg(Math.atan2(enemy.body.velocity.x, enemy.body.velocity.y));
		};
	}

	//  Send another enemy soon
	game.time.events.add(game.rnd.integerInRange(MIN_ENEMY_SPACING, MAX_ENEMY_SPACING), launchGreenEnemy);
}

function launchBlueEnemy() {

	var startingX = game.rnd.integerInRange(100, game.width - 100);
	var verticalSpeed = 180;
	var spread = 60;
	var frequency = 70;
	var verticalSpacing = 70;
	var numEnemiesInWave = 5;
	var timeBetweenWaves = 7000;

	//  Launch wave
	for (var i = 0; i < numEnemiesInWave; i++) {
		var enemy = blueEnemies.getFirstExists(false);
		if (enemy) {
			enemy.startingX = startingX;
			enemy.reset(game.width / 2, -verticalSpacing * i);
			enemy.body.velocity.y = verticalSpeed;

			//  Update function for each enemy
			enemy.update = function () {

				// wave movement
				this.body.x = this.startingX + Math.sin((this.y) / frequency) * spread;

				//  Squish and rotate ship for illusion of "banking"
				enemy.bank = Math.cos((this.y + 60) / frequency);
				this.scale.x = 0.25 - Math.abs(enemy.bank) / 30;
				this.scale.y = 0.25;
				this.angle = 180 - enemy.bank * 10;

				//  Kill enemies once they go off screen
				if (this.y > game.height + 200) {
					this.kill();
				}
			};
		}
	}

	//  Send another wave soon
	blueEnemyLaunchTimer = game.time.events.add(timeBetweenWaves, launchBlueEnemy);
}
