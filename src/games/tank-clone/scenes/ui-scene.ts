import Phaser from "phaser";

export class UIScene extends Phaser.Scene {
    score: number = 0;
    private soundMode: string = "";
    constructor() {
        super({
            key: "UIScene"
        });
    }

    init() {
        this.soundMode = this.registry.values.isSoundEnable ? "ON" : "OFF";
    }

    create() {
        let width = this.sys.canvas.width;
        let height = this.sys.canvas.height;

        let background = this.add.rectangle(0, 0, width / 2, height / 2, 0x808080);
        background.setAlpha(0.5);

        let gamePausedText = this.add.text(0, -200, "Game Paused!!!", {
            font: "56px monospace",
            color: "#ffffff"
        });
        gamePausedText.setOrigin(0.5, 0.5);

        let soundButton = this.add
            .rectangle(
                0,
                0,
                240,
                80,
                this.registry.values.isSoundEnable ? 0x00ff00 : 0xaa0000
            )
            .setInteractive({ cursor: "pointer" });
        soundButton.setOrigin(0.5, 0.5);

        let soundButtonText = this.add.text(
            width / 2,
            height / 2,
            `Sound: ${this.soundMode}`,
            {
                font: "28px monospace",
                color: "#ffffff"
            }
        );
        soundButtonText.setOrigin(0.5, 0.5);
        Phaser.Display.Align.In.Center(soundButtonText, soundButton);

        soundButton.on("pointerdown", () => {
            this.registry.set(
                "isSoundEnable",
                !this.registry.values.isSoundEnable
            );
            soundButton.setFillStyle(
                this.registry.values.isSoundEnable ? 0x00ff00 : 0xaa0000
            );
            this.soundMode = this.registry.values.isSoundEnable ? "ON" : "OFF";
            soundButtonText.setText(`Sound: ${this.soundMode}`);
        });

        let resumeButton = this.add
            .rectangle(0, 200, 240, 80, 0xaa0000)
            .setInteractive({ cursor: "pointer" });
        resumeButton.setOrigin(0.5, 0.5);

        resumeButton.on("pointerdown", () => {
            this.scene.setActive(false);
            this.scene.setVisible(false);
            this.scene.resume("PlayScene");
        });

        let resumeText = this.add.text(width / 2, height / 2, "Resume", {
            font: "28px monospace",
            color: "#ffffff"
        });
        resumeText.setOrigin(0.5, 0.5);
        Phaser.Display.Align.In.Center(resumeText, resumeButton);

        let container = this.add.container(width / 2, height / 2, [
            background,
            gamePausedText,
            soundButton,
            soundButtonText,
            resumeButton,
            resumeText
        ]);
    }
}
