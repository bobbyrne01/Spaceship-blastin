window.onload = function() {
	
	var	player,
		emitter,
		lives = 5,
		fpsText,
		livesText;

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
		
		game.load.image('missile', 'assets/sprites/ships/aliendropping0005.png');
		game.load.image('stone23', 'assets/sprites/stone/elementStone011.png');
		game.load.image('stone46', 'assets/sprites/stone/elementStone046.png');
		game.load.image('metal1', 'assets/sprites/metal/elementMetal001.png');
		game.load.image('player', 'assets/sprites/ships/smallfighter0007.png');
		game.load.image('bullet', 'assets/sprites/other/bullet.png');
		game.load.image('health', 'assets/sprites/hud/right_hbar.png');
		
		game.load.spritesheet('rain', 'assets/sprites/other/rain.png', 17, 17);
		
		game.load.bitmapFont('shortStack', 'assets/sprites/other/desyrel.png', 'assets/sprites/other/desyrel.xml');
	}

	function create() {
		
		fpsText = game.add.bitmapText(2, 0, 'shortStack','FPS: ', 32);
		livesText = game.add.bitmapText(2, 30, 'shortStack','FPS: ', 32);
		

		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.stage.backgroundColor = '#000';
		game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL; // Maintain aspect ratio
		game.input.onDown.add(gofull, this);
		
		player = game.add.sprite(
				game.cache.getImage('stone23').width * 5, 
				game.world.height - (game.cache.getImage('stone23').height * 2), 
				'player');
		player.scale.setTo(0.5, 0.5);
		game.physics.arcade.enable(player);
		player.body.collideWorldBounds = true;
		//player.body.allowGravity = false;
		
		var health = game.add.sprite(game.world.width - (game.cache.getImage('health').width / 2), 0, 'health');
		health.scale.setTo(0.5, 0.5);
	    
	    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	    leftButton = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	    rightButton = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);		
		
		emitter = game.add.emitter(0, 100, 100);
		emitter.makeParticles('missile');
	    emitter.gravity = 400;
	    emitter.width = 500;
	    emitter.x = game.world.width / 2;
	    emitter.y = -300;
	    emitter.minRotation = 0;
	    emitter.maxRotation = 0;
	    emitter.setScale(0.1, 0.5, 0.1, 0.5, 6000, Phaser.Easing.Quintic.Out);
	    emitter.start(false, 2000, 500);
	    
	    var emitter2 = game.add.emitter(game.world.centerX, 0, 400);
	    emitter2.width = game.world.width;
	    emitter2.makeParticles('rain');
	    emitter2.minParticleScale = 0.1;
	    emitter2.maxParticleScale = 0.5;
	    emitter2.setYSpeed(300, 500);
	    emitter2.setXSpeed(-5, 5);
	    emitter2.minRotation = 0;
	    emitter2.maxRotation = 0;
	    emitter2.start(false, 1600, 5, 0);
	}

	function update() {
		
		/*
		 * player movement
		 */
		if (leftButton.isDown){
			player.x -= 4;
        
		}else if (rightButton.isDown){
			player.x += 4;
        }
		
		/*
		 * player shooting
		 */
        if (fireButton.isDown){
        	console.log('shoot');
        }
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
};
