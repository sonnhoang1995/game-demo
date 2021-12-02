import { CONST } from "../const/const";
import { Ball } from "../objects/ball";
import { Clock } from "../objects/clock";

export class PlayScene extends Phaser.Scene {
    private canFire: boolean = true;
    private clocksReached: number = 1;
    private numberClocks: number = 0;

    private activeClock?: Clock;
    private ball?: Ball;
    private clocksArray: Clock[] = [];

    private clockGroup?: Phaser.GameObjects.Group;

    constructor() {
        super({
            key: "PlayScene"
        });
    }

    init(): void {
        // variables
        this.canFire = true;
        this.clocksReached = 1;
        this.numberClocks = 0;
    }

    create(): void {
        this.clocksArray = [];
        this.clockGroup = this.add.group();

        for (
            let i = 0;
            i < CONST.LEVELS[CONST.currentLevel].CLOCKS.length;
            i++
        ) {
            switch (CONST.LEVELS[CONST.currentLevel].CLOCKS[i]) {
                // small clock
                case 1:
                    this.clocksArray.push(
                        this.addNewClock(
                            new Phaser.Math.Vector2(
                                (i % CONST.LEVEL_WIDTH_IN_TILES) * 2 + 1,
                                Math.floor(i / CONST.LEVEL_HEIGHT_IN_TILES) *
                                    2 +
                                    1
                            ),
                            "small"
                        )
                    );
                    break;

                // big clock
                case 2:
                    this.clocksArray.push(
                        this.addNewClock(
                            new Phaser.Math.Vector2(
                                (i % CONST.LEVEL_WIDTH_IN_TILES) * 2 + 2,
                                Math.floor(i / CONST.LEVEL_HEIGHT_IN_TILES) * 2
                            ),
                            "big"
                        )
                    );
                    break;
            }
        }

        this.activeClock = Phaser.Utils.Array.GetRandom(this.clocksArray);
        if (this.activeClock) this.activeClock.setActiveAppearance();

        this.ball = new Ball({
            scene: this,
            x: +this.game.config.width / 2,
            y: +this.game.config.height / 2,
            texture: "ball"
        });

        this.physics.world.on(
            "worldbounds",
            () => {
                this.scene.start("PlayScene");
            },
            this
        );

        this.input.on("pointerdown", this.throwBall, this);

        this.physics.add.overlap(
            this.ball,
            this.clockGroup,
            this.handleBallClockOverlap as ArcadePhysicsCallback,
            undefined,
            this
        );
    }

    private addNewClock(
        clockCoordinates: Phaser.Math.Vector2,
        prefix: string
    ): Clock {
        const newClock = new Clock({
            scene: this,
            x: clockCoordinates.x * CONST.GRID_SIZE_IN_PIXELS,
            y: clockCoordinates.y * CONST.GRID_SIZE_IN_PIXELS,
            texture: prefix + "clock",
            prefix: prefix
        });

        if (this.clockGroup) this.clockGroup.add(newClock);

        this.numberClocks++;

        return newClock;
    }

    private throwBall(): void {
        if (this.canFire && this.ball && this.activeClock) {
            this.canFire = false;

            this.ball.setPosition(this.activeClock.x, this.activeClock.y);
            this.ball.setVisible(true);

            const handAngle = this.activeClock.getCurrentHandRotation();
            const ballVelocity = this.physics.velocityFromRotation(
                handAngle,
                this.ball.getSpeed()
            );
            (this.ball.body as Phaser.Physics.Arcade.Body).setVelocity(
                ballVelocity.x,
                ballVelocity.y
            );

            this.activeClock.kill();
        }
    }

    private handleBallClockOverlap(ball: Ball, clock: Clock) {
        if (!this.canFire && this.ball) {
            clock.setActiveAppearance();
            this.activeClock = clock;
            this.ball.setVisible(false);
            (this.ball.body as Phaser.Physics.Arcade.Body).setVelocity(0, 0);
            this.clocksReached++;

            if (this.clocksReached < this.numberClocks) {
                this.canFire = true;
            } else {
                this.time.addEvent({
                    delay: 1500,
                    callbackScope: this,
                    callback: () => {
                        CONST.currentLevel += 1;
                        this.scene.start("PlayScene");
                    }
                });
            }
        }
    }
}
