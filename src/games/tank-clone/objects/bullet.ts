import Phaser from "phaser";

interface IBulletConstructor {
    scene: Phaser.Scene;
    rotation: number;
    x: number;
    y: number;
    texture: string;
    frame?: string | number;
}

export class Bullet extends Phaser.GameObjects.Image {
    body!: Phaser.Physics.Arcade.Body;

    private bulletSpeed!: number;
    private tankShootSound: Phaser.Sound.BaseSound;

    constructor(aParams: IBulletConstructor, isHaveSound: boolean) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture);

        this.tankShootSound = this.scene.sound.add("tankShoot");
        if (isHaveSound && this.scene.registry.values.isSoundEnable) {
            this.tankShootSound.play({
                volume: 0.1
            });
        }
        this.rotation = aParams.rotation;
        this.initImage();
        this.scene.add.existing(this);
    }

    private initImage(): void {
        // variables
        this.bulletSpeed = 1000;

        // image
        this.setOrigin(0.5, 0.5);
        this.setDepth(2);

        // physics
        this.scene.physics.world.enable(this);
        this.scene.physics.velocityFromRotation(
            this.rotation - Math.PI / 2,
            this.bulletSpeed,
            this.body.velocity
        );
    }

    update(): void {}
}
