interface ISpriteConstructor {
    scene: Phaser.Scene;
    x: number;
    y: number;
    texture: string;
    frame?: string | number;
}

export class Bullet extends Phaser.GameObjects.Sprite {
    body!: Phaser.Physics.Arcade.Body;

    // variables
    protected currentScene: Phaser.Scene;
    protected isActivated: boolean = false;
    protected speed!: number;
    private bulletTime: number = 45;

    constructor(aParams: ISpriteConstructor, speed: number) {
        super(
            aParams.scene,
            aParams.x,
            aParams.y,
            aParams.texture,
            aParams.frame
        );

        // variables
        this.currentScene = aParams.scene;
        this.speed = speed;
        this.initSprite(speed < 0);
        this.currentScene.add.existing(this);
    }

    protected initSprite(isFlip: boolean) {
        // variables
        this.isActivated = false;

        // sprite
        this.setOrigin(0, 0);
        this.setFrame(0);
        this.setFlipX(isFlip);

        // physics
        this.currentScene.physics.world.enable(this);
        this.body.setSize(8, 8);
        this.body.setAllowGravity(false);
    }

    update() {
        this.bulletTime--;
        this.body.setVelocityX(this.speed);
        if (!this.bulletTime) {
            this.body.setVelocityX(0);
            this.destroy();
        }
    }
}
