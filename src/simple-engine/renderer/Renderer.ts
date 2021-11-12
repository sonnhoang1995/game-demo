import { IBackgroundObject, IButtonObject, ISpriteSheetObject, ITextObject } from "../utils/type";

export class Renderer {
    safeFrame: number = 0;
    currentFrame: number = 0;

    constructor() {}

    spriteSheetRenderer(spriteSheet: ISpriteSheetObject) {
        this.safeFrame++;
        let maxFrame = 5;
        if (this.currentFrame > maxFrame) {
            this.currentFrame = 0;
        }

        if (this.safeFrame > 60) {
            this.safeFrame = 0;
        }

        let column = this.currentFrame % spriteSheet.numColumns;
        let row = Math.floor(this.currentFrame / spriteSheet.numColumns);

        spriteSheet.context.drawImage(
            spriteSheet.image,
            column * spriteSheet.frameWidth,
            row * spriteSheet.frameHeight,
            spriteSheet.frameWidth,
            spriteSheet.frameHeight,
            spriteSheet.x - spriteSheet.radius,
            spriteSheet.y - spriteSheet.radius - spriteSheet.radius * 0.4,
            spriteSheet.radius * 2,
            spriteSheet.radius * 2.42
        );

        if (this.safeFrame % 5 == 0) this.currentFrame++;
    }

    backgroundRenderer(background: IBackgroundObject) {
        background.context.drawImage(
            background.image,
            background.x,
            background.y
        );
        background.context.drawImage(
            background.image,
            background.x - background.imageWidth,
            background.y
        );
    }

    textRenderer(textObject: ITextObject) {
        textObject.context.fillStyle = textObject.color;
        textObject.context.font = `${textObject.fontSize}px ${textObject.fontStyle}`;
        textObject.context.textAlign = `${textObject.align}`;
        textObject.context.fillText(
            `${textObject.text}: ${textObject.value}`,
            textObject.x,
            textObject.y
        );
    }

    buttonRenderer(buttonObject: IButtonObject) {
        let textWidth = buttonObject.context.measureText(buttonObject.text).width;
        buttonObject.context.beginPath();
        buttonObject.context.rect(
            buttonObject.x,
            buttonObject.y,
            buttonObject.width,
            buttonObject.height
        );
        buttonObject.context.fillStyle = buttonObject.backgroundColor;
        buttonObject.context.fillRect(
            buttonObject.x,
            buttonObject.y,
            buttonObject.width,
            buttonObject.height
        );
        buttonObject.context.fill();
        buttonObject.context.lineWidth = buttonObject.borderWidth;
        buttonObject.context.strokeStyle = buttonObject.borderColor;
        buttonObject.context.stroke();
        buttonObject.context.closePath();
        buttonObject.context.font = `${buttonObject.fontSize}pt ${buttonObject.fontStyle}`;
        buttonObject.context.fillStyle = buttonObject.textColor;
        buttonObject.context.fillText(
            buttonObject.text,
            (750/2) - (textWidth/2), // replace 750 with canvas.width
            (400/2) + (buttonObject.fontSize / 2) // replace 400 with canvas.height
        );
    }
}
