import Graphics from './graphics.js';
import Board from './board.js';
import Shape from './shape.js';

const INTERVAL = 250;
const BLOCK_SIZE = 20;

class Game {
	constructor(canvas) {
		this.canvas = canvas;

		this.mainShape = null;
		this.board = null;
		this.graphics = null;

		this.timer = null;
		this.lastUpdate = 0;
		this.onKeyDown = this.onKeyDown.bind(this);
	}

	start() {
		document.addEventListener('keydown', this.onKeyDown);

		var rows = this.canvas.height / BLOCK_SIZE;
		var cols = this.canvas.width / BLOCK_SIZE;
		this.board = new Board(rows, cols, BLOCK_SIZE);

		var ctx = this.canvas.getContext('2d');
		this.graphics = new Graphics(ctx, this.board);

		this.timer = window.requestAnimationFrame(this.update.bind(this));
	}

	stop() {
		window.cancelAnimationFrame(this.timer);
		document.removeEventListener('keydown', this.onKeyDown);
	}

	onKeyDown(e) {
		if (!this.mainShape) { return; }
		switch (e.key) {
			case 'ArrowLeft':
				this.mainShape.x -= 1;
				break;
			case 'ArrowRight':
				this.mainShape.x += 1;
				break;
			case 'Space':
				break;
		}
	}

	update() {
		if (Date.now() - this.lastUpdate > INTERVAL) {
			this.gameStep();
			this.lastUpdate = Date.now();
		}

		this.draw();

		this.timer = window.requestAnimationFrame(this.update.bind(this));
	}

	gameStep() {
		if (!this.mainShape) {
			var x = Math.round(this.board.cols / 2);
			var y = 0;
			this.mainShape = Shape.create('Square', x, y);
		} else {
			this.mainShape.y += 1;
		}
	}

	draw() {
		this.graphics.clear();
		this.mainShape.draw(this.graphics);
	}
}

export default Game;
