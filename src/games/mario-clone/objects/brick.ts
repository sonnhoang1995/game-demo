interface IBrickConstructor {
    scene: Phaser.Scene;
    value: number;
    x: number;
    y: number;
    texture: string;
    frame?: string | number;
}

export class Brick extends Phaser.GameObjects.Sprite {
    body!: Phaser.Physics.Arcade.Body;

    // variables
    private currentScene: Phaser.Scene;
    protected destroyingValue: number;

    constructor(aParams: IBrickConstructor) {
        super(
            aParams.scene,
            aParams.x,
            aParams.y,
            aParams.texture,
            aParams.frame
        );

        // variables
        this.currentScene = aParams.scene;
        this.destroyingValue = aParams.value;
        this.initSprite();
        this.currentScene.add.existing(this);
    }

    private initSprite() {
        // sprite
        this.setOrigin(0, 0);
        this.setFrame(0);

        // physics
        this.currentScene.physics.world.enable(this);
        this.body.setSize(16, 16);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
    }

    update(): void {
        if (this.body.touching.down) {
            // something touches the downside of the brick: probably mario?
            for (let i = -2; i < 2; i++) {
                // create smaller bricks
                let randomX =
                    Math.random() < 0.5
                        ? -(Math.floor(Math.random() * 9) + 1)
                        : Math.floor(Math.random() * 9) + 1;
                let randomY =
                    Math.random() < 0.5
                        ? -(Math.floor(Math.random() * 9) + 1)
                        : Math.floor(Math.random() * 9) + 1;
                let brick1 = this.currentScene.add
                    .sprite(this.x + randomX, this.y + randomY, "brick")
                    .setOrigin(0, 0)
                    .setDisplaySize(8, 8);

                this.currentScene.physics.world.enable(brick1);

                //brick.body.setVelocity(40 * i, -40 * i);
                //brick.body.setSize(4, 4);
            }

            // destroy brick
            this.destroy();

            // add some score for killing the brick
            this.currentScene.registry.values.score += this.destroyingValue;
            this.currentScene.events.emit("scoreChanged");
        }
    }
}
