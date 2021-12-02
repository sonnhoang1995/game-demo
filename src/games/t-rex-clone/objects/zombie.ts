import Phaser from "phaser";

export class Zombie extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.setScale(0.25)

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.createAnimation();

        this.setCollideWorldBounds(true);
    }

    createAnimation() {
        this.scene.anims.create({
            key: "zombie",
            frameRate: 6,
            frames: this.anims.generateFrameNumbers("Zombie", {
                start: 0,
                end: 5
            }),
            repeat: -1
        });

        this.play("zombie")
    }

    update() {
        this.setVelocityX(-300);
    }
    // renderer: Renderer;
    // spriteSheetObject!: ISpriteSheetObject;
    // vx: number;
    // vy: number;
    // spriteSheetNumColumns: number = 3;
    // spriteSheetNumRows: number = 2;
    // constructor(gameObject: IGameObject) {
    //     super(gameObject);

    //     this.vx = gameObject.vx;
    //     this.vy = gameObject.vy;

    //     this.spriteSheetObject = {
    //         context: this.context,
    //         x: this.x,
    //         y: this.y,
    //         imageWidth: this.imageWidth,
    //         imageHeight: this.imageHeight,
    //         frameWidth: this.imageWidth / this.spriteSheetNumColumns,
    //         frameHeight: this.imageHeight / this.spriteSheetNumRows,
    //         numColumns: this.spriteSheetNumColumns,
    //         numRows: this.spriteSheetNumRows,
    //         radius: 50,
    //         image: this.image
    //     };
       
    //     this.renderer = new Renderer();
    // }

    // update(elapsedTime: number) {
    //     if (this.spriteSheetObject)
    //         this.spriteSheetObject.x += this.vx * elapsedTime;
    // }

    // render() {
    //     if (this.spriteSheetObject)
    //         this.renderer.spriteSheetRenderer(this.spriteSheetObject);
    // }
}
