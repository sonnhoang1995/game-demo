interface IImageConstructor {
    scene: Phaser.Scene;
    x: number;
    y: number;
    texture: string | Phaser.Textures.Texture;
    frame?: string | number;
}

import Phaser from "phaser";

export class Ball extends Phaser.GameObjects.Image {
    private speed!: number;
    private particles!: Phaser.GameObjects.Particles.ParticleEmitter;

    constructor(aParams: IImageConstructor) {
        super(
            aParams.scene,
            aParams.x,
            aParams.y,
            aParams.texture,
            aParams.frame
        );

        this.initVariables();
        this.initImage();
        this.initPhysics();
        this.scene.add.existing(this);
    }

    private initVariables() {
        this.speed = 600;
    }

    private initImage() {
        this.setVisible(false);
    }

    private initPhysics() {
        this.scene.physics.world.enable(this);
        (this.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);
        (this.body as Phaser.Physics.Arcade.Body).onWorldBounds = true;
    }

    public initParticles() {
        this.particles = this.scene.add.particles("flares").createEmitter({
            frame: 4,
            x: this.x,
            y: this.y,
            lifespan: 4000,
            scale: 0.2,
            blendMode: "ADD",
            frequency: 100
        });
        this.particles.startFollow(this);
    }

    public removeParticles() {
        this.particles.remove();
    }

    public getSpeed(): number {
        return this.speed;
    }
}
