interface IAsteroidConstructor {
    scene: Phaser.Scene;
    size: number;
    options?: Phaser.Types.GameObjects.Graphics.Options;
}
import Phaser from "phaser";
import { CONST } from "../const/const";

export class Asteroid extends Phaser.GameObjects.Graphics {
    private velocity?: Phaser.Math.Vector2;
    private radius: number = 0;
    private asteroidRadius: number;
    private sizeOfAsteroid: number;
    private numberOfSides: number;

    public getRadius(): number {
        return this.radius;
    }
    public getBody(): any {
        return this.body;
    }

    constructor(aParams: IAsteroidConstructor) {
        super(aParams.scene, aParams.options);

        // variables
        this.numberOfSides = 12;
        this.asteroidRadius = 0;
        this.sizeOfAsteroid = aParams.size;

        // init ship
        if (aParams.options)
            this.initAsteroid(
                aParams.options.x,
                aParams.options.y,
                this.sizeOfAsteroid
            );

        // physics
        this.scene.physics.world.enable(this);
        (this.body as Phaser.Physics.Arcade.Body).allowGravity = false;
        (this.body as Phaser.Physics.Arcade.Body).setCircle(
            this.asteroidRadius
        );
        (this.body as Phaser.Physics.Arcade.Body).setOffset(
            -this.asteroidRadius,
            -this.asteroidRadius
        );

        this.scene.add.existing(this);
    }

    private initAsteroid(
        aX: number | undefined,
        aY: number | undefined,
        aSizeOfAsteroid: number
    ): void {
        let points: Phaser.Math.Vector2[] = [];

        for (let i = 0; i < this.numberOfSides; i++) {
            switch (aSizeOfAsteroid) {
                case 3: {
                    this.radius = Phaser.Math.RND.between(
                        CONST.ASTEROID.LARGE.MAXSIZE,
                        CONST.ASTEROID.LARGE.MINSIZE
                    );
                    this.velocity = this.getRandomVelocity(
                        CONST.ASTEROID.LARGE.MINSPEED,
                        CONST.ASTEROID.LARGE.MAXSPEED
                    );
                    break;
                }

                case 2: {
                    this.radius = Phaser.Math.RND.between(
                        CONST.ASTEROID.MEDIUM.MAXSIZE,
                        CONST.ASTEROID.MEDIUM.MINSIZE
                    );
                    this.velocity = this.getRandomVelocity(
                        CONST.ASTEROID.MEDIUM.MINSPEED,
                        CONST.ASTEROID.MEDIUM.MAXSPEED
                    );
                    break;
                }

                case 1: {
                    this.radius = Phaser.Math.RND.between(
                        CONST.ASTEROID.SMALL.MAXSIZE,
                        CONST.ASTEROID.SMALL.MINSIZE
                    );
                    this.velocity = this.getRandomVelocity(
                        CONST.ASTEROID.SMALL.MINSPEED,
                        CONST.ASTEROID.SMALL.MAXSPEED
                    );
                    break;
                }
            }
            if (this.radius > this.asteroidRadius) {
                this.asteroidRadius = this.radius;
            }
            let x =
                this.radius * Math.cos((2 * Math.PI * i) / this.numberOfSides);
            let y =
                this.radius * Math.sin((2 * Math.PI * i) / this.numberOfSides);

            points.push(new Phaser.Math.Vector2(x, y));
        }

        this.lineStyle(1, 0xffffff);
        for (let p = 0; p < points.length; p++) {
            this.beginPath();
            this.moveTo(points[p].x, points[p].y);
            if (p + 1 < points.length) {
                this.lineTo(points[p + 1].x, points[p + 1].y);
            } else {
                this.lineTo(points[0].x, points[0].y);
            }
            this.strokePath();
        }

        if (aX && aY) {
            this.x = aX;
            this.y = aY;
        }
    }

    update(): void {
        this.applyForces();
        this.checkIfOffScreen();
    }

    private applyForces(): void {
        // apple velocity to position
        if (this.velocity) {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
        }

        // rotate
        this.rotation += 0.005;
    }

    public getSize(): number {
        return this.sizeOfAsteroid;
    }

    private checkIfOffScreen(): void {
        // horizontal check
        if (this.x > this.scene.sys.canvas.width + CONST.SHIP_SIZE) {
            this.x = -CONST.SHIP_SIZE;
        } else if (this.x < -CONST.SHIP_SIZE) {
            this.x = this.scene.sys.canvas.width + CONST.SHIP_SIZE;
        }

        // vertical check
        if (this.y > this.scene.sys.canvas.height + CONST.SHIP_SIZE) {
            this.y = -CONST.SHIP_SIZE;
        } else if (this.y < -CONST.SHIP_SIZE) {
            this.y = this.scene.sys.canvas.height + CONST.SHIP_SIZE;
        }
    }

    private getRandomVelocity(aMin: number, aMax: number): Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(
            Phaser.Math.RND.between(
                this.getRndNumber(aMin, aMax),
                this.getRndNumber(aMin, aMax)
            ),
            Phaser.Math.RND.between(
                this.getRndNumber(aMin, aMax),
                this.getRndNumber(aMin, aMax)
            )
        );
    }

    private getRndNumber(aMin: number, aMax: number): number {
        let num = Math.floor(Math.random() * aMax) + aMin;
        num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
        return num;
    }
}
