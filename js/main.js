var player,
	fpsText,
	scoreText,
	weapons = [],
	explosions,
	healthContainer,
	healthMeter = 190,
	greenEnemies,
	blueEnemies,
	gameOver,
	score = 0,
	hit;

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
