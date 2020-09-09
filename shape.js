class Shape {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;

		this.blocks = [];
	}

	move(dx, dy) {
		this.x += dx;
		this.y += dy;
		this.blocks.forEach(p => {
			p.x += dx;
			p.y += dy;
		});
	}

	draw(graphics) {
		this.blocks.forEach(p => graphics.drawBlock(p.x, p.y));
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
		this.blocks.push({ x, y });
		this.blocks.push({ x: x + 1, y });
		this.blocks.push({ x: x + 1, y: y + 1 });
		this.blocks.push({ x, y: y + 1 });
	}
}


