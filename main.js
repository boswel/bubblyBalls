import { Ball } from './Ball.js'

let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
let slides = document.querySelectorAll('input');

for (let slide of slides) {
    slide.addEventListener('change', createBalls);
}

function getColorPropSlides(colorProp) {
    let selector = 'input.' + colorProp;
    return document.querySelectorAll(selector);
}

function calculateRangeValues(colorProp) {
    let slides = getColorPropSlides(colorProp); // Q: I am overwriting global slides but this stays within the scope of calculateRangeValues, right? problem?

    let min = slides[0].value < slides[1].value ? +slides[0].value : +slides[1].value;
    let diff = Math.abs(slides[0].value - slides[1].value);

    return { diff: diff, min: min }
}

function getRandomColor() {
    let hue = Math.floor(Math.random() * calculateRangeValues('hue')['diff']) + calculateRangeValues('hue')['min'];
    let saturation = Math.floor(Math.random() * calculateRangeValues('saturation')['diff']) + calculateRangeValues('saturation')['min'];
    let lightness = Math.floor(Math.random() * calculateRangeValues('lightness')['diff']) + calculateRangeValues('lightness')['min'];

    return 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)';
}

let ballPool = [];

function createBalls() {
    ballPool = [];      // Q
    for (let i = 0; i < 100; i++) {
        let ball = new Ball(context, getRandomColor(), Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2 * Math.PI);
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






