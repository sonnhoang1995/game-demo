import { Enemy } from "./Enemy";
import { IGameObject } from "./type";

export class Cactus extends Enemy {
    height: number;
    width: number;
    constructor(iGameObject: IGameObject) {
        super(iGameObject);

        this.height = 75;
        this.width = 25;
    }

    render() {
        this.context.fillStyle = "green";
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }
}
