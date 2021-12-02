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

export class Ball extends Phaser.GameObjects.Rectangle {
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
        this.width = 10;
        this.height = 10;
        this.setFillStyle(0xffffff);
    }

    private initPhysics(): void {
        this.scene.physics.world.enable(this);
        (this.body as Phaser.Physics.Arcade.Body).setBounce(1, 1);
        (this.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds();
    }

    public applyInitVelocity(): void {
        (this.body as Phaser.Physics.Arcade.Body).setVelocity(
            Phaser.Math.RND.between(-200, 200),
            200
        );
        (this.body as Phaser.Physics.Arcade.Body).speed = 800;
    }
}
