import { Bullet } from "./bullet";

interface ISpriteConstructor {
    scene: Phaser.Scene;
    x: number;
    y: number;
    texture: string;
    frame?: string | number;
}

export class Mario extends Phaser.GameObjects.Sprite {
    body!: Phaser.Physics.Arcade.Body;

    // variables
    private currentScene: Phaser.Scene;
    private marioSize!: string;
    private acceleration: number = 500;
    private isJumping: boolean = false;
    private isDying: boolean = false;
    private isVulnerable: boolean = true;
    private vulnerableCounter: number = 100;
    private leftKey!: Phaser.Input.Keyboard.Key;
    private rightKey!: Phaser.Input.Keyboard.Key;
    private downKey!: Phaser.Input.Keyboard.Key;
    private upKey!: Phaser.Input.Keyboard.Key;
    private spaceKey!: Phaser.Input.Keyboard.Key;
    private bullets!: Phaser.GameObjects.Group;

    // input
    private keys!: Map<string, Phaser.Input.Keyboard.Key>;

    public getKeys(): Map<string, Phaser.Input.Keyboard.Key> {
        return this.keys;
    }

    public getVulnerable(): boolean {
        return this.isVulnerable;
    }

    public getDownKey(): Phaser.Input.Keyboard.Key {
        return this.downKey;
    }

    public getRightKey(): Phaser.Input.Keyboard.Key {
        return this.rightKey;
    }

    public getBulletGroup(): Phaser.GameObjects.Group {
        return this.bullets;
    }

    constructor(aParams: ISpriteConstructor) {
        super(
            aParams.scene,
            aParams.x,
            aParams.y,
            aParams.texture,
            aParams.frame
        );

        this.currentScene = aParams.scene;
        this.bullets = this.currentScene.add.group({
            runChildUpdate: true
        });
        this.initSprite();
        this.currentScene.add.existing(this);
    }

    private initSprite() {
        // variables
        this.marioSize = this.currentScene.registry.get("marioSize");
        this.acceleration = 500;
        this.isJumping = false;
        this.isDying = false;
        this.isVulnerable = true;
        this.vulnerableCounter = 100;

        // sprite
        this.setOrigin(0.5, 0.5);
        this.setFlipX(false);

        // input
        this.leftKey = this.addKey("LEFT");
        this.rightKey = this.addKey("RIGHT");
        this.downKey = this.addKey("DOWN");
        this.upKey = this.addKey("UP");
        this.spaceKey = this.addKey("SPACE");

        // physics
        this.currentScene.physics.world.enable(this);
        this.adjustPhysicBodyToSmallSize();
        this.body.maxVelocity.x = 50;
        this.body.maxVelocity.y = 300;
    }

    private addKey(key: string): Phaser.Input.Keyboard.Key {
        return this.currentScene.input.keyboard.addKey(key);
    }

    update(): void {
        if (!this.isDying) {
            this.handleInput();
            this.handleAnimations();
        } else if (this.isDying && this.scene.registry.get("lives") == 0) {
            this.setFrame(12);
            if (this.y > this.currentScene.sys.canvas.height) {
                this.currentScene.scene.stop("PlayScene");
                this.currentScene.scene.stop("HUDScene");
                this.currentScene.scene.start("MenuScene");
            }
        } else {
            if (this.y > this.currentScene.sys.canvas.height) {
                this.currentScene.scene.restart();
            }
        }

        if (!this.isVulnerable) {
            if (this.vulnerableCounter > 0) {
                this.vulnerableCounter -= 1;
            } else {
                this.vulnerableCounter = 100;
                this.isVulnerable = true;
            }
        }
    }

    private handleInput() {
        if (this.y > this.currentScene.sys.canvas.height) {
            // mario fell into a hole
            this.isDying = true;
        }

        // evaluate if player is on the floor or on object
        // if neither of that, set the player to be jumping
        if (
            this.body.onFloor() ||
            this.body.touching.down ||
            this.body.blocked.down
        ) {
            this.isJumping = false;
            //this.body.setVelocityY(0);
        }

        // handle movements to left and right
        if (this.rightKey.isDown) {
            this.body.setAccelerationX(this.acceleration);
            this.setFlipX(false);
        } else if (this.leftKey.isDown) {
            this.body.setAccelerationX(-this.acceleration);
            this.setFlipX(true);
        } else {
            this.body.setVelocityX(0);
            this.body.setAccelerationX(0);
        }

        // handle jumping
        if (this.upKey.isDown && !this.isJumping) {
            this.body.setVelocityY(-180);
            this.isJumping = true;
        }

        if (this.spaceKey.isDown) {
            if (this.bullets.getLength() == 1) return false;
            this.bullets.add(
                new Bullet(
                    {
                        scene: this.currentScene,
                        x: this.flipX ? this.body.x - 4 : this.body.x + 4,
                        y: this.body.y + 4,
                        texture: "bullet"
                    },
                    this.flipX ? -150 : 150
                )
            );
        }
    }

    private handleAnimations(): void {
        if (this.body.velocity.y !== 0) {
            // mario is jumping or falling
            this.anims.stop();
            if (this.marioSize === "small") {
                this.setFrame(4);
            } else {
                this.setFrame(10);
            }
        } else if (this.body.velocity.x !== 0) {
            // mario is moving horizontal

            // check if mario is making a quick direction change
            if (
                (this.body.velocity.x < 0 && this.body.acceleration.x > 0) ||
                (this.body.velocity.x > 0 && this.body.acceleration.x < 0)
            ) {
                if (this.marioSize === "small") {
                    this.setFrame(5);
                } else {
                    this.setFrame(11);
                }
            }

            if (this.body.velocity.x > 0) {
                this.anims.play(this.marioSize + "MarioWalk", true);
            } else {
                this.anims.play(this.marioSize + "MarioWalk", true);
            }
        } else {
            // mario is standing still
            this.anims.stop();
            if (this.marioSize === "small") {
                this.setFrame(0);
            } else {
                if (this.downKey.isDown) {
                    this.setFrame(13);
                } else {
                    this.setFrame(6);
                }
            }
        }
    }

    public growMario(): void {
        this.marioSize = "big";
        this.currentScene.registry.set("marioSize", "big");
        this.adjustPhysicBodyToBigSize();
    }

    private shrinkMario(): void {
        this.marioSize = "small";
        this.currentScene.registry.set("marioSize", "small");
        this.adjustPhysicBodyToSmallSize();
    }

    private adjustPhysicBodyToSmallSize(): void {
        this.body.setSize(6, 12);
        this.body.setOffset(6, 4);
    }

    private adjustPhysicBodyToBigSize(): void {
        this.body.setSize(8, 16);
        this.body.setOffset(4, 0);
    }

    public bounceUpAfterHitEnemyOnHead(): void {
        this.currentScene.add.tween({
            targets: this,
            props: { y: this.y - 5 },
            duration: 200,
            ease: "Power1",
            yoyo: true
        });
    }

    public gotHit(): void {
        this.isVulnerable = false;
        if (this.marioSize === "big") {
            this.shrinkMario();
        } else {
            // mario is dying
            this.isDying = true;

            // sets acceleration, velocity and speed to zero
            // stop all animations
            this.body.stop();
            this.anims.stop();

            // make last dead jump and turn off collision check
            this.body.setVelocityY(-180);

            // this.body.checkCollision.none did not work for me
            this.body.checkCollision.up = false;
            this.body.checkCollision.down = false;
            this.body.checkCollision.left = false;
            this.body.checkCollision.right = false;

            this.currentScene.registry.values.lives -= 1;
            this.currentScene.events.emit("livesChanged");
        }
    }
}
