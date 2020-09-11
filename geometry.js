class Point {
	constructor(x = 0, y = 0) {
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

	rotate(origin, inBounds) {
		origin = origin || new Point();

		// Move to (0, 0)
		var offsetX = 0 - origin.x;
		var offsetY = 0 - origin.y;
		var x = this.x + offsetX;
		var y = this.y + offsetY;

		// Rotate and move back to place
		this.x = -1 * y - offsetX;
		this.y = x - offsetY;
	}
}

class Rect {
	constructor(origin, w, h) {
		this.origin = origin;
		this.width = w;
		this.height = h;
		this.ending = new Point(this.origin.x + this.width - 1, this.origin.y + this.height - 1);
	}

	get x() {
		return this.origin.x;
	}

	get y() {
		return this.origin.y;
	}

	move(dx, dy = 0) {
		this.origin.move(dx, dy);
		this.ending.move(dx, dy);
	}

	rotate(origin) {
		this.origin.rotate(origin);
		var w = this.width;
		this.width = this.height;
		this.height = w;
		this.ending = new Point(this.origin.x + this.width - 1, this.origin.y + this.height - 1);
	}

	clone() {
		return new Rect(this.origin.clone(), this.width, this.height);
	}
}

export { Point, Rect };
