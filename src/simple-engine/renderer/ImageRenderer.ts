import { IBackgroundRenderer } from "../utils/type";

export class ImageRenderer {
    image: HTMLImageElement;
    safeFrame: number = 0;
    currentFrame: number = 0;
    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    frameWidth: number = 0;
    frameHeight: number = 0;
    x: number;
    y: number;
    numColumns?: number;
    numRows?: number;
    radius?: number;

    constructor(
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D,
        image: HTMLImageElement,
        x: number,
        y: number,
        // for sprite sheet
        numColumns?: number,
        numRows?: number,
        radius?: number
    ) {
        this.canvas = canvas;
        this.context = context;
        this.image = image;
        this.numColumns = numColumns;
        this.numRows = numRows;
        this.image.onload = () => {
            this.frameWidth = this.image.width / numColumns!;
            this.frameHeight = this.image.height / numRows!;
        };
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    animationObjectRenderer() {
        if (!this.radius) return;
        this.safeFrame++;
        let maxFrame = 5;
        if (this.currentFrame > maxFrame) {
            this.currentFrame = 0;
        }

        if (this.safeFrame > 60) {
            this.safeFrame = 0;
        }

        let column = this.currentFrame % this.numColumns!;
        let row = Math.floor(this.currentFrame / this.numColumns!);

        this.context.drawImage(
            this.image,
            column * this.frameWidth,
            row * this.frameHeight,
            this.frameWidth,
            this.frameHeight,
            this.x - this.radius,
            this.y - this.radius - this.radius * 0.4,
            this.radius * 2,
            this.radius * 2.42
        );

        if (this.safeFrame % 5 == 0) this.currentFrame++;
    }

    backgroundRenderer(background: IBackgroundRenderer) {
        background.x -= background.speed;
        this.context.drawImage(this.image, background.x, background.y);
        this.context.drawImage(
            this.image,
            background.x - background.width,
            background.y
        );
        if (background.x < 0) background.x = background.width;
    }

    clearCanvas(canvas: HTMLCanvasElement) {
        this.context.clearRect(0, 0, canvas.width, canvas.height);
    }
}
