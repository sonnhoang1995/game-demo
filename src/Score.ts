import { Enemy } from "./Enemy";
import { Player } from "./Player";

export class Score {
    context: CanvasRenderingContext2D;
    x: number;
    y: number;
    value: number;
    constructor(
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        value: number
    ) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.value = value;
    }

    increaseScore() {
        this.value++;
    }

    render() {
        this.context.fillStyle = "black";
        this.context.font = "25px Arial";
        this.context.textAlign = "center";
        this.context.fillText(`Score: ${this.value}`, this.x, this.y);
    }
}
