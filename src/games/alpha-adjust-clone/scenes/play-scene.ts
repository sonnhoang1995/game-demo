import CrystalImage from "../../../assets/images/alpha-adjust-clone/crystal.png";
import { CloneCrystal } from "../objects/clone-crystal";
import { OriginalCrystal } from "../objects/original-crystal";

export class PlayScene extends Phaser.Scene {
    private cloneCrystal?: CloneCrystal;
    private originalCrystal?: OriginalCrystal;
    private playerHasClicked?: boolean;
    private alphaDifferenceText?: Phaser.GameObjects.Text | null;
    private feedbackText?: Phaser.GameObjects.Text | null;

    constructor() {
        super({
            key: "PlayScene"
        });
    }

    preload(): void {
        this.load.image("crystal", CrystalImage);
    }

    init(): void {
        this.playerHasClicked = false;
        this.alphaDifferenceText = null;
        this.feedbackText = null;
    }

    create(): void {
        // create game objects
        this.cloneCrystal = new CloneCrystal({
            scene: this,
            x: this.sys.canvas.width / 2 - 150,
            y: this.sys.canvas.height / 2,
            texture: "crystal"
        });

        this.originalCrystal = new OriginalCrystal({
            scene: this,
            x: this.sys.canvas.width / 2 + 150,
            y: this.sys.canvas.height / 2,
            texture: "crystal",
            alpha: Phaser.Math.RND.realInRange(0, 1)
        });

        this.input.on(
            "pointerdown",
            () => {
                if (!this.playerHasClicked) {
                    this.playerHasClicked = true;
                } else {
                    this.scene.start("PlayScene");
                }
            },
            this
        );
    }

    update(): void {
        if (!this.playerHasClicked && this.cloneCrystal) {
            this.cloneCrystal.update();
        } else {
            let difference = this.calculateAlphaDifference();
            this.createResultTexts(difference);
        }
    }

    private calculateAlphaDifference(): number {
        if (this.cloneCrystal && this.originalCrystal) {
            return Math.abs(
                this.cloneCrystal.alpha - this.originalCrystal.alpha
            );
        }
        return 0;
    }

    private createResultTexts(difference: number): void {
        this.alphaDifferenceText = this.add.text(
            this.sys.canvas.width / 2 - 100,
            this.sys.canvas.height / 2 + 100,
            difference.toFixed(2) + "",
            {
                fontFamily: "Arial",
                fontSize: 100 + "px",
                stroke: "#000000",
                strokeThickness: 8,
                color: "#ffffff"
            }
        );

        let textConfig: Phaser.Types.GameObjects.Text.TextStyle = {
            fontFamily: "Arial",
            fontSize: 50 + "px",
            stroke: "#000000",
            strokeThickness: 8,
            color: "#ffffff"
        };

        if (difference >= 0.5) {
            this.feedbackText = this.add.text(
                this.sys.canvas.width / 2 - 250,
                this.sys.canvas.height / 2 - 150,
                "You can do better!",
                textConfig
            );
        } else if (difference < 0.5 && difference >= 0.3) {
            this.feedbackText = this.add.text(
                this.sys.canvas.width / 2 - 40,
                this.sys.canvas.height / 2 - 150,
                "OK!",
                textConfig
            );
        } else if (difference < 0.3 && difference >= 0.1) {
            this.feedbackText = this.add.text(
                this.sys.canvas.width / 2 - 90,
                this.sys.canvas.height / 2 - 150,
                "Great!",
                textConfig
            );
        } else if (difference < 0.1) {
            this.feedbackText = this.add.text(
                this.sys.canvas.width / 2 - 145,
                this.sys.canvas.height / 2 - 150,
                "Wonderful!",
                textConfig
            );
        }
    }
}
