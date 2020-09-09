class Board {
	constructor(rows, cols, blockSize) {
		this.rows = rows;
		this.cols = cols;
		this.blockSize = blockSize;
	}

	canMove(shape, dx, dy) {
		if (dy < 0) { return; }
		if (dx > 0 && (shape.x + shape.w - 1) + dx >= this.cols) {
			return false;
		}

		if (dx < 0 && shape.x + dx < 0) {
			return false;
		}

		if (dy > 0 && (shape.y + shape.h - 1) + dy >= this.rows) {
			return false;
		}

		return true;
	}
}

export default Board;
