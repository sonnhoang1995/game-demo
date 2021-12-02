import Phaser from "phaser";

export class Player extends Phaser.Physics.Arcade.Sprite {
    upArrowKey: Phaser.Input.Keyboard.Key;
    downArrowKey: Phaser.Input.Keyboard.Key;
    spaceKey: Phaser.Input.Keyboard.Key;
    jumpSound: Phaser.Sound.BaseSound;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.setScale(0.25);

        this.upArrowKey = scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.UP
        );
        this.downArrowKey = scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.DOWN
        );
        this.spaceKey = scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );
        this.createAnimation();
        this.jumpSound = scene.sound.add("JumpSound");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
    }

    createAnimation() {
        this.scene.anims.create({
            key: "run",
            frameRate: 6,
            frames: this.anims.generateFrameNumbers("PlayerRun", {
                start: 0,
                end: 5
            }),
            repeat: -1
        });

        this.scene.anims.create({
            key: "slide",
            frameRate: 6,
            frames: this.anims.generateFrameNames("PlayerSlide", {
                start: 0,
                end: 5
            }),
            repeat: -1
        });

        this.scene.anims.create({
            key: "jump",
            frameRate: 6,
            frames: this.anims.generateFrameNames("PlayerJump", {
                start: 0,
                end: 5
            }),
            repeat: -1
        });

        this.play("run");
    }

    update() {
        if((this.body as Phaser.Physics.Arcade.Body).onFloor()) {
            if (this.upArrowKey.isDown || this.spaceKey.isDown) {
                this.jumpSound.play();
                this.play("jump", true);
                this.body.velocity.y = -800;
            }
    
            if (this.downArrowKey.isDown) {
                this.play("slide", true);
            }
    
            if (
                this.downArrowKey.isUp &&
                !this.upArrowKey.isDown &&
                !this.spaceKey.isDown
            ) {
                this.play("run", true);
            }
        }
    }
    // radius: number = 50;
    // isJumping: boolean;
    // jumpLimit: number = 225;
    // isDucking: boolean;
    // canDuck: boolean;
    // renderer: Renderer;
    // spriteSheetObject: ISpriteSheetObject;
    // spriteSheetNumRows: number = 2;
    // spriteSheetNumColumns: number = 3;

    // constructor(
    //     iGameObject: IGameObject,
    // ) {
    //     super(iGameObject);

    //     this.isJumping = false;
    //     this.isDucking = false;
    //     this.canDuck = true;
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
    //     this.renderNewSprite("runningsprite");
    //     this.jump(elapsedTime);
    //     this.duck();
    // }

    // jump(elapsedTime: number) {
    //     this.spriteSheetObject.y =
    //         this.spriteSheetObject.y > 350 ? 350 : this.spriteSheetObject.y;

    //     if (this.isJumping) {
    //         this.renderNewSprite("jumpingsprite");
    //         this.spriteSheetObject.y += this.vy * elapsedTime;
    //         this.canDuck = false;

    //         if (this.spriteSheetObject.y < this.jumpLimit) this.vy = -this.vy;

    //         if (this.spriteSheetObject.y > 350) {
    //             this.isJumping = false;
    //             this.canDuck = true;
    //             this.vy = -this.vy;
    //             this.renderNewSprite("runningsprite");
    //         }
    //     }
    // }

    // duck() {
    //     if (this.isDucking && this.canDuck && !this.isJumping) {
    //         this.renderNewSprite("slidingsprite");
    //         this.height = 50;
    //     }
    // }

    // render() {
    //     this.renderer.spriteSheetRenderer(this.spriteSheetObject);
    // }

    // renderNewSprite(spriteName: string) {
    //     const newSprite = ImageLoader.getImage(spriteName);
    //     if (newSprite) this.spriteSheetObject.image = newSprite.src;
    // }
}
