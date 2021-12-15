import Phaser from "phaser";
import { Bullet } from "../objects/bullet";
import { Enemy } from "../objects/enemy";
import { Obstacle } from "../objects/obstacle";
import { Player } from "../objects/player";

export class PlayScene extends Phaser.Scene {
    private map!: Phaser.Tilemaps.Tilemap;
    private tileset!: Phaser.Tilemaps.Tileset;
    private layer!: Phaser.Tilemaps.TilemapLayer;

    private player!: Player;
    private enemies!: Phaser.GameObjects.Group;
    private obstacles!: Phaser.GameObjects.Group;

    private target!: Phaser.Math.Vector2;

    private tankHitSound?: Phaser.Sound.BaseSound;

    private scoreValue?: Phaser.GameObjects.Text;

    private pauseKey?: Phaser.Input.Keyboard.Key;

    private isSoundEnable?: boolean;

    constructor() {
        super({
            key: "PlayScene"
        });
    }

    init(): void {}

    create(): void {
        // create tilemap from tiled JSON
        this.map = this.make.tilemap({ key: "levelMap" });

        this.tileset = this.map.addTilesetImage("tiles");
        this.layer = this.map.createLayer("tileLayer", this.tileset, 0, 0);
        this.layer.setCollisionByProperty({ collide: true });
        this.tankHitSound = this.sound.add("tankHit");
        this.events.on("scoreChanged", this.updateScore, this);
        this.events.on("gameOver", this.createGameOverPopup, this);
        this.isSoundEnable = this.registry.get("isSoundEnable");
        this.pauseKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ESC
        );

        this.obstacles = this.add.group({
            /*classType: Obstacle,*/
            runChildUpdate: true
        });

        this.enemies = this.add.group({
            /*classType: Enemy*/
        });
        this.convertObjects();
        this.createScoreText();
        this.createPauseButton();

        // collider layer and obstacles
        this.physics.add.collider(this.player, this.layer);
        this.physics.add.collider(this.player, this.obstacles);

        // collider for bullets
        this.physics.add.collider(
            this.player.getBullets(),
            this.layer,
            this.bulletHitLayer as ArcadePhysicsCallback,
            undefined,
            this
        );

        this.physics.add.collider(
            this.player.getBullets(),
            this.obstacles,
            this.bulletHitObstacles as ArcadePhysicsCallback,
            undefined,
            this
        );

        this.enemies.children.each(
            ((enemy: Enemy) => {
                this.physics.add.overlap(
                    this.player.getBullets(),
                    enemy,
                    this.playerBulletHitEnemy.bind(
                        this
                    ) as ArcadePhysicsCallback,
                    undefined,
                    this
                );
                this.physics.add.overlap(
                    enemy.getBullets(),
                    this.player,
                    this.enemyBulletHitPlayer.bind(
                        this
                    ) as ArcadePhysicsCallback,
                    undefined
                );

                this.physics.add.collider(
                    enemy.getBullets(),
                    this.obstacles,
                    this.bulletHitObstacles as ArcadePhysicsCallback,
                    undefined
                );
                this.physics.add.collider(
                    enemy.getBullets(),
                    this.layer,
                    this.bulletHitLayer as ArcadePhysicsCallback,
                    undefined
                );
            }) as EachSetCallback<any>,
            this
        );

