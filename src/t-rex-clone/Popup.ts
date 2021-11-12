import { Renderer } from "../simple-engine/renderer/Renderer";
import { IButtonObject } from "../simple-engine/utils/type";

export class Popup {
    renderer: Renderer;
    buttonObject: IButtonObject;

    constructor(buttonObject: IButtonObject) {
        this.buttonObject = buttonObject;
        this.renderer = new Renderer();
    }

    render() {
        this.renderer.buttonRenderer(this.buttonObject);
    }
}
