function render() {

	/*if (game.scale.isFullScreen) {
		game.debug.text('ESC to leave fullscreen', 270, 16);

	} else {
		game.debug.text('Click / Tap to go fullscreen', 270, 16);
	}*/

	fpsText.setText('FPS: ' + (game.time.fps || '--'));
}
