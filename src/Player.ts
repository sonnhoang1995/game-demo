import { GameObject } from "./GameObject";
import { IGameObject } from "./type";

export class Player extends GameObject {
    height: number;
    width: number;
    isJumping: boolean;
    jumpLimit: number;
    isDucking: boolean;
    canDuck: boolean;
    constructor(iGameObject: IGameObject) {
        super(iGameObject);

        this.height = 50;
        this.width = 25;
        this.isJumping = false;
        this.jumpLimit = 225;
        this.isDucking = false;
        this.canDuck = true;
    }

    update(elapsedTime: number) {
        this.jump(elapsedTime);
        this.duck();
    }

    jump(elapsedTime: number) {
        this.y = this.y > 350 ? 350 : this.y;

        if (this.isJumping) {
            this.y += this.vy * elapsedTime;
            this.canDuck = false;
        }

        if (this.y < this.jumpLimit) this.vy = -this.vy;

        if (this.y > 350) {
            this.isJumping = false;
            this.canDuck = true;
            this.vy = -this.vy;
        }
    }

    duck() {
        if (this.isDucking && this.canDuck && !this.isJumping) {
            this.height = 20;
            this.y = 380;
        } else {
            this.height = 50;
        }
    }

    render() {
        this.context.fillStyle = "black";
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }
}
