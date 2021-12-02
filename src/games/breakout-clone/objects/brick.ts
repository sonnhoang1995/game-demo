export interface IRectangleConstructor {
    scene: Phaser.Scene;
    x: number;
    y: number;
    width?: number;
    height?: number;
    fillColor?: number;
    fillAlpha?: number;
}

import Phaser from "phaser";

export class Brick extends Phaser.GameObjects.Rectangle {
    constructor(aParams: IRectangleConstructor) {
        super(
            aParams.scene,
            aParams.x,
            aParams.y,
            aParams.width,
            aParams.height,
            aParams.fillColor,
            aParams.fillAlpha
        );

        this.initRectangle();
        this.initPhysics();
        this.scene.add.existing(this);
    }

    private initRectangle(): void {
        this.setOrigin(0);
    }

    private initPhysics(): void {
        this.scene.physics.world.enable(this);
        (this.body as Phaser.Physics.Arcade.Body).setImmovable(true);
    }
}
