import { IGameObject } from "../utils/type";

export class GameObject implements IGameObject {
    context: CanvasRenderingContext2D;
    x: number;
    y: number;
    vx: number;
    vy: number;

    constructor(gameObject: IGameObject) {
        this.context = gameObject.context;
        this.x = gameObject.x;
        this.y = gameObject.y;
        this.vx = gameObject.vx;
        this.vy = gameObject.vy;
    }
}
