import { Ball } from "./Ball.js";

let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");

function getRandomColor() {
    let hue = Math.floor(Math.random() * 255);
    let saturation = Math.floor(Math.random() * 100);
    let lightness = Math.floor(Math.random() * 50) + 25;

    return 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)';
}

let ballPool = [];

for (let i = 0; i < 100; i++) {
    let ball = new Ball(context, getRandomColor(), Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2 * Math.PI);
    ballPool.push(ball);
}

// let ball2 = new Ball(context, "green", Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2 * Math.PI);
// let ball3 = new Ball(context, "red", Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2 * Math.PI);
// let ball4 = new Ball(context, "purple", Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2 * Math.PI);




function gameLoop() {
    context.reset();
    for (let ball of ballPool) {
        ball.animate();
        ball.draw();
    }
}


setInterval(gameLoop, 17);






