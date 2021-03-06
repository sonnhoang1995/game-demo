interface IImageConstructor {
    scene: Phaser.Scene;
    x: number;
    y: number;
    texture: string;
    frame?: string | number;
}

import Phaser from "phaser";

export class Tile extends Phaser.GameObjects.Image {
    constructor(aParams: IImageConstructor) {
        super(
            aParams.scene,
            aParams.x,
            aParams.y,
            aParams.texture,
            aParams.frame
        );

        // set image settings
        this.setOrigin(0, 0);
        this.setInteractive();

        this.scene.add.existing(this);
    }
}
