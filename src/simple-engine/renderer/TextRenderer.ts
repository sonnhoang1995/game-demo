import { ITextObject } from "../utils/type";

export class TextRenderer {
    textObject: ITextObject;
    constructor(textObject: ITextObject) {
        this.textObject = textObject;
    }

    textRenderer() {
        this.textObject.context.fillStyle = "black";
        this.textObject.context.font = "25px Arial";
        this.textObject.context.textAlign = "center";
        this.textObject.context.fillText(
            `${this.textObject.text}: ${this.textObject.value}`,
            this.textObject.x,
            this.textObject.y
        );
    }
}
