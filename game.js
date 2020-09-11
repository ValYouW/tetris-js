import Graphics from './graphics.js';
import Board from './board.js';
import Shape from './shape.js';
import { Point } from './geometry.js';

const INTERVAL = 500;
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
		this.stop();
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
		this.lastUpdate = 0;
		this.mainShape = null;
		document.removeEventListener('keydown', this.onKeyDown);
	}

	onKeyDown(e) {
		if (!this.mainShape) { return; }
		switch (e.code) {
			case 'ArrowLeft':
				this.moveShape(-1);
				break;
			case 'ArrowRight':
				this.moveShape(1);
				break;
			case 'ArrowDown':
				this.moveShape(0, 1);
				break;
			case 'ArrowUp':
				this.rotateShape();
				break;
			case 'Space':
				this.dropShape();
				break;
		}
	}

	moveShape(dx, dy = 0) {
		if (this.board.canMove(this.mainShape, dx, dy)) {
			this.mainShape.move(dx, dy);
			return true;
		}

		return false;
	}

	rotateShape() {
		var tmpShape = this.mainShape.clone();
		tmpShape.rotate(this.board.bbox);
		if (this.board.isVacant(tmpShape.blocks)) {
			this.mainShape = tmpShape;
		}
	}

	dropShape() {
		while (this.moveShape(0, 1)) { }
	}

	update() {
		if (Date.now() - this.lastUpdate > INTERVAL) {
			var gameOver = this.gameStep();
			if (gameOver) {
				this.stop();
				alert('Game Over !!');
				return;
			}
			this.lastUpdate = Date.now();
		}

		this.draw();

		this.timer = window.requestAnimationFrame(this.update.bind(this));
	}

	gameStep() {
		if (!this.mainShape) {
			var x = Math.round(this.board.cols / 2);
			var y = 0;
			this.mainShape = Shape.createRandom(new Point(x, y));
		} else {
			if (this.board.canMove(this.mainShape, 0, 1)) {
				this.mainShape.move(0, 1);
			} else if (this.mainShape.bbox.y <= 0) {
				return true;
			} else {
				// add shape to board and check fill lines
				this.board.addToPile(this.mainShape);
				this.mainShape = null;
			}
		}
	}

	draw() {
		this.graphics.clear();
		if (this.mainShape !== null) {
			this.mainShape.draw(this.graphics);
		}

		this.board.draw(this.graphics);
	}
}

export default Game;
