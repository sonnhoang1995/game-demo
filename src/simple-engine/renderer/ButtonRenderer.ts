import { IRectangleObject } from "../utils/type";

export class ButtonRenderer {
    rectangleObject: IRectangleObject;
    constructor(rectangleObject: IRectangleObject) {
        this.rectangleObject = rectangleObject;
    }

    rectangleRenderer() {
        let textString = "Restart";
        let textWidth = this.rectangleObject.context.measureText(textString).width;
        this.rectangleObject.context.beginPath();
        this.rectangleObject.context.rect(
            this.rectangleObject.x,
            this.rectangleObject.y,
            this.rectangleObject.width,
            this.rectangleObject.height
        );
        this.rectangleObject.context.fillStyle = "#FFFFFF";
        this.rectangleObject.context.fillStyle = "rgba(225,225,225,0.5)";
        this.rectangleObject.context.fillRect(
            this.rectangleObject.x,
            this.rectangleObject.y,
            this.rectangleObject.width,
            this.rectangleObject.height
        );
        this.rectangleObject.context.fill();
        this.rectangleObject.context.lineWidth = 2;
        this.rectangleObject.context.strokeStyle = "#000000";
        this.rectangleObject.context.stroke();
        this.rectangleObject.context.closePath();
        this.rectangleObject.context.font = "24pt Kremlin Pro Web";
        this.rectangleObject.context.fillStyle = "#000000";
        this.rectangleObject.context.fillText(
            textString,
            (750/2) - (textWidth/2), // replace 750 with canvas.width
            (400/2) + 12 // replace 400 with canvas.height -- 12 == font / 2
        );
    }
}
