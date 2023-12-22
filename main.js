import { Ball } from './Ball.js'
import { ColorControls } from './ColorControls.js'

let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
let rangeContainer = document.querySelector('.range-container');
let inputs = document.querySelectorAll('input');
let number = document.querySelector('.number');
let size = document.querySelector('.size');
let speed = document.querySelector('.speed');

for (let input of inputs) {
    input.addEventListener('change', () => {
        createBalls();
        rangeContainer.style.setProperty('--hue', ColorControls.averageHue);
    });
}

let ballPool = [];

function createBalls() {
    ballPool = [];
    let collided = false;

    for (let i = 0; i < number.value; i++) {
        let ball = new Ball(
            context,
            ColorControls.getRandomColor(),
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 2 * Math.PI,
            Number(size.value),
            Number(speed.value));

        do { // to safeguard against balls spawning in the ~same place
            collided = false;

            for (let ball2 of ballPool) {
                if (ball.detectCollision(ball2)) {
                    ball.locationX = Math.random() * canvas.width;
                    ball.locationY = Math.random() * canvas.height;
                    collided = true;
                    break;
                }
            }
        } while (collided);

        ballPool.push(ball);
    }
}


window.onload = createBalls;

function gameLoop() {
    context.reset();

    for (let ball of ballPool) {
        for (let ball2 of ballPool) {
            ball.rotate(ball2);
        }
    }

    for (let ball of ballPool) {
        ball.move();
        ball.draw();
    }
}


setInterval(gameLoop, 17); // 1000/60 = 60 frames/s






