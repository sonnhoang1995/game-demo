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

        let popup = this.add.rectangle(
            width / 2,
            height / 2,
            width / 2,
            height / 2,
            0x808080
        );
        popup.setAlpha(0.5);

        let gamePausedText = this.add.text(0, 0, "Game Paused!!!", {
            font: "56px monospace",
            color: "#ffffff"
        });
        gamePausedText.setOrigin(0.5, 0.5);
        Phaser.Display.Align.In.TopCenter(gamePausedText, popup, 0, -40);

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
        Phaser.Display.Align.In.Center(soundButton, popup);

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
            .rectangle(0, 0, 240, 80, 0xaa0000)
            .setInteractive({ cursor: "pointer" });
        resumeButton.setOrigin(0.5, 0.5);
        Phaser.Display.Align.In.BottomCenter(resumeButton, popup, 0, -40);

        resumeButton.on("pointerdown", () => {
            this.scene.setActive(false);
            this.scene.setVisible(false);
            this.scene.resume("PlayScene");
        });

        let playText = this.add.text(width / 2, height / 2, "Resume", {
            font: "28px monospace",
            color: "#ffffff"
        });
        playText.setOrigin(0.5, 0.5);
        Phaser.Display.Align.In.Center(playText, resumeButton);
    }
}
