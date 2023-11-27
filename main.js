import { Ball } from './Ball.js'
import { ColorControls } from './ColorControls.js'

let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
let rangeContainer = document.querySelector('.range-container');
let slides = rangeContainer.querySelectorAll('.range-slider input');

for (let slide of slides) {
    slide.addEventListener('change', () => {
        createBalls();
        rangeContainer.style.setProperty('--hue', ColorControls.averageHue);
    });
}

let ballPool = [];

function createBalls() {
    ballPool = [];
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






