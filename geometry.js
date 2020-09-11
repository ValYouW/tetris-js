class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	clone() {
		return new Point(this.x, this.y);
	}

	move(dx, dy = 0) {
		this.x += dx;
		this.y += dy;

		return this;
	}
}

class Rect {
	constructor(origin, w, h) {
		this.origin = origin;
		this.width = w;
		this.height = h;
	}

	get x() {
		return this.origin.x;
	}

	get y() {
		return this.origin.y;
	}

	move(dx, dy = 0) {
		this.origin.move(dx, dy);
	}
}

export { Point, Rect };
