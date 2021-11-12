import { GameObject } from "../simple-engine/objects/GameObject";
import { Renderer } from "../simple-engine/renderer/Renderer";
import { IGameObject, ISpriteSheetObject } from "../simple-engine/utils/type";

export class Zombie extends GameObject {
    renderer: Renderer;
    spriteSheetObject!: ISpriteSheetObject;
    vx: number;
    vy: number;
    spriteSheetNumColumns: number = 3;
    spriteSheetNumRows: number = 2;
    constructor(gameObject: IGameObject) {
        super(gameObject);

        this.vx = gameObject.vx;
        this.vy = gameObject.vy;

        this.spriteSheetObject = {
            context: this.context,
            x: this.x,
            y: this.y,
            imageWidth: this.imageWidth,
            imageHeight: this.imageHeight,
            frameWidth: this.imageWidth / this.spriteSheetNumColumns,
            frameHeight: this.imageHeight / this.spriteSheetNumRows,
            numColumns: this.spriteSheetNumColumns,
            numRows: this.spriteSheetNumRows,
            radius: 50,
            image: this.image
        };
       
        this.renderer = new Renderer();
    }

    update(elapsedTime: number) {
        if (this.spriteSheetObject)
            this.spriteSheetObject.x += this.vx * elapsedTime;
    }

    render() {
        if (this.spriteSheetObject)
            this.renderer.spriteSheetRenderer(this.spriteSheetObject);
    }
}
