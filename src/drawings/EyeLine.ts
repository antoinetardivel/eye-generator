import config from "../config/config";
import Easing from "../utils/Easing";
import SimplexNoise from "simplex-noise";
const simplex = new SimplexNoise();
export default class EyeLine {
  private x;
  private y;
  private size;
  private ctx;
  private opacity = 1;
  private color;
  private scale;
  private vessels;
  private index;
  constructor(
    x: number,
    y: number,
    size = 5,
    ctx: CanvasRenderingContext2D | null,
    color: number[],
    scale = 0,
    vessels: number,
    index: number
  ) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.ctx = ctx;
    this.opacity = 1;
    this.color = color;
    this.scale = scale;
    this.vessels = vessels;
    this.index = index;
  }
  private draw() {
    this.ctx?.save();
    this.ctx?.translate(this.x, this.y);
    this.ctx?.beginPath();
    this.ctx!.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.opacity})`;
    this.ctx?.arc(0, 0, this.size, 0, Math.PI * 2, true);
    this.ctx?.fill();
    this.ctx?.closePath();
    this.ctx?.restore();
  }

  public update(time: number) {
    let progress = this.index / this.vessels;
    let angle = 2 * Math.PI * progress;
    let frequency = 1;
    this.scale = config.pupilDiameter + time * config.pupilDiameter;
    let n = Easing.linear(
      simplex.noise3D(time, Math.sin(angle), this.index) * 20
    );
    this.x = Math.cos(angle) * this.scale + n * frequency;
    this.y = Math.sin(angle) * this.scale + n * frequency;
    this.opacity =
      1 -
      Math.pow(
        ((time * config.pupilDiameter) / 3 / config.pupilDiameter) * 2 - 1,
        4
      );
    this.draw();
    0.5;
  }
}
