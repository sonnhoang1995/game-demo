import { GameObject } from "./GameObject";
import { IGameObject } from "./type";
import BackgroundSprite from "./assets/images/backgroundsprite.png";

export class Background extends GameObject {
    static sprite: HTMLImageElement;
    height: number;
    width: number;
    speed: number = 2;
    constructor(iGameObject: IGameObject) {
        super(iGameObject);

        this.height = 400;
        this.width = 1000;

        this.loadImage();
    }

    update(elapsedTime: number) {}

    loadImage() {
        Background.sprite = new Image();

        Background.sprite.src = BackgroundSprite;
    }

    render() {
        this.x -= this.speed;
        this.context.drawImage(Background.sprite, this.x, this.y);
        this.context.drawImage(Background.sprite, this.x - this.width, this.y);
        if (this.x < 0) this.x = 1000;
    }
}
