import Game from './game.js';

var game = null;
document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('btnStart').addEventListener('click', start);
});

function start(e) {
	e.target.blur();
	var can = document.getElementById('board');
	if (game) { game.stop(); }
	game = new Game(can);
	game.start();
}