        this.cameras.main.startFollow(this.player);
    }

    update(): void {
        this.player.update();

        this.enemies.children.each(
            ((enemy: Enemy) => {
                enemy.update();
                if (this.player.active && enemy.active) {
                    var angle = Phaser.Math.Angle.Between(
                        enemy.body.x,
                        enemy.body.y,
                        this.player.body.x,
                        this.player.body.y
                    );

                    enemy.getBarrel().angle =
                        (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
                }
            }) as EachSetCallback<any>,
            this
        );

        if (this.pauseKey && this.pauseKey.isDown) {
            this.scene.pause();
            this.scene.launch("UIScene");
        }

        this.events.on("resume", this.updateSoundMode.bind(this));
    }

    private convertObjects(): void {
        // find the object layer in the tilemap named 'objects'
        const objects = this.map.getObjectLayer("objects").objects as any[];

        objects.forEach((object) => {
            if (object.type === "player") {
                this.player = new Player({
                    scene: this,
                    x: object.x,
                    y: object.y,
                    texture: "tankBlue"
                });
            } else if (object.type === "enemy") {
                let enemy = new Enemy({
                    scene: this,
                    x: object.x,
                    y: object.y,
                    texture: "tankRed"
                });

                this.enemies.add(enemy);
            } else {
                let obstacle = new Obstacle({
                    scene: this,
                    x: object.x,
                    y: object.y - 40,
                    texture: object.type
                });

                this.obstacles.add(obstacle);
            }
        });
    }

    private bulletHitLayer(
        bullet: Bullet,
        layer: Phaser.Tilemaps.TilemapLayer
    ): void {
        bullet.destroy();
    }

    private bulletHitObstacles(bullet: Bullet, obstacle: Obstacle): void {
        bullet.destroy();
    }

    private enemyBulletHitPlayer(bullet: Bullet, player: Player): void {
        if (this.tankHitSound && this.isSoundEnable)
            this.tankHitSound.play({ volume: 0.5 });
        bullet.destroy();
        player.updateHealth();
    }

    private playerBulletHitEnemy(bullet: Bullet, enemy: Enemy): void {
        if (this.tankHitSound && this.isSoundEnable)
            this.tankHitSound.play({ volume: 0.5 });
        bullet.destroy();
        enemy.updateHealth();
    }

    private createScoreText(): void {
        let width = this.sys.canvas.width;
        let scoreText = this.add.text(width / 2, 50, "Score", {
            font: "48px monospace",
            color: "#FFFFFF"
        });
        scoreText.setOrigin(0.5, 0.5);
        scoreText.setScrollFactor(0);
        this.scoreValue = this.add.text(
            width / 2,
            100,
            `${this.registry.get("score")}`,
            {
                font: "36px monospace",
                color: "#FFFFFF"
            }
        );
        this.scoreValue.setOrigin(0.5, 0.5);
        this.scoreValue.setScrollFactor(0);
    }

    private updateScore(): void {
        if (this.scoreValue)
            this.scoreValue.setText(`${this.registry.get("score")}`);
    }

    private updateSoundMode(): void {
        this.isSoundEnable = this.registry.get("isSoundEnable");
    }

    private createGameOverPopup(): void {
        console.log("gameOver");
        this.registry.set(
            "hiScore",
            this.checkHighScore(
                this.registry.get("score"),
                this.registry.get("hiScore")
            )
        );
        let width = this.sys.canvas.width;
        let height = this.sys.canvas.height;
        let popup = this.add.rectangle(
            width / 2,
            height / 2,
            width / 2,
            height / 2,
            0x808080
        );
        popup.setAlpha(0.5);
        popup.setScrollFactor(0);

        let gameOverText = this.add.text(0, 0, "Game Over!!!", {
            font: "56px monospace",
            color: "#ffffff"
        });
        gameOverText.setOrigin(0.5, 0.5);
        gameOverText.setScrollFactor(0);
        Phaser.Display.Align.In.TopCenter(gameOverText, popup, 0, -40);

        let scoreText = this.add.text(
            0,
            0,
            `Your score: ${this.registry.get("score")}`,
            {
                font: "36px monospace",
                color: "#ffffff"
            }
        );
        scoreText.setOrigin(0.5, 0.5);
        scoreText.setScrollFactor(0);
        Phaser.Display.Align.In.Center(scoreText, popup, 0, -40);

        let hiScoreText = this.add.text(
            0,
            0,
            `High score: ${this.registry.get("hiScore")}`,
            {
                font: "36px monospace",
                color: "#ffffff"
            }
        );
        hiScoreText.setOrigin(0.5, 0.5);
        hiScoreText.setScrollFactor(0);
        Phaser.Display.Align.In.Center(hiScoreText, popup, 0, 40);

        let button = this.add
            .rectangle(0, 0, 240, 80, 0xaa0000)
            .setInteractive({ cursor: "pointer" });
        button.setOrigin(0.5, 0.5);
        button.setScrollFactor(0);
        Phaser.Display.Align.In.BottomCenter(button, popup, 0, -40);

        let playText = this.add.text(width / 2, height / 2, "New Game", {
            font: "28px monospace",
            color: "#ffffff"
        });
        playText.setOrigin(0.5, 0.5);
        playText.setScrollFactor(0);
        Phaser.Display.Align.In.Center(playText, button);

        button.on("pointerdown", () => {
            this.scene.setActive(false);
            this.scene.setVisible(false);
            this.scene.restart();
            this.registry.set("score", 0);
        });
    }

    private checkHighScore(newScore: number, currentHighScore: number): number {
        return newScore > currentHighScore ? newScore : currentHighScore;
    }

    private createPauseButton(): void {
        let pauseButton = this.add
            .image(50, 50, "pauseButton")
            .setInteractive({ cursor: "pointer" });
        pauseButton.setScale(0.3, 0.3);
        pauseButton.setScrollFactor(0);
        pauseButton.on("pointerover", () => {
            pauseButton.setScale(0.35, 0.35);
        });
        pauseButton.on("pointerout", () => {
            pauseButton.setScale(0.3, 0.3);
        });
        pauseButton.on("pointerdown", () => {
            this.scene.pause();
            this.scene.launch("UIScene");
        });
    }
}
