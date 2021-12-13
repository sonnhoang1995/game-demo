import BackgroundImage from "../../../assets/images/coin-runner-clone/background.png";
import CoinImage from "../../../assets/images/coin-runner-clone/coin.png";
import PlayerImage from "../../../assets/images/coin-runner-clone/player.png";
import FlaresImage from "../../../assets/particles/flares.png";
import { Coin } from "../objects/coin";
import { Player } from "../objects/player";

export class PlayScene extends Phaser.Scene {
    private background?: Phaser.GameObjects.Image;
    private coin?: Coin;
    private coinsCollectedText!: Phaser.GameObjects.Text;
    private collectedCoins!: number;
    private player?: Player;

    constructor() {
        super({
            key: "PlayScene"
        });
    }

    preload(): void {
        this.load.image("background", BackgroundImage);
        this.load.image("player", PlayerImage);
        this.load.image("coin", CoinImage);
        this.load.spritesheet("flares", FlaresImage, {
            frameWidth: 128,
            frameHeight: 128
        });
    }

    init(): void {
        this.collectedCoins = 0;
    }

    create(): void {
        // create background
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0, 0);

        // create objects
        this.coin = new Coin({
            scene: this,
            x: Phaser.Math.RND.integerInRange(100, 700),
            y: Phaser.Math.RND.integerInRange(100, 500),
            texture: "coin"
        });
        this.player = new Player({
            scene: this,
            x: this.sys.canvas.width / 2,
            y: this.sys.canvas.height / 2,
            texture: "player"
        });

        // create texts
        this.coinsCollectedText = this.add.text(
            this.sys.canvas.width / 2,
            this.sys.canvas.height - 50,
            this.collectedCoins + "",
            {
                fontFamily: "Arial",
                fontSize: 38 + "px",
                stroke: "#fff",
                strokeThickness: 6,
                color: "#000000"
            }
        );
    }

    update(): void {
        if (this.player && this.coin) {
            // update objects

            this.player.update();
            this.coin.update();

            // do the collision check
            if (
                Phaser.Geom.Intersects.RectangleToRectangle(
                    this.player.getBounds(),
                    this.coin.getBounds()
                )
            ) {
                this.updateCoinStatus();
            }
        }
    }

    private updateCoinStatus(): void {
        this.collectedCoins++;
        this.coinsCollectedText.setText(this.collectedCoins + "");
        if (this.coin) this.coin.changePosition();
    }
}
