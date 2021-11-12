import { IImageObject } from "../utils/type";

export class ImageObject implements IImageObject {
    context: CanvasRenderingContext2D;
    x: number;
    y: number;
    width: number;
    height: number;
    image: HTMLImageElement;
    constructor(imageObject: IImageObject) {
        this.context = imageObject.context;
        this.x = imageObject.x;
        this.y = imageObject.y;
        this.width = imageObject.width;
        this.height = imageObject.height;
        this.image = imageObject.image;

        imageObject.image.onload = () => {
            this.width = imageObject.width;
            this.height = imageObject.height;
        }
    }
}
