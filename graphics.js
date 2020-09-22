class Graphics {
	constructor(ctx, blockSize) {
		this.ctx = ctx;
		this.blockSize = blockSize;
	}

	clear() {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	}

	drawBlock(x, y, color = '#999') {
		var screenX = x * this.blockSize - 0.5;
		screenX = Math.max(0, screenX);
		var screenY = y * this.blockSize - 0.5;

		this.ctx.fillStyle = color;
		this.ctx.fillRect(screenX, screenY, this.blockSize, this.blockSize);
		this.ctx.strokeRect(screenX, screenY, this.blockSize, this.blockSize);
	}
}

export default Graphics;
