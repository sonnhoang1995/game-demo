import { TextObject } from "../simple-engine/objects/TextObject";
import { Renderer } from "../simple-engine/renderer/Renderer";
import { ITextObject } from "../simple-engine/utils/type";

export class Score extends TextObject{
    renderer: Renderer;
    textObject: ITextObject;

    constructor(textObject: ITextObject) {
        super(textObject);
        this.textObject = textObject;
        this.renderer = new Renderer();
    }

    increaseScore() {
        this.textObject.value++;
    }

    render() {
        this.renderer.textRenderer(this.textObject);
    }
}
