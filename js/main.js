var player,
	emitter,
	lives = 5,
	fpsText,
	livesText,
	weapons = [],
	currentWeapon = 0,
	weaponName = null,
	explosions,
	healthContainer,
	healthMeter = 190,
	ACCLERATION = 600,
	DRAG = 400,
	MAXSPEED = 400,
	bank,
	shipTrail;

function gofull() {
	game.scale.startFullScreen();
}

var game = new Phaser.Game(
	800,
	600,
	Phaser.AUTO,
	'Game', {
		preload: preload,
		create: create,
		update: update,
		render: render
	});

function preload() {

	game.time.advancedTiming = true;
	game.time.desiredFps = 60;

	game.load.image('player', 'assets/sprites/ships/F5S4.png');
	game.load.image('alien', 'assets/sprites/ships/alien4.png');
	game.load.image('missile', 'assets/sprites/ships/aliendropping0005.png');
	game.load.image('bullet', 'assets/sprites/other/bullet.png');
	game.load.image('trail', 'assets/sprites/other/trail.png')

	game.load.spritesheet('kaboom', 'assets/sprites/other/explode.png', 128, 128);
	game.load.spritesheet('rain', 'assets/sprites/other/rain.png', 17, 17);
	game.load.bitmapFont('shortStack', 'assets/sprites/other/desyrel.png', 'assets/sprites/other/desyrel.xml');

	for (var i = 1; i <= 11; i++) {
		game.load.image('bullet' + i, 'assets/sprites/bullets/bullet' + i + '.png');
	}
}

function setupInvader(invader) {

	invader.anchor.x = 0.5;
	invader.anchor.y = 0.5;
	invader.animations.add('kaboom');
}

function create() {

	fpsText = game.add.bitmapText(680, 0, 'shortStack', '', 32);
	livesText = game.add.bitmapText(2, 0, 'shortStack', '', 32);
	weaponName = game.add.bitmapText(680, 30, 'shortStack', "Single Bullet", 32);

	healthContainer = game.add.graphics(0, 0);
	healthContainer.beginFill(0x01DF01, 1.0);
	healthContainer.drawRect(5, 55, healthMeter, 10);

	health = game.add.graphics(0, 0);
	health.beginFill(0xFFFFFF, 0.3);
	health.drawRect(0, 50, 200, 20);

	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.stage.backgroundColor = '#000';
	game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL; // Maintain aspect ratio
	game.input.onDown.add(gofull, this);

	player = game.add.sprite(
		game.world.width / 2,
		game.world.height,
		'player');
	player.scale.setTo(0.25, 0.25);
	game.physics.arcade.enable(player);
	player.body.collideWorldBounds = true;
	player.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
	player.body.drag.setTo(DRAG, DRAG);

	fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	leftButton = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	rightButton = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	upButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	downButton = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	changeKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

	emitter = game.add.emitter(0, 100, 100);
	emitter.makeParticles('alien');
	emitter.gravity = 400;
	emitter.width = 500;
	emitter.x = game.world.width / 2;
	emitter.y = -300;
	emitter.minRotation = 0;
	emitter.maxRotation = 0;
	emitter.angle = 0;
	emitter.setScale(0.1, 0.5, 0.1, 0.5, 6000, Phaser.Easing.Quintic.Out);
	emitter.start(false, 2000, 500);

	var emitter2 = game.add.emitter(game.world.centerX, 0, 400);
	emitter2.width = game.world.width;
	emitter2.makeParticles('rain');
	emitter2.minParticleScale = 0.1;
	emitter2.maxParticleScale = 0.5;
	emitter2.setYSpeed(300, 500);
	emitter2.setXSpeed(0, 0);
	emitter2.minRotation = 0;
	emitter2.maxRotation = 0;
	emitter2.start(false, 1600, 5, 0);
	
	// Add an emitter for the ship's trail
	shipTrail = game.add.emitter(player.x + player.body.width / 2, player.y + player.body.height, 400);
	shipTrail.width = 10;
	shipTrail.makeParticles('trail');
	shipTrail.setXSpeed(30, -30);
	shipTrail.setYSpeed(200, 180);
	shipTrail.setRotation(50,-50);
	shipTrail.setAlpha(1, 0.01, 800);
	shipTrail.setScale(0.05, 0.4, 0.05, 0.4, 2000, Phaser.Easing.Quintic.Out);
	shipTrail.start(false, 5000, 10);

	weapons.push(new Weapon.SingleBullet(game));
	weapons.push(new Weapon.ThreeWay(game));
	weapons.push(new Weapon.EightWay(game));
	weapons.push(new Weapon.ScatterShot(game));
	weapons.push(new Weapon.Beam(game));
	weapons.push(new Weapon.SplitShot(game));
	weapons.push(new Weapon.Rockets(game));
	weapons.push(new Weapon.ScaleBullet(game));

	currentWeapon = 0;

	for (var i = 1; i < weapons.length; i++) {

		weapons[i].visible = false;
	}

	weapons[currentWeapon].visible = true;
}

function update() {

	player.bringToTop();
	game.physics.arcade.collide(player, emitter, null, change, this);
	
	player.body.acceleration.x = 0;
	player.body.acceleration.y = 0;

	if (leftButton.isDown) {
		player.body.acceleration.x = -ACCLERATION;
	}

	if (rightButton.isDown) {
		player.body.acceleration.x = ACCLERATION;
	}

	if (upButton.isDown) {
		player.body.acceleration.y = -ACCLERATION;
	}

	if (downButton.isDown) {
		player.body.acceleration.y = ACCLERATION;
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
	bank = player.body.velocity.x / MAXSPEED;
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

function change(a, b) {
	b.destroy();

	lives--;
	healthMeter = healthMeter - 10;
	healthContainer.clear();
	healthContainer.beginFill(0x01DF01, 1.0);
	healthContainer.drawRect(5, 55, healthMeter, 10);

	// And create an explosion :)
	explosions = game.add.group();
	explosions.createMultiple(30, 'kaboom');
	explosions.forEach(setupInvader, this);
	var explosion = explosions.getFirstExists(false);
	explosion.reset(player.body.x + player.body.width / 2, player.body.y + player.body.height / 2);
	explosion.play('kaboom', 30, false, true);

	return false;
}

function toggleWeapon() {

	if (currentWeapon === 7) {
		currentWeapon = 0;
	} else {
		currentWeapon++;
	}

	weapons[currentWeapon].visible = true;
	weaponName.text = weapons[currentWeapon].name;
}

function render() {

	if (game.scale.isFullScreen) {
		game.debug.text('ESC to leave fullscreen', 270, 16);

	} else {
		game.debug.text('Click / Tap to go fullscreen', 270, 16);
	}

	fpsText.setText('FPS: ' + (game.time.fps || '--'));
	livesText.setText('Lives: ' + lives);
}
