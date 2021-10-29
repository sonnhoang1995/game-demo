import { GameObject } from "./GameObject";
import { IGameObject } from "./type";

export class Enemy extends GameObject {
    height: number;
    width: number;
    constructor(iGameObject: IGameObject) {
        super(iGameObject);

        this.height = 0;
        this.width = 0;
    }
    
    update(elapsedTime: number) {
        this.x += this.vx * elapsedTime;
    }

    render() {}
}
