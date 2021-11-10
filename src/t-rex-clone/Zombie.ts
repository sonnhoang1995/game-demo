import { IGameObject } from "../simple-engine/utils/type";
import ZombieSprite from "../assets/sprites/zombiesprite.png";
import { IAnimationObjectRenderer } from "../simple-engine/utils/type";
import { ImageLoader } from "../simple-engine/image-loader/ImageLoader";
import { ImageRenderer } from "../simple-engine/renderer/ImageRenderer";

export class Zombie implements IGameObject {
    height: number;
    width: number;
    animationObject: IAnimationObjectRenderer;
    renderer: ImageRenderer;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    x: number;
    y: number;
    vx: number;
    vy: number;
    constructor(gameObject: IGameObject, canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = gameObject.context;
        this.x = gameObject.x;
        this.y = gameObject.y;
        this.vx = gameObject.vx;
        this.vy = gameObject.vy;
        this.height = 75;
        this.width = 50;
        this.animationObject = {
            x: this.x,
            y: this.y,
            radius: 50
        };
        const imageLoader = new ImageLoader();
        const spriteSheet = imageLoader.load([
            { name: "zombiesprite", url: ZombieSprite }
        ]).src;
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
        this.renderer.x += this.vx * elapsedTime;
        this.x += this.vx * elapsedTime;
    }

    render() {
        this.renderer.animationObjectRenderer();
    }
}
