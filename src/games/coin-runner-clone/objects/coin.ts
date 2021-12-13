interface IImageConstructor {
    scene: Phaser.Scene;
    x: number;
    y: number;
    texture: string;
    frame?: string | number;
}
import Phaser from "phaser";

export class Coin extends Phaser.GameObjects.Image {
    private centerOfScreen?: number;
    private changePositionTimer?: Phaser.Time.TimerEvent | null;
    private isChangePosition: boolean = false;
    private tween?: Phaser.Tweens.Tween;
    private particles?: Phaser.GameObjects.Particles.ParticleEmitter;

    constructor(aParams: IImageConstructor) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture);

        this.initVariables();
        this.initImage();
        this.initEvents();
        this.setNewTween();
        this.setNewParticles();

        this.scene.add.existing(this);
    }

    private initVariables(): void {
        this.centerOfScreen = this.scene.sys.canvas.width / 2;
        this.changePositionTimer = null;
    }

    private initImage(): void {
        this.setOrigin(0.5, 0.5);
    }

    private initEvents(): void {
        this.changePositionTimer = this.scene.time.addEvent({
            delay: 2000,
            callback: this.changePosition,
            callbackScope: this,
            loop: true
        });
    }

    update(): void {}

    public changePosition(): void {
        this.setFieldSide();
        this.setNewPosition();
        this.setNewTween();
        this.setNewParticles();

        if (this.changePositionTimer)
            this.changePositionTimer.reset({
                delay: 2000,
                callback: this.changePosition,
                callbackScope: this,
                loop: true
            });
    }

    private setNewPosition(): void {
        if (this.centerOfScreen && this.isChangePosition) {
            this.x = Phaser.Math.RND.integerInRange(100, this.centerOfScreen);
        } else {
            this.x = Phaser.Math.RND.integerInRange(385, 700);
        }
        this.y = Phaser.Math.RND.integerInRange(100, 500);
    }

    private setFieldSide(): void {
        this.isChangePosition = !this.isChangePosition;
    }

    private setNewTween(): void {
        if (this.tween) {
            this.tween.stop();
        }

        this.tween = this.scene.add.tween({
            targets: this,
            x: this.isChangePosition ? 700 : 100,
            ease: "Power1",
            duration: 2000,
            flipX: true,
            yoyo: true,
            repeat: -1
        });
    }

    private setNewParticles(): void {
        if (this.particles) {
            this.particles.remove();
        }

        this.particles = this.scene.add.particles("flares").createEmitter({
            frame: 4,
            x: this.x,
            y: this.y,
            lifespan: 4000,
            scale: 0.5,
            blendMode: "ADD",
            frequency: 200
        });
        this.particles.startFollow(this);
    }
}
