interface ICursorConstructor {
    scene: Phaser.Scene;
    x: number;
    y: number;
    texture: string;
    alpha?: number;
    frame?: string | number;
    cursorStartPosition: any;
}

import Phaser from "phaser";
import { CONST } from "../const/const";

export class Cursor extends Phaser.GameObjects.Image {
    private currentPosition: [number, number];
    private activated!: boolean;

    constructor(aParams: ICursorConstructor) {
        super(
            aParams.scene,
            aParams.x,
            aParams.y,
            aParams.texture,
            aParams.cursorStartPosition
        );

        this.currentPosition = aParams.cursorStartPosition;
        this.initVariables();
        this.initImage();

        this.scene.add.existing(this);
    }

    private initVariables(): void {
        this.activated = false;
    }

    private initImage(): void {
        this.setOrigin(0, 0);
    }

    public moveTo(x: number, y: number): void {
        this.currentPosition = [x, y];
        this.setPosition(x * CONST.tileSize, y * CONST.tileSize);
    }

    public getX(): number {
        return this.currentPosition[0];
    }

    public getY(): number {
        return this.currentPosition[1];
    }

    public isActivated(): boolean {
        return this.activated;
    }

    public setActivated(): void {
        this.activated = !this.activated;
    }
}
