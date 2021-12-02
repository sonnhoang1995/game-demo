import { CONST } from "../const/const";
import { Ball } from "../objects/ball";
import { Brick } from "../objects/brick";
import { Player } from "../objects/player";

const BRICK_COLORS: number[] = [0xf2e49b, 0xbed996, 0xf2937e, 0xffffff];

export class PlayScene extends Phaser.Scene {
    private ball?: Ball;
    private bricks?: Phaser.GameObjects.Group;
    private player?: Player;
    private scoreText?: Phaser.GameObjects.BitmapText;
    private highScoreText?: Phaser.GameObjects.BitmapText;
    private livesText?: Phaser.GameObjects.BitmapText;

    constructor() {
        super({
            key: "PlayScene"
        });
    }

    init(): void {
        CONST.highScore = CONST.score;
        CONST.score = 0;
        CONST.lives = 3;
    }

    create(): void {
        // game objects
        // ------------

        // bricks
        this.bricks = this.add.group();

        const BRICKS = CONST.LEVELS[CONST.currentLevel].BRICKS;
        const WIDTH = CONST.LEVELS[CONST.currentLevel].WIDTH;
        const HEIGHT = CONST.LEVELS[CONST.currentLevel].HEIGHT;
        for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++) {
                this.bricks.add(
                    new Brick({
                        scene: this,
                        x: (CONST.BRICK.WIDTH + CONST.BRICK.SPACING) * x,
                        y:
                            CONST.BRICK.MARGIN_TOP +
                            y * (CONST.BRICK.HEIGHT + CONST.BRICK.SPACING),
                        width: CONST.BRICK.WIDTH,
                        height: CONST.BRICK.HEIGHT,
                        fillColor: BRICK_COLORS[BRICKS[y * 14 + x]]
                    })
                );
            }
        }

        // player
        this.player = new Player({
            scene: this,
            x: +this.game.config.width / 2 - 20,
            y: +this.game.config.height - 50,
            width: 50,
            height: 10
        });

        // ball
        this.ball = new Ball({ scene: this, x: 0, y: 0 }).setVisible(false);

        // score
        this.scoreText = this.add.bitmapText(
            10,
            10,
            "breakoutFont",
            `Score: ${CONST.score}`,
            8
        );

        this.highScoreText = this.add.bitmapText(
            10,
            20,
            "breakoutFont",
            `Highscore: ${CONST.highScore}`,
            8
        );

        this.livesText = this.add.bitmapText(
            10,
            30,
            "breakoutFont",
            `Lives: ${CONST.lives}`,
            8
        );

        // collisions
        // ----------
        this.physics.add.collider(this.player, this.ball);
        this.physics.add.collider(
            this.ball,
            this.bricks,
            this.ballBrickCollision as ArcadePhysicsCallback,
            undefined,
            this
        );

        // events
        // ------
        this.events.on("scoreChanged", this.updateScore, this);
        this.events.on("livesChanged", this.updateLives, this);

        // physics
        // -------
        this.physics.world.checkCollision.down = false;
    }

    update(): void {
        if (this.player && this.ball) {
            this.player.update();

            if (this.player.body.velocity.x !== 0 && !this.ball.visible) {
                this.ball.setPosition(this.player.x, this.player.y - 200);
                this.ball.applyInitVelocity();
                this.ball.setVisible(true);
            }

            if (this.ball.y > this.game.config.height) {
                CONST.lives -= 1;
                this.events.emit("livesChanged");

                if (CONST.lives === 0) {
                    this.gameOver();
                } else {
                    (
                        this.player.body as Phaser.Physics.Arcade.Body
                    ).setVelocity(0);
                    this.player.resetToStartPosition();
                    this.ball.setPosition(0, 0);
                    (this.ball.body as Phaser.Physics.Arcade.Body).setVelocity(
                        0
                    );
                    this.ball.setVisible(false);
                }
            }
        }
    }

    private ballBrickCollision(ball: Ball, brick: Brick): void {
        brick.destroy();
        CONST.score += 10;
        this.events.emit("scoreChanged");

        if (this.bricks && this.bricks.countActive() === 0) {
            // all bricks are gone!
        }
    }

    private gameOver(): void {
        this.scene.restart();
    }

    private updateScore(): void {
        if (this.scoreText) this.scoreText.setText(`Score: ${CONST.score}`);
    }

    private updateLives(): void {
        if (this.livesText) this.livesText.setText(`Lives: ${CONST.lives}`);
    }
}
