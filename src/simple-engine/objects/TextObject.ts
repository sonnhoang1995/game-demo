import { ITextObject } from "../utils/type";

export class TextObject implements ITextObject {
    context: CanvasRenderingContext2D;
    x: number;
    y: number;
    text: string;
    value: number;
    align: CanvasTextAlign;
    fontStyle: string;
    fontSize: number;
    color: string;

    constructor(textObject: ITextObject) {
        this.context = textObject.context;
        this.x = textObject.x;
        this.y = textObject.y;
        this.text = textObject.text;
        this.value = textObject.value;
        this.align = textObject.align;
        this.fontStyle = textObject.fontStyle;
        this.fontSize = textObject.fontSize;
        this.color = textObject.color;
    }
}
