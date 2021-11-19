import "./style.scss";

import "normalize.css/normalize.css";

import EyeLine from "./elements/EyeLine";
import randomRGBA from "./utils/randomRGBA";
import gradientGenerator from "./utils/gradientGenerator";
import config from "./config/config";
const canvas: HTMLCanvasElement | null = document.querySelector(".main-canvas")
  ? document.querySelector(".main-canvas")
  : null;
let canvasWidth = window.innerWidth * window.devicePixelRatio;
let canvasHeight = window.innerHeight * window.devicePixelRatio;
let ctx: CanvasRenderingContext2D | null;
if (canvas) {
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  ctx = canvas.getContext("2d");
}

let time = 0;
let vesselsNumber = 0;
let scale = 0;
let colors = [];
let points: EyeLine[] = [];

const update = (past: any, now = performance.now()) => {
  const last = past || now;
  let d = (now - last) * (60 / 1000); // normalize at 144fps
  time += d * 0.01;

  ctx?.save();
  ctx?.translate(canvasWidth / 2, canvasHeight / 2);
  if (time < 3) {
    points.map((point) => point.update(time));
    requestAnimationFrame(() => update(now));
  }
  ctx?.beginPath();
  ctx!.fillStyle = "black";
  ctx?.arc(0, 0, config.pupilDiameter, 0, Math.PI * 2, true);
  ctx?.fill();
  ctx?.closePath();
  ctx?.restore();
};

const init = () => {
  ctx?.clearRect(0, 0, canvasWidth, canvasHeight);
  time = 0;
  vesselsNumber = config.vesselsNumber;
  scale = 0;
  colors = gradientGenerator(randomRGBA(), randomRGBA(), vesselsNumber);
  points = [];
  for (let x = 0; x < vesselsNumber; x++) {
    scale = config.pupilDiameter + time * config.pupilDiameter;
    points.push(
      new EyeLine(
        Math.cos(0) * scale,
        Math.sin(0) * scale,
        config.vesselsSize,
        ctx,
        colors[x],
        scale,
        vesselsNumber,
        x
      )
    );
  }
  requestAnimationFrame(() => update(performance.now()));
};

window.addEventListener("click", () => {
  init();
});
window.addEventListener("resize", () => {
  canvasWidth = window.innerWidth * window.devicePixelRatio;
  canvasHeight = window.innerHeight * window.devicePixelRatio;
  if (canvas) {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  }
});

init();
