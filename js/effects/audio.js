function setupAudio() {
	
	music = game.add.audio('music', 1, true); // key, volume, loop
	music.play('', 0, 1, true);
	hit = game.add.audio('hit');
}