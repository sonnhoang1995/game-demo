interface IImageConstructor {
    scene: Phaser.Scene;
    x: number;
    y: number;
    texture: string;
    frame?: string | number;
}
import Phaser from "phaser";

export class Pipe extends Phaser.GameObjects.Image {
    constructor(aParams: IImageConstructor) {
        super(
            aParams.scene,
            aParams.x,
            aParams.y,
            aParams.texture,
            aParams.frame
        );

        // image
        this.setScale(3);
        this.setOrigin(0, 0);

        // physics
        this.scene.physics.world.enable(this);
        (this.body as Phaser.Physics.Arcade.Body).allowGravity = false;
        (this.body as Phaser.Physics.Arcade.Body).setVelocityX(-200);
        (this.body as Phaser.Physics.Arcade.Body).setSize(20, 20);

        this.scene.add.existing(this);
    }
}
