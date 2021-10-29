import { IGameObject } from "./type";

export class GameObject implements IGameObject {
    context: CanvasRenderingContext2D;
    x: number;
    y: number;
    vx: number;
    vy: number;
    colliding: boolean;
    constructor(gameObject: IGameObject) {
        this.context = gameObject.context;
        this.x = gameObject.x;
        this.y = gameObject.y;
        this.vx = gameObject.vx;
        this.vy = gameObject.vy;
        this.colliding = false;
    }
    update(elapsedTime: number) {}

    render() {}
}
