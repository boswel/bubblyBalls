import { Ball } from './Ball.js'
import { ColorControls } from './ColorControls.js'

let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
let slides = document.querySelectorAll('input');

for (let slide of slides) {
    slide.addEventListener('change', createBalls);
}

let ballPool = [];

function createBalls() {
    ballPool = [];      // Q
    for (let i = 0; i < 100; i++) {
        let ball = new Ball(context, ColorControls.getRandomColor(), Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2 * Math.PI);
        ballPool.push(ball);
    }
}


window.onload = createBalls;

function gameLoop() {
    context.reset();
    for (let ball of ballPool) {
        ball.animate();
        ball.draw();
    }
}


setInterval(gameLoop, 17);






