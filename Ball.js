export class Ball {
    context;
    locationX;
    locationY;
    _direction; // in radians
    speed;
    size;
    color;

    constructor(context, color, locationX, locationY, direction = 0, speed = 1, size = 20) {
        this.context = context;
        this.locationX = locationX;
        this.locationY = locationY;
        this.direction = direction;
        this.speed = speed;
        this.size = size;
        this.color = color;
    }

    set direction(value) {
        let n = Math.floor(value / 2 * Math.PI); // number of whole rotations
        let positiveValue = value - n * 2 * Math.PI; // normalizing the value to be between 0 and 2pi
        this._direction = positiveValue > Math.PI ? positiveValue - 2 * Math.PI : positiveValue; // normalizing the value to be between -pi and pi
    }

    get direction() {
        return this._direction;
    }


    draw() {
        this.context.beginPath();
        this.context.arc(this.locationX, this.locationY, this.size, 0, Math.PI * 2);
        this.context.fillStyle = this.color;
        this.context.fill();
    }

    moveBy(distX, distY) {
        this.locationX += distX;
        this.locationY += distY;
    }

    move() {
        let distX = this.speed * Math.cos(this.direction);
        let distY = this.speed * Math.sin(this.direction);
        this.moveBy(distX, distY);
    }

    rotate() {
        if (this.detectCollisionX()) {
            this.direction = Math.PI - this.direction;
        }
        if (this.detectCollisionY()) {
            this.direction = -this.direction;
        }
    }

    detectCollisionX() {
        return this.locationX <= 0 + this.size || this.locationX >= this.context.canvas.width - this.size; // TODO: if true, also reset locationX to this.size (add in the move?)
    }

    detectCollisionY() {
        return this.locationY <= 0 + this.size || this.locationY >= this.context.canvas.height - this.size;
    }

    animate() {
        this.rotate();
        this.move();
    }
}
