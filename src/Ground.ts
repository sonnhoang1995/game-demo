import { GameObject } from "./GameObject";
import { IGameObject } from "./type";

export class Ground extends GameObject {
    height: number;
    width: number;
    constructor(iGameObject: IGameObject) {
        super(iGameObject);

        this.height = 0;
        this.width = 750;
    }
    
    update(elapsedTime: number) {
    }

    render() {
        this.context.fillStyle = 'black';
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }
}
