export class Ball {
    context;
    locationX;
    locationY;
    direction; // in radians
    size;
    color;

    constructor(context, locationX, locationY, direction = 0, size = 20, color = "blue") {
        this.context = context;
        this.locationX = locationX;
        this.locationY = locationY;
        this.direction = direction;
        this.size = size;
        this.color = color;
    }

    draw() {
        this.context.beginPath();
        this.context.arc(this.locationX, this.locationY, this.size, 0, Math.PI * 2);
        this.context.fillStyle = this.color;
        this.context.fill();
    }


}
