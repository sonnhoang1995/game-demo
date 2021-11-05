import { GameObject } from "./GameObject";
import { IGameObject } from "./type";
import RunningSprite from "./assets/sprites/runningsprite.png";
import JumpingSprite from "./assets/sprites/jumpingsprite.png";
import SlidingSprite from "./assets/sprites/slidingsprite.png";

export class Player extends GameObject {
    static numColumns: number = 3;
    static numRows: number = 2;
    static frameWidth: number = 0;
    static frameHeight: number = 0;
    static sprite: HTMLImageElement;
    jumpingSprite: HTMLImageElement;
    slidingSprite: HTMLImageElement;
    runningSprite: HTMLImageElement;
    currentFrame: number = 0;
    radius: number = 50;
    safeFrame: number = 0;
    height: number;
    width: number;
    isJumping: boolean;
    jumpLimit: number;
    isDucking: boolean;
    canDuck: boolean;
    constructor(iGameObject: IGameObject) {
        super(iGameObject);

        this.height = 75;
        this.width = 50;
        this.isJumping = false;
        this.jumpLimit = 225;
        this.isDucking = false;
        this.canDuck = true;
        this.jumpingSprite = new Image();
        this.jumpingSprite.src = JumpingSprite;
        this.slidingSprite = new Image();
        this.slidingSprite.src = SlidingSprite;
        this.runningSprite = new Image();
        this.runningSprite.src = RunningSprite;
        this.loadImage();
    }

    update(elapsedTime: number) {
        Player.sprite = this.runningSprite;
        this.jump(elapsedTime);
        this.duck();
    }

    jump(elapsedTime: number) {
        this.y = this.y > 350 ? 350 : this.y;

        if (this.isJumping) {
            Player.sprite = this.jumpingSprite;
            this.y += this.vy * elapsedTime;
            this.canDuck = false;

            if (this.y < this.jumpLimit) this.vy = -this.vy;

            if (this.y > 350) {
                this.isJumping = false;
                this.canDuck = true;
                this.vy = -this.vy;
                Player.sprite = this.runningSprite;
            }
        }
    }

    duck() {
        if (this.isDucking && this.canDuck && !this.isJumping) {
            Player.sprite = this.slidingSprite;
            this.height = 50;
        }
    }

    loadImage() {
        if (!Player.sprite) {
            Player.sprite = new Image();
            Player.sprite = this.runningSprite;
            Player.sprite.onload = () => {
                Player.frameWidth = Player.sprite.width / Player.numColumns;
                Player.frameHeight = Player.sprite.height / Player.numRows;
            };
        }
    }

    render() {
        this.safeFrame++;
        let maxFrame = 5;
        if (this.currentFrame > maxFrame) {
            this.currentFrame = 0;
        }

        if (this.safeFrame > 60) {
            this.safeFrame = 0;
        }

        let column = this.currentFrame % Player.numColumns;
        let row = Math.floor(this.currentFrame / Player.numColumns);

        this.context.drawImage(
            Player.sprite,
            column * Player.frameWidth,
            row * Player.frameHeight,
            Player.frameWidth,
            Player.frameHeight,
            this.x - this.radius,
            this.y - this.radius - this.radius * 0.4,
            this.radius * 2,
            this.radius * 2.42
        );

        if (this.safeFrame % 5 == 0) this.currentFrame++;
    }
}
