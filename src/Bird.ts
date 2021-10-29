import { Enemy } from "./Enemy";
import { IGameObject } from "./type";

export class Bird extends Enemy {
    height: number;
    width: number;
    constructor(iGameObject: IGameObject) {
        super(iGameObject);

        this.height = 25;
        this.width = 25;
    }

    render() {
        this.context.fillStyle = "red";
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }
}
