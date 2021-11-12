import { ImageLoader } from "../simple-engine/image-loader/ImageLoader";
import { GameObject } from "../simple-engine/objects/GameObject";
import { Renderer } from "../simple-engine/renderer/Renderer";
import { IGameObject, ISpriteSheetObject } from "../simple-engine/utils/type";

export class Player extends GameObject {
    radius: number = 50;
    isJumping: boolean;
    jumpLimit: number = 225;
    isDucking: boolean;
    canDuck: boolean;
    renderer: Renderer;
    spriteSheetObject: ISpriteSheetObject;
    spriteSheetNumRows: number = 2;
    spriteSheetNumColumns: number = 3;
    userInput: () => void;

    constructor(
        iGameObject: IGameObject,
        userInput: () => void
    ) {
        super(iGameObject);

        this.userInput = userInput;
        this.isJumping = false;
        this.isDucking = false;
        this.canDuck = true;
       
        this.spriteSheetObject = {
            context: this.context,
            x: this.x,
            y: this.y,
            width: this.image.width,
            height: this.image.height,
            frameWidth: this.image.width / this.spriteSheetNumColumns,
            frameHeight: this.image.height / this.spriteSheetNumRows,
            numColumns: this.spriteSheetNumColumns,
            numRows: this.spriteSheetNumRows,
            radius: 50,
            image: this.image
        };
        this.renderer = new Renderer();
    }

    update(elapsedTime: number) {
        this.renderNewSprite("runningsprite");
        this.jump(elapsedTime);
        this.duck();
    }

    jump(elapsedTime: number) {
        this.spriteSheetObject.y =
            this.spriteSheetObject.y > 350 ? 350 : this.spriteSheetObject.y;

        if (this.isJumping) {
            this.renderNewSprite("jumpingsprite");
            this.spriteSheetObject.y += this.vy * elapsedTime;
            this.canDuck = false;

            if (this.spriteSheetObject.y < this.jumpLimit) this.vy = -this.vy;

            if (this.spriteSheetObject.y > 350) {
                this.isJumping = false;
                this.canDuck = true;
                this.vy = -this.vy;
                this.renderNewSprite("runningsprite");
            }
        }
    }

    duck() {
        if (this.isDucking && this.canDuck && !this.isJumping) {
            this.renderNewSprite("slidingsprite");
            this.height = 50;
        }
    }

    render() {
        this.renderer.spriteSheetRenderer(this.spriteSheetObject);
    }

    renderNewSprite(spriteName: string) {
        const newSprite = ImageLoader.getImage(spriteName);
        if (newSprite) this.spriteSheetObject.image = newSprite.src;
    }
}
