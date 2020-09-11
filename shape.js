import { Rect, Point } from './geometry.js';
const TYPES = ['Square', 'Line', 'Plus', 'L', 'Z'];

class Shape {
	constructor(bbox) {
		this.bbox = bbox;
		this.blocks = [];
		this.color = '#999';
	}

	clone() {
		// @ts-ignore
		var s = new this.constructor(new Point());
		s.bbox = this.bbox.clone();
		s.color = this.color;
		s.blocks = this.blocks.map(b => b.clone());

		return s;
	}

	move(dx, dy) {
		this.bbox.move(dx, dy);
		this.blocks.forEach(p => {
			p.move(dx, dy);
		});
	}

	draw(graphics) {
		this.blocks.forEach(p => graphics.drawBlock(p.x, p.y, this.color));
	}

	rotate(inBounds) {
		var anchor = this.blocks[1];
		var minX = 9999;
		var minY = 9999;
		this.blocks.forEach(p => {
			p.rotate(anchor, inBounds)
			if (p.x < minX) { minX = p.x; }
			if (p.y < minY) { minY = p.y; }
		});

		this.bbox = new Rect(new Point(minX, minY), this.bbox.height, this.bbox.width);

		if (inBounds) {
			var dx = 0;
			var dy = 0;
			if (this.bbox.y < inBounds.y) {
				dy = inBounds.y - this.bbox.y;
			}

			if (this.bbox.ending.y > (inBounds.height - 1)) {
				dy = (inBounds.height - 1) - this.bbox.ending.y;
			}

			if (this.bbox.x < inBounds.x) {
				dx = inBounds.x - this.bbox.x;
			}

			if (this.bbox.ending.x > (inBounds.width - 1)) {
				dx = (inBounds.width - 1) - this.bbox.ending.x;
			}

			this.move(dx, dy);
		}
	}

	static createRandom(origin) {
		var type = TYPES[Math.floor(Math.random() * TYPES.length)]
		switch (type) {
			case 'Square':
				return new Square(origin);
			case 'Line':
				return new Line(origin);
			case 'Plus':
				return new Plus(origin);
			case 'L':
				return new L(origin);
			case 'Z':
				return new Z(origin);
			default:
				throw new Error('Unknown shape type' + type);
		}
	}
}

export default Shape;

class Square extends Shape {
	constructor(origin) {
		super(new Rect(origin, 2, 2));
		this.blocks.push(origin.clone());
		this.blocks.push(origin.clone().move(1, 0));
		this.blocks.push(origin.clone().move(1, 1));
		this.blocks.push(origin.clone().move(0, 1));

		this.color = '#cc0000';
	}

	rotate() { }
}

class Line extends Shape {
	constructor(origin) {
		super(new Rect(origin, 4, 1));
		this.blocks.push(origin.clone());
		this.blocks.push(origin.clone().move(1));
		this.blocks.push(origin.clone().move(2));
		this.blocks.push(origin.clone().move(3));

		this.color = '#009900';
	}
}

class L extends Shape {
	constructor(origin) {
		super(new Rect(origin, 3, 2));
		this.blocks.push(origin.clone());
		this.blocks.push(origin.clone().move(1));
		this.blocks.push(origin.clone().move(2));
		this.blocks.push(origin.clone().move(2, 1));

		this.color = '#0000cc';
	}
}

class Z extends Shape {
	constructor(origin) {
		super(new Rect(origin, 3, 2));
		this.blocks.push(origin.clone());
		this.blocks.push(origin.clone().move(1));
		this.blocks.push(origin.clone().move(1, 1));
		this.blocks.push(origin.clone().move(2, 1));

		this.color = '#999900';
	}
}

class Plus extends Shape {
	constructor(origin) {
		super(new Rect(origin, 3, 2));
		this.blocks.push(origin.clone());
		this.blocks.push(origin.clone().move(1));
		this.blocks.push(origin.clone().move(2));
		this.blocks.push(origin.clone().move(1, 1));

		this.color = '#990099';
	}
}
