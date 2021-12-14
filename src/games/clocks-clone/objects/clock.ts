interface IClockConstructor {
    scene: Phaser.Scene;
    x: number;
    y: number;
    texture: string;
    frame?: string | number;
    prefix: string;
}
import Phaser from "phaser";
import { CONST } from "../const/const";

export class Clock extends Phaser.GameObjects.Sprite {
    private face: Phaser.GameObjects.Sprite;
    private hand: Phaser.GameObjects.Sprite;

    constructor(aParams: IClockConstructor) {
        super(
            aParams.scene,
            aParams.x,
            aParams.y,
            aParams.texture,
            aParams.frame
        );

        // face sprite
        this.face = this.scene.add.sprite(
            aParams.x,
            aParams.y,
            aParams.prefix + "clockface"
        );
        this.face.setVisible(false);

        // hand sprite
        this.hand = this.scene.add.sprite(
            aParams.x,
            aParams.y,
            aParams.prefix + "hand"
        );

        this.hand.setTint(0xff6378);
        this.hand.setDepth(2);
        this.hand.setRotation(Phaser.Math.Angle.Random());
        this.scene.physics.world.enable(this.hand);

        const handBody = this.hand.body as Phaser.Physics.Arcade.Body;

        handBody.angularVelocity =
            Phaser.Math.RND.between(
                CONST.LEVELS[CONST.currentLevel].CLOCK_SPEED.MIN,
                CONST.LEVELS[CONST.currentLevel].CLOCK_SPEED.MAX
            ) * Phaser.Math.RND.sign();

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
    }

    public setActiveAppearance(): void {
        this.setDepth(1);
        this.setFrame(1);
        this.face.setDepth(2);
        this.face.setVisible(true);
        this.face.setTintFill(0xfff730);
        this.hand.setDepth(2);
        this.hand.setFrame(1);
        this.hand.setTintFill(0xfff730);
    }

    public getCurrentHandRotation(): number {
        return this.hand.rotation;
    }

    public kill(): void {
        this.face.destroy();
        this.hand.destroy();
        this.destroy();
    }

    public onHitByBall(): void {
        this.scene.add.tween({
            targets: [this, this.face, this.hand],
            scaleX: 0.6,
            scaleY: 0.6,
            ease: "easeInOut",
            duration: 150,
            yoyo: true
        });
    }
}
