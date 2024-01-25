import { Ball } from './Ball.js'
import { ColorControls } from './ColorControls.js'

let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
let rangeContainer = document.querySelector('.range-container');
let inputs = document.querySelectorAll('input');
let number = document.querySelector('.number');
let size = document.querySelector('.size');
let speed = document.querySelector('.speed');
let toggleswitch = document.querySelector('.switch');
let ballsCheckbox = document.querySelector('.balls-checkbox');
let heightRatio = 0.6;

canvas.width = canvas.clientWidth;
canvas.height = canvas.width * heightRatio;


for (let input of inputs) {
    input.addEventListener('change', () => {

        number.max = ballsCheckbox.checked ? 70 : 100; // because balls need more room to move than bubbles

        createBalls();
        rangeContainer.style.setProperty('--hue', ColorControls.averageHue);
        toggleswitch.style.setProperty('--hue', ColorControls.averageHue);
    });
}


let ballPool = [];
let ballPairs = [];

function createBalls() {
    ballPool = [];
    let collided = false;

    for (let i = 0; i < number.value; i++) {
        let ball = new Ball(
            context,
            ColorControls.getRandomColor(ballsCheckbox.checked),
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 2 * Math.PI,
            Number(size.value) * canvas.width / 800,  //because standard canvas.width is nearly 800px
            Number(speed.value));

        if (ballsCheckbox.checked) {
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
        }

        ballPool.push(ball);
    }

    ballPairs = [];
    for (let i = 0; i < ballPool.length; i++) {
        for (let j = i + 1; j < ballPool.length; j++) {
            let smallArr = [ballPool[i], ballPool[j]];
            ballPairs.push(smallArr);
        }
    }
}


window.onload = createBalls;

function gameLoop() {
    context.reset();

    if (ballsCheckbox.checked) {
        for (let [ball1, ball2] of ballPairs) {
            Ball.resolveBallCollision(ball1, ball2);
        }
    }

    for (let ball of ballPool) {
        ball.resolveWallCollision();
        ball.move();
        ball.draw();
    }
}


setInterval(gameLoop, 17); // 17 = 1000/60 = 60 frames/s






