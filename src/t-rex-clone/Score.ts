import { TextRenderer } from "../simple-engine/renderer/TextRenderer";
import { ITextObject } from "../simple-engine/utils/type";

export class Score {
    renderer: TextRenderer;
    textObject: ITextObject;

    constructor(textObject: ITextObject) {
        this.textObject = textObject;
        this.renderer = new TextRenderer(this.textObject);
    }

    increaseScore() {
        this.textObject.value++;
    }

    render() {
        this.renderer.textRenderer();
    }
}
