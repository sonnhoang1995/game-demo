import Phaser from "phaser";
import BackgroundImage from "../../../assets/images/t-rex-clone/backgroundimage.png";
import GameMusic from "../../../assets/sounds/gamemusic.mp3";
import GameOverMusic from "../../../assets/sounds/gameover.wav";
import JumpSound from "../../../assets/sounds/jump.wav";
import JumpingSprite from "../../../assets/sprites/t-rex-clone/jumpingsprite.png";
import RunningSprite from "../../../assets/sprites/t-rex-clone/runningsprite.png";
import SlidingSprite from "../../../assets/sprites/t-rex-clone/slidingsprite.png";
import ZombieSprite from "../../../assets/sprites/t-rex-clone/zombiesprite.png";

export class LoadingScene extends Phaser.Scene {
    constructor() {
        super("LoadingScene");
    }

    preload() {
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(440, 270, 320, 50);
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        let loadingText = this.add.text(
            width / 2,
            height / 2 - 50,
            "Loading...",
            {
                font: "20px monospace",
                color: "#ffffff"
            }
        );
        loadingText.setOrigin(0.5, 0.5);
        var percentText = this.add.text(width / 2, height / 2 - 5, "0%", {
            font: "18px monospace",
            color: "#ffffff"
        });
        percentText.setOrigin(0.5, 0.5);
        this.load.spritesheet("PlayerRun", RunningSprite, {
            frameWidth: 549,
            frameHeight: 483
        });

        this.load.spritesheet("PlayerJump", JumpingSprite, {
            frameWidth: 549,
            frameHeight: 483
        });

        this.load.spritesheet("PlayerSlide", SlidingSprite, {
            frameWidth: 549,
            frameHeight: 483
        });

        this.load.spritesheet("Zombie", ZombieSprite, {
            frameWidth: 432,
            frameHeight: 521
        });

        this.load.image("BackgroundImage", BackgroundImage);
        this.load.audio("GameMusic", GameMusic);
        this.load.audio("GameOverMusic", GameOverMusic);
        this.load.audio("JumpSound", JumpSound);
        this.load.on("progress", function (value: number) {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(450, 280, 300 * value, 30);
            percentText.setText(`${(value * 100).toFixed(1)}%`);
        });

        this.load.on("complete", function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });
    }

    create() {
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        let button = this.add
            .rectangle(width / 2, height / 2, 240, 80, 0xaa0000)
            .setInteractive({ cursor: "pointer" });
        let playText = this.add.text(width / 2, height / 2, "Play", {
            font: "24px monospace",
            color: "#ffffff"
        });
        playText.setOrigin(0.5, 0.5);
        button.on("pointerdown", () => this.startGame());
    }

    startGame() {
        this.scene.setActive(false);
        this.scene.setVisible(false);
        this.scene.start("PlayScene");
    }
}
