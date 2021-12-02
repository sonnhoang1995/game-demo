import Phaser from "phaser";
import Font from "../../../assets/fonts/flappy-bird-clone/font.fnt";
import FontImage from "../../../assets/fonts/flappy-bird-clone/font.png";
import BackgroundImage from "../../../assets/images/flappy-bird-clone/bg.png";
import BirdImage from "../../../assets/images/flappy-bird-clone/bird.png";
import PipeSpritesheet from "../../../assets/sprites/flappy-bird-clone/pipe.png";

export class LoadingScene extends Phaser.Scene {
    constructor() {
        super({
            key: "LoadingScene"
        });
    }

    preload(): void {
        // set the background and create loading bar
        this.cameras.main.setBackgroundColor(0x98d687);
        let loadingBar = this.add.graphics();
        loadingBar.fillStyle(0x5dae47, 1);
        loadingBar.fillRect(
            this.cameras.main.width / 4 - 2,
            this.cameras.main.height / 2 - 18,
            this.cameras.main.width / 2 + 4,
            20
        );
        let progressBar = this.add.graphics();

        // pass value to change the loading bar fill
        this.load.on(
            "progress",
            (value: number) => {
                progressBar.clear();
                progressBar.fillStyle(0xfff6d3, 1);
                progressBar.fillRect(
                    this.cameras.main.width / 4,
                    this.cameras.main.height / 2 - 16,
                    (this.cameras.main.width / 2) * value,
                    16
                );
            },
            this
        );

        // delete bar graphics, when loading complete
        this.load.on(
            "complete",
            () => {
                progressBar.destroy();
                loadingBar.destroy();
            },
            this
        );

        this.load.bitmapFont("font", FontImage, Font);
        this.load.image("background", BackgroundImage);
        this.load.image("bird", BirdImage);
        this.load.spritesheet("pipe", PipeSpritesheet, {
            frameWidth: 20,
            frameHeight: 20
        });
    }

    update(): void {
        this.scene.start("MenuScene");
    }
}
