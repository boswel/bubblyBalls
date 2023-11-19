import { Ball } from "./Ball.js";

let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");


let ball = new Ball(context, Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2 * Math.PI);


function gameLoop() {
    context.reset();
    ball.animate();
    ball.draw();
}


setInterval(gameLoop, 17);






