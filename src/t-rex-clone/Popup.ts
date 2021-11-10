import { ButtonRenderer } from "../simple-engine/renderer/ButtonRenderer";
import { IRectangleObject } from "../simple-engine/utils/type";

export class Popup {
    renderer: ButtonRenderer;
    rectangleObject: IRectangleObject;

    constructor(rectangleObject: IRectangleObject) {
        this.rectangleObject = rectangleObject;
        this.renderer = new ButtonRenderer(this.rectangleObject);
    }

    render() {
        this.renderer.rectangleRenderer();
    }
}
