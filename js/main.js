var player,
	fpsText,
	scoreText,
	weapons = [],
	currentWeapon = 0,
	weaponName = null,
	explosions,
	healthContainer,
	healthMeter = 190,
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
