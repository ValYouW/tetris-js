import Game from './game.js';

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('btnStart').addEventListener('click', start);
});

function start() {
	var can = document.getElementById('board');
	var s = window.getComputedStyle(can);
	can.width = parseFloat(s.width);
	can.height = parseFloat(s.height);
	var g = new Game(can, document);
	g.start();
}

