import { Rect } from './geometry.js';
const TYPES = ['Square', 'Line', 'Plus', 'L', 'Z'];

class Shape {
	constructor(bbox) {
		this.bbox = bbox;
		this.blocks = [];
		this.color = '#999';
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

	rotate() { }
}

Shape.createRandom = function(origin) {
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

export default Shape;

class Square extends Shape {
	constructor(origin) {
		super(new Rect(origin, 2, 2));
		this.blocks.push(origin.clone());
		this.blocks.push(origin.clone().move(1, 0));
		this.blocks.push(origin.clone().move(1, 1));
		this.blocks.push(origin.clone().move(0, 1));

		// this.color = '#cc0000';
	}
}

class Line extends Shape {
	constructor(origin) {
		super(new Rect(origin.clone().move(-2), 4, 1));
		this.blocks.push(origin.clone().move(-2));
		this.blocks.push(origin.clone().move(-1));
		this.blocks.push(origin.clone());
		this.blocks.push(origin.clone().move(1));

		// this.color = '#009900';
	}

	rotate() {

	}
}

class L extends Shape {
	constructor(origin) {
		super(new Rect(origin.clone().move(-2, 0), 3, 2));
		this.blocks.push(origin.clone().move(-2, 0));
		this.blocks.push(origin.clone().move(-1, 0));
		this.blocks.push(origin.clone());
		this.blocks.push(origin.clone().move(0, 1));

		// this.color = '#0000cc';
	}
}

class Z extends Shape {
	constructor(origin) {
		super(new Rect(origin.clone().move(-1, 0), 3, 2));
		this.blocks.push(origin.clone().move(-1, 0));
		this.blocks.push(origin.clone());
		this.blocks.push(origin.clone().move(0, 1));
		this.blocks.push(origin.clone().move(1, 1));

		// this.color = '#999900';
	}
}

class Plus extends Shape {
	constructor(origin) {
		super(new Rect(origin.clone().move(-1, 0), 3, 2));
		this.blocks.push(origin.clone().move(-1, 0));
		this.blocks.push(origin.clone());
		this.blocks.push(origin.clone().move(1, 0));
		this.blocks.push(origin.clone().move(0, 1));

		// this.color = '#990099';
	}
}
