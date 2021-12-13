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

    public onHitByBall(): void {
        this.scene.add.tween({
            targets: this,
            alpha: {
                value: 0.3,
                ease: "EaseOut"
            },
            y: this.y + 30,
            // ease: "EaseOut",
            duration: 500,
            yoyo: false,
            onComplete: () => {
                this.destroy();
            }
        });
    }
}
