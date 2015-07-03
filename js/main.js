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
	hit;

var game = new Phaser.Game(
	800,
	600,
	Phaser.AUTO,
	'Spaceship blastin\'', {
		preload: preload,
		create: create,
		update: update,
		render: render
	});
