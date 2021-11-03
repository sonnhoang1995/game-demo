import { Enemy } from "./Enemy";
import { IGameObject } from "./type";
import ZombieSprite from './assets/sprites/zombiesprite.png';

export class Zombie extends Enemy {
    static numColumns: number = 3;
    static numRows: number = 2;
    static frameWidth: number = 0;
    static frameHeight: number = 0;
    static sprite: HTMLImageElement;
    currentFrame: number = 0;
    radius: number = 50;
    safeFrame: number = 0;
    height: number;
    width: number;
    constructor(iGameObject: IGameObject) {
        super(iGameObject);
        
        this.height = 75
        this.width = 40;
        
        this.loadImage();
    }

    loadImage() {
        if (!Zombie.sprite) {
            Zombie.sprite = new Image();
            Zombie.sprite.src = ZombieSprite;
            Zombie.sprite.onload = () => {
                Zombie.frameWidth = Zombie.sprite.width / Zombie.numColumns;
                Zombie.frameHeight = Zombie.sprite.height / Zombie.numRows;
            };
        }
    }
    
    render() {
        this.safeFrame++;
        let maxFrame = 5;
        if (this.currentFrame > maxFrame) {
            this.currentFrame = 0;
        }

        if (this.safeFrame > 60) {
            this.safeFrame = 0;
        }

        let column = this.currentFrame % Zombie.numColumns;
        let row = Math.floor(this.currentFrame / Zombie.numColumns);

        this.context.drawImage(
            Zombie.sprite,
            column * Zombie.frameWidth,
            row * Zombie.frameHeight,
            Zombie.frameWidth,
            Zombie.frameHeight,
            this.x - this.radius,
            this.y - this.radius - this.radius * 0.4,
            this.radius * 2,
            this.radius * 2.42
        );

        if (this.safeFrame % 5 == 0) this.currentFrame++;
    }
}
