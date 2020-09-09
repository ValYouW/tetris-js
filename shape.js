class Shape {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
}

Shape.create = function(type, x, y) {
	switch (type) {
		case 'Square':
			return new Square(x, y);
		default:
			throw new Error('Unknown shape type' + type);
	}
}

export default Shape;

class Square extends Shape {
	constructor(x, y) {
		super(x, y, 2, 2);
	}

	draw(graphics) {
		graphics.drawBlock(this.x, this.y);
		graphics.drawBlock(this.x + 1, this.y);
		graphics.drawBlock(this.x + 1, this.y + 1);
		graphics.drawBlock(this.x, this.y + 1);
	}
}


