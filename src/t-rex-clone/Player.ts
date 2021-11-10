import { GameObject } from "../simple-engine/objects/GameObject";
import { IGameObject } from "../simple-engine/utils/type";
import RunningSprite from "../assets/sprites/runningsprite.png";
import JumpingSprite from "../assets/sprites/jumpingsprite.png";
import SlidingSprite from "../assets/sprites/slidingsprite.png";
import { InputHandler } from "../simple-engine/input-handler/InputHandler";
import { ImageLoader } from "../simple-engine/image-loader/ImageLoader";
import { ImageRenderer } from "../simple-engine/renderer/ImageRenderer";
import { IAnimationObjectRenderer } from "../simple-engine/utils/type";

export class Player extends GameObject {
    jumpingSprite: HTMLImageElement;
    slidingSprite: HTMLImageElement;
    runningSprite: HTMLImageElement;
    radius: number = 50;
    height: number;
    width: number;
    isJumping: boolean;
    jumpLimit: number = 225;
    isDucking: boolean;
    canDuck: boolean;
    canvas: HTMLCanvasElement;
    renderer: ImageRenderer;
    animationObject: IAnimationObjectRenderer;
    imageLoader: ImageLoader;
    userInput: () => void;

    constructor(iGameObject: IGameObject, canvas: HTMLCanvasElement, userInput: () => void) {
        super(iGameObject);

        this.userInput = userInput;
        this.height = 75;
        this.width = 50;
        this.isJumping = false;
        this.isDucking = false;
        this.canDuck = true;
        this.canvas = canvas;
        this.animationObject = {
            x: this.x,
            y: this.y,
            radius: this.radius
        };
        this.imageLoader = new ImageLoader();
        const spriteSheet = this.imageLoader.load([
            { name: "runningsprite", url: RunningSprite },
            { name: "jumpingsprite", url: JumpingSprite },
            { name: "slidingsprite", url: SlidingSprite }
        ]).src;
        this.jumpingSprite = this.imageLoader.getImage("jumpingsprite")!.src;
        this.slidingSprite = this.imageLoader.getImage("slidingsprite")!.src;
        this.runningSprite = this.imageLoader.getImage("runningsprite")!.src;
        this.renderer = new ImageRenderer(
            this.canvas,
            this.context,
            spriteSheet,
            this.x,
            this.y,
            3,
            2,
            50
        );
    }

    update(elapsedTime: number) {
        if (this.runningSprite) this.renderNewSprite(this.runningSprite);
        this.jump(elapsedTime);
        this.duck();
    }

    jump(elapsedTime: number) {
        this.renderer.y = this.renderer.y > 350 ? 350 : this.renderer.y;
        this.y = this.renderer.y > 350 ? 350 : this.renderer.y;

        if (this.isJumping) {
            if (this.jumpingSprite) this.renderNewSprite(this.jumpingSprite);
            this.renderer.y += this.vy * elapsedTime;
            this.y += this.vy * elapsedTime;
            this.canDuck = false;

            if (this.renderer.y < this.jumpLimit) this.vy = -this.vy;

            if (this.renderer.y > 350) {
                this.isJumping = false;
                this.canDuck = true;
                this.vy = -this.vy;
                if (this.runningSprite)
                    this.renderNewSprite(this.runningSprite);
            }
        }
    }

    duck() {
        if (this.isDucking && this.canDuck && !this.isJumping) {
            if (this.slidingSprite) this.renderNewSprite(this.slidingSprite);
            this.height = 50;
        }
    }

    render() {
        this.renderer.animationObjectRenderer();
    }

    renderNewSprite(spriteSheet: HTMLImageElement) {
        this.renderer.image = spriteSheet;
    }
}
