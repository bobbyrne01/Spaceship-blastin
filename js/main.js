window.onload = function() {
	
	var parent,
		player,
		ground;

	function gofull() {
		game.scale.startFullScreen();
	}
	
	function actionMoveLeft () {
		
		
	}
	
	function actionMoveRight () {
		
		
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
		
		game.load.image('disk', 'assets/sprites/stone/elementStone014.png');
		game.load.image('stone23', 'assets/sprites/stone/elementStone011.png');
		game.load.image('stone46', 'assets/sprites/stone/elementStone046.png');
		game.load.image('metal1', 'assets/sprites/metal/elementMetal001.png');
	}

	function create() {

		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = 300;
		game.stage.backgroundColor = '#000';
		//game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT; // Stretch to fill
		//game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE; // Keep original size
		game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL; // Maintain aspect ratio
		game.input.onDown.add(gofull, this);
		
		
		parent = game.add.sprite(0, game.world.height - game.cache.getImage('disk').height, 'disk');
		parent = game.add.sprite(game.cache.getImage('disk').width * 1, game.world.height - game.cache.getImage('disk').height, 'disk');
		parent = game.add.sprite(game.cache.getImage('disk').width * 2, game.world.height - game.cache.getImage('disk').height, 'disk');
		parent = game.add.sprite(game.cache.getImage('stone23').width * 3, game.world.height - game.cache.getImage('stone23').height, 'stone23');
		parent = game.add.sprite(game.cache.getImage('stone23').width * 4, game.world.height - game.cache.getImage('stone23').height, 'stone46');
		player = game.add.sprite(game.cache.getImage('stone23').width * 5, game.world.height - (game.cache.getImage('stone23').height * 2), 'metal1');
		game.physics.enable(player, Phaser.Physics.ARCADE);
		ground = game.add.sprite(game.cache.getImage('disk').width * 5, game.world.height - game.cache.getImage('disk').height, 'disk');
		game.physics.enable(ground, Phaser.Physics.ARCADE);
		ground.body.allowGravity = false;
		ground.body.immovable = true;
		
		parent = game.add.sprite(game.cache.getImage('disk').width * 6, game.world.height - game.cache.getImage('disk').height, 'disk');
		parent = game.add.sprite(game.cache.getImage('stone23').width * 7, game.world.height - game.cache.getImage('stone23').height, 'stone23');
		parent = game.add.sprite(game.cache.getImage('stone23').width * 8, game.world.height - game.cache.getImage('stone23').height, 'stone46');
		parent = game.add.sprite(game.cache.getImage('stone23').width * 9, game.world.height - game.cache.getImage('stone23').height, 'stone23');
		parent = game.add.sprite(game.cache.getImage('stone23').width * 10, game.world.height - game.cache.getImage('stone23').height, 'stone46');
		parent = game.add.sprite(game.cache.getImage('stone23').width * 11, game.world.height - game.cache.getImage('stone23').height, 'stone46');
	}

	function update() {
		
		game.physics.arcade.collide(player, ground);
		
		if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
	        player.x -= 4;
	    
		} else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
	        player.x += 4;
	        
	    }else if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
	    	player.body.velocity.y = -500;
	    }
	}

	function render() {

		game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");

		if (game.scale.isFullScreen) {

			game.debug.text('ESC to leave fullscreen', 270, 16);

		} else {
			game.debug.text('Click / Tap to go fullscreen', 270, 16);
		}
	}

};