import { Ball } from "./Ball.js";

let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");

let ball = new Ball(context, 150, 300, Math.PI / 5);


function gameLoop() {
    context.reset();
    ball.animate();
    ball.draw();
}


setInterval(gameLoop, 17);






