
export class Background extends Phaser.GameObjects.TileSprite {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        width: number,
        height: number,
        textureKey: string
    ) {
        super(scene, x, y, width, height, textureKey);
        scene.add.existing(this)
    }

    update() {
       this.tilePositionX += 2;
    }
}
