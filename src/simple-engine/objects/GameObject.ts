import { IGameObject } from "../utils/type";
import { ImageObject } from "./ImageObject";

export class GameObject extends ImageObject implements IGameObject {
    vx: number;
    vy: number;

    constructor(gameObject: IGameObject) {
        super(gameObject);
        this.context = gameObject.context;
        this.x = gameObject.x;
        this.y = gameObject.y;
        this.vx = gameObject.vx;
        this.vy = gameObject.vy;
        this.width = gameObject.width;
        this.height = gameObject.height;
        this.image = gameObject.image;
    }

    update(elapsedTime: number) {}

    render() {}
}
