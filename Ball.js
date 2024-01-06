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

                // inspired by https://stackoverflow.com/questions/45910915/circle-to-circle-collision-response-not-working-as-expected
                let distance = Math.hypot(distX, distY);

                // assuming that the balls can have different sizes
                let thisProportion = this.size / (this.size + ball.size);

                let totalOverlap = (this.size + ball.size) - distance;

                let thisOverlap = totalOverlap * thisProportion;
                let ballOverlap = totalOverlap - thisOverlap;

                // normalise vector between balls 
                // => nx & ny are distX & distY if hyp = 1 => unit circle
                // x and y component of the hypotenuse between the two balls
                let nx = distX / distance;
                let ny = distY / distance;

                // move each ball so that they just touch
                this.locationX -= thisOverlap * nx;
                this.locationY -= thisOverlap * ny;

                ball.locationX += ballOverlap * nx;
                ball.locationY += ballOverlap * ny;

                // calculate absolute angle of distance line
                let angle = Math.atan2(distY, distX);

                // calculate incoming & outgoing angle, set direction for this 
                let thisInAngle = this.direction - angle;
                this.direction = (angle - Math.PI) - thisInAngle;

                // calculate incoming & outgoing angle, set direction for ball 
                let ballInAngle = ball.direction - angle;
                ball.direction = (angle - Math.PI) - ballInAngle;
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

