export class Ball {
    context;
    locationX;
    locationY;
    _direction; // in radians
    speed;
    size;
    color;

    constructor(context, color, locationX, locationY, direction = 0, size = 20, speed = 1) {
        this.context = context;
        this.color = color;
        this.locationX = locationX;
        this.locationY = locationY;
        this.direction = direction;
        this.speed = speed;
        this.size = size;
    }

    set direction(value) {
        let n = Math.floor(value / (2 * Math.PI)); // number of whole rotations for positive values; for negatives adds an extra rotation, but this is necessary
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
        this.correctLocation();

        let distX = this.speed * Math.cos(this.direction);
        let distY = this.speed * Math.sin(this.direction);
        this.moveBy(distX, distY);
    }

    correctLocation() { // safeguards against ball being stuck in the wall
        if (this.locationX < this.size) {
            this.locationX = this.size;
        }
        if (this.locationX > this.context.canvas.width - this.size) {
            this.locationX = this.context.canvas.width - this.size;
        }
        if (this.locationY < this.size) {
            this.locationY = this.size;
        }
        if (this.locationY > this.context.canvas.height - this.size) {
            this.locationY = this.context.canvas.height - this.size;
        }
    }

    rotate(ball, displayBalls) {
        if (displayBalls) {
            if (this.detectCollision(ball)) {
                let distX = ball.locationX - this.locationX;
                let distY = ball.locationY - this.locationY;

                // according to https://stackoverflow.com/questions/45910915/circle-to-circle-collision-response-not-working-as-expected
                let distance = Math.hypot(distX, distY);
                // normalise vector between balls Q: why?
                let nx = distX / distance;
                let ny = distY / distance;

                // move balls away from each other along the line between them
                // using ratio of radius to work out where they touch
                let touchDistFromThis = (distance * (this.size / (this.size + ball.size)))
                let contactX = this.locationX + nx * touchDistFromThis;
                let contactY = this.locationY + ny * touchDistFromThis;

                // move each ball so that they just touch
                this.locationX = contactX - nx * this.size;
                this.locationY = contactY - ny * this.size;

                ball.locationX = contactX + nx * ball.size;
                ball.locationY = contactY + ny * ball.size;

                // calculate absolute angle of distance line
                let angle = Math.atan2(distY, distX);
                // calculate incoming angle
                let inAngle = this.direction - angle;
                // calculate outgoing angle, set direction
                this.direction = (angle - Math.PI) - inAngle;
            }
        }

        if (this.detectCollisionX()) {
            this.direction = Math.PI - this.direction;
        }
        if (this.detectCollisionY()) {
            this.direction = -this.direction;
        }
    }

    detectCollisionX() {
        return this.locationX <= this.size || this.locationX >= this.context.canvas.width - this.size;
    }

    detectCollisionY() {
        return this.locationY <= this.size || this.locationY >= this.context.canvas.height - this.size;
    }

    detectCollision(ball) {
        if (ball === this) return false;

        let distX = ball.locationX - this.locationX;
        let distY = ball.locationY - this.locationY;
        let distance = Math.hypot(distX, distY);

        return distance <= ball.size + this.size;
    }

}

