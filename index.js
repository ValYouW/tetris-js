import Game from './game.js';

var game = null;
document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('btnStart').addEventListener('click', start);
});

function start(e) {
	e.target.blur();
	var can = document.getElementById('board');
	var s = window.getComputedStyle(can);
	can.width = parseFloat(s.width);
	can.height = parseFloat(s.height);
	if (game) { game.stop(); }
	game = new Game(can);
	game.start();
}

