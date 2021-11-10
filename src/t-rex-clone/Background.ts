import BackgroundImage from "../assets/images/backgroundimage.png";
import { ImageLoader } from "../simple-engine/image-loader/ImageLoader";
import { ImageRenderer } from "../simple-engine/renderer/ImageRenderer";
import { IBackgroundRenderer } from "../simple-engine/utils/type";

export class Background {
    static sprite: HTMLImageElement;
    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;

    background: IBackgroundRenderer;
    renderer: ImageRenderer;

    constructor(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = context;
        this.background = { x: 0, y: -300, width: 1000, height: 400, speed: 2 };
        const imageLoader = new ImageLoader();
        const spriteSheet = imageLoader.load([
            { name: "backgroundimage", url: BackgroundImage }
        ]).src;
        this.renderer = new ImageRenderer(
            this.canvas,
            this.context,
            spriteSheet,
            0,
            -300
        );
    }

    render() {
        this.renderer.backgroundRenderer(this.background);
    }
}
