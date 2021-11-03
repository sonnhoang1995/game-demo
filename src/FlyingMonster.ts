import { Enemy } from "./Enemy";
import { IGameObject } from "./type";
import FlyingMonsterSprite from "./assets/images/flyingmonstersprite.png";

export class FlyingMonster extends Enemy {
    static sprite: HTMLImageElement;
    height: number;
    width: number;
    constructor(iGameObject: IGameObject) {
        super(iGameObject);

        this.height = 50;
        this.width = 50;

        this.loadImage();
    }

    loadImage() {
        if (!FlyingMonster.sprite) {
            FlyingMonster.sprite = new Image();
            FlyingMonster.sprite.src = FlyingMonsterSprite;
        }
    }

    render() {
        this.context.drawImage(
            FlyingMonster.sprite,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}
