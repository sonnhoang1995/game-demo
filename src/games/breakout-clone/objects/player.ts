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

export class Player extends Phaser.GameObjects.Rectangle {
    private cursor?: Phaser.Types.Input.Keyboard.CursorKeys;

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
        this.initInput();
        this.scene.add.existing(this);
    }

    private initRectangle(): void {
        this.setFillStyle(0x9697c6, 1);
    }

    private initPhysics(): void {
        this.scene.physics.world.enable(this);
        (this.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds();
        (this.body as Phaser.Physics.Arcade.Body).setDragX(300);
        (this.body as Phaser.Physics.Arcade.Body).setImmovable(true);
    }

    private initInput(): void {
        this.cursor = this.scene.input.keyboard.createCursorKeys();
    }

    update(): void {
        this.handleInput();
    }

    private handleInput(): void {
        if (this.cursor && this.cursor.right.isDown) {
            (this.body as Phaser.Physics.Arcade.Body).setVelocityX(300);
        } else if (this.cursor && this.cursor.left.isDown) {
            (this.body as Phaser.Physics.Arcade.Body).setVelocityX(-300);
        }
    }

    public resetToStartPosition(): void {
        this.x = +this.scene.game.config.width / 2 - 20;
        this.y = +this.scene.game.config.height - 50;
    }
}
