function setupEffects() {
	
//  An explosion pool
	explosions = game.add.group();
	explosions.enableBody = true;
	explosions.physicsBodyType = Phaser.Physics.ARCADE;
	explosions.createMultiple(30, 'kaboom');
	explosions.setAll('anchor.x', 0.5);
	explosions.setAll('anchor.y', 0.5);
	explosions.forEach(function (explosion) {
		explosion.animations.add('kaboom');
	});
	
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
}