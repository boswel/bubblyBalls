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

    detectCollision(ball2) { // still need this one because of check during spawning
        let distX = ball2.locationX - this.locationX;
        let distY = ball2.locationY - this.locationY;
        let distance = Math.hypot(distX, distY);

        return distance <= ball2.size + this.size;
    }

    static resolveBallCollision(ball1, ball2) {

        let distX = ball2.locationX - ball1.locationX;
        let distY = ball2.locationY - ball1.locationY;
        let distance = Math.hypot(distX, distY);

        if (distance <= ball2.size + ball1.size) {
            // inspired by https://stackoverflow.com/questions/45910915/circle-to-circle-collision-response-not-working-as-expected

            // assuming that the balls can have different sizes
            let ball1Proportion = ball1.size / (ball1.size + ball2.size);

            let totalOverlap = (ball1.size + ball2.size) - distance;

            let ball1Overlap = totalOverlap * ball1Proportion;
            let ball2Overlap = totalOverlap - ball1Overlap;

            // normalise vector between balls 
            // => nx & ny are distX & distY if hyp = 1 => unit circle
            // x and y component of the hypotenuse between the two balls
            let nx = distX / distance;
            let ny = distY / distance;

            // move each ball so that they just touch
            ball1.locationX -= ball1Overlap * nx;
            ball1.locationY -= ball1Overlap * ny;

            ball2.locationX += ball2Overlap * nx;
            ball2.locationY += ball2Overlap * ny;

            // calculate absolute angle of distance line
            let angle = Math.atan2(distY, distX);

            // calculate incoming & outgoing angle, set direction for this 
            let ball1InAngle = ball1.direction - angle;
            ball1.direction = (angle - Math.PI) - ball1InAngle;

            // calculate incoming & outgoing angle, set direction for ball 
            let ball2InAngle = ball2.direction - angle;
            ball2.direction = (angle - Math.PI) - ball2InAngle;
        }
    }

    detectCollisionX() {
        return this.locationX <= this.size || this.locationX >= this.context.canvas.width - this.size;
    }

    detectCollisionY() {
        return this.locationY <= this.size || this.locationY >= this.context.canvas.height - this.size;
    }

    resolveWallCollision() {
        if (this.detectCollisionX()) {
            this.direction = Math.PI - this.direction;
        }
        if (this.detectCollisionY()) {
            this.direction = -this.direction;
        }
    }

}

