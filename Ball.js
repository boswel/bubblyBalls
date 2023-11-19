export class Ball {
    context;
    locationX;
    locationY;
    direction; // in radians
    speed;
    size;
    color;

    constructor(context, locationX, locationY, direction = 0, speed = 1, size = 20, color = "blue") {
        this.context = context;
        this.locationX = locationX;
        this.locationY = locationY;
        this.direction = direction;
        this.speed = speed;
        this.size = size;
        this.color = color;
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

    detectCollision() {
        return this.locationX <= 0 + this.size || this.locationX >= this.context.canvas.width - this.size ||
            this.locationY <= 0 + this.size || this.locationY >= this.context.canvas.height - this.size;
    }

    animate() {
        if (!this.detectCollision()) {
            this.move();
        }
    }
}
