var player,
	fpsText,
	scoreText,
	livesText,
	weapons = [],
	currentWeapon = 0,
	weaponName = null,
	explosions,
	healthContainer,
	healthMeter = 190,
	acceleration = 1000,
	drag = 400,
	maxSpeed = 400,
	bank,
	shipTrail,
	greenEnemies,
	blueEnemies,
	gameOver,
	score = 0;

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
