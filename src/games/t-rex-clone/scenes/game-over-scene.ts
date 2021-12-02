import Phaser from "phaser";

export class GameOverScene extends Phaser.Scene {
    score: number = 0;
    constructor() {
        super("GameOverScene");
    }

    init(data: { score: number }) {
        this.score = data.score;
    }

    create() {
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        let gameOverText = this.add.text(
            width / 2,
            height / 2 - 200,
            "Game Over!!!",
            {
                font: "48px monospace",
                color: "#ffffff"
            }
        );
        gameOverText.setOrigin(0.5, 0.5);
        let scoreText = this.add.text(
            width / 2,
            height / 2 - 100,
            `Your score: ${this.score}`,
            {
                font: "28px monospace",
                color: "#ffffff"
            }
        );
        scoreText.setOrigin(0.5, 0.5);
        let button = this.add
            .rectangle(width / 2, height / 2, 240, 80, 0xaa0000)
            .setInteractive({ cursor: "pointer" });
        let playText = this.add.text(width / 2, height / 2, "Restart", {
            font: "24px monospace",
            color: "#ffffff"
        });
        playText.setOrigin(0.5, 0.5);
        button.on("pointerdown", () => {
            this.scene.setActive(false);
            this.scene.setVisible(false);
            this.scene.start("PlayScene");
        });
    }
}
