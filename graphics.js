class Graphics {
	constructor(ctx, board) {
		this.ctx = ctx;
		this.board = board;
	}

	clear() {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	}

	drawBlock(x, y, color = '#999') {
		var screenX = x * this.board.blockSize - 0.5;
		screenX = Math.max(0, screenX);
		var screenY = y * this.board.blockSize - 0.5;

		this.ctx.fillStyle = color;
		this.ctx.fillRect(screenX, screenY, this.board.blockSize, this.board.blockSize);
		this.ctx.strokeRect(screenX, screenY, this.board.blockSize, this.board.blockSize);
	}
}

export default Graphics;
