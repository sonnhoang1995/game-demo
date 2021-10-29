import { GameObject } from "./GameObject";
import { IGameObject } from "./type";

export class Player extends GameObject {
    height: number;
    width: number;
    isJumping: boolean;
    jumpLimit: number;
    constructor(iGameObject: IGameObject) {
        super(iGameObject);

        this.height = 50;
        this.width = 25;
        this.isJumping = false;
        this.jumpLimit = 225;
    }

    update(elapsedTime: number) {
        if (this.isJumping) this.y += this.vy * elapsedTime;

        if (this.y < this.jumpLimit) this.vy = -this.vy;

        if (this.y > 350) {
            this.isJumping = false;
            this.vy = -this.vy;
        }

        this.y = this.y > 350 ? 350 : this.y;
    }

    render() {
        this.context.fillStyle = "black";
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }
}
