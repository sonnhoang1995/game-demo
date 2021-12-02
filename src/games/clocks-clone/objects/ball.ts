interface IImageConstructor {
    scene: Phaser.Scene;
    x: number;
    y: number;
    texture: string | Phaser.Textures.Texture;
    frame?: string | number;
}

import Phaser from "phaser";

export class Ball extends Phaser.GameObjects.Image {
    private speed!: number;

    constructor(aParams: IImageConstructor) {
        super(
            aParams.scene,
            aParams.x,
            aParams.y,
            aParams.texture,
            aParams.frame
        );

        this.initVariables();
        this.initImage();
        this.initPhysics();
        this.scene.add.existing(this);
    }

    private initVariables() {
        this.speed = 600;
    }

    private initImage() {
        this.setVisible(false);
    }

    private initPhysics() {
        this.scene.physics.world.enable(this);
        (this.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);
        (this.body as Phaser.Physics.Arcade.Body).onWorldBounds = true;
    }

    public getSpeed(): number {
        return this.speed;
    }
}
