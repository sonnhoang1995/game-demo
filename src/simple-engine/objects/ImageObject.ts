import { IImageObject } from "../utils/type";

export class ImageObject implements IImageObject {
    context: CanvasRenderingContext2D;
    x: number;
    y: number;
    imageWidth: number;
    imageHeight: number;
    image: HTMLImageElement;
    constructor(imageObject: IImageObject) {
        this.context = imageObject.context;
        this.x = imageObject.x;
        this.y = imageObject.y;
        this.imageWidth = imageObject.imageWidth;
        this.imageHeight = imageObject.imageHeight;
        this.image = imageObject.image;
    }
}
