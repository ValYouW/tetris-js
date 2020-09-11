class Board {
	constructor(rows, cols, blockSize) {
		this.rows = rows;
		this.cols = cols;
		this.blockSize = blockSize;
		this.blocksPile = new Array(rows).fill(0).map(x => new Array(cols).fill(0));
	}

	canMove(shape, dx, dy) {
		if (dy < 0) { return; }

		// Test out-of-bounds
		if (dx > 0 && (shape.bbox.x + shape.bbox.width - 1) + dx >= this.cols) {
			return false;
		}

		if (dx < 0 && shape.bbox.x + dx < 0) {
			return false;
		}

		if (dy > 0 && (shape.bbox.y + shape.bbox.height - 1) + dy >= this.rows) {
			return false;
		}

		// Test shape collision
		for (var i = 0; i < shape.blocks.length; ++i) {
			var pt = shape.blocks[i];
			if (this.blocksPile[pt.y + dy][pt.x + dx] === 1) {
				return false;
			}
		}

		return true;
	}

	addToPile(shape) {
		shape.blocks.forEach(p => {
			this.blocksPile[p.y][p.x] = 1;
		});

		// Remove completed lines
		for (var y = this.rows - 1; y >= 0; --y) {
			var sum = 0;
			for (var x = 0; x < this.cols; ++x) {
				sum += this.blocksPile[y][x];
			}

			// Full line
			if (sum === this.cols) {
				this.blocksPile.splice(y, 1);
			}

			// This line was totally empty meaning it's top of the pile
			if (sum === 0) { break; }
		}

		while (this.blocksPile.length < this.rows) {
			this.blocksPile.unshift(new Array(this.cols).fill(0));
		}
	}

	draw(graphics) {
		for (var y = this.rows - 1; y >= 0; --y) {
			var found = false;
			for (var x = 0; x < this.cols; ++x) {
				if (this.blocksPile[y][x] === 1) {
					graphics.drawBlock(x, y);
					found = true;
				}
			}

			if (!found) { break; }
		}
	}
}

export default Board;
