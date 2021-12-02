import BallImage from "../../../assets/images/clocks-clone/ball.png";
import BigClockFaceImage from "../../../assets/images/clocks-clone/bigclockface.png";
import SmallClockFaceImage from "../../../assets/images/clocks-clone/smallclockface.png";
import BigClockImage from "../../../assets/sprites/clocks-clone/bigclock.png";
import BigHandImage from "../../../assets/sprites/clocks-clone/bighand.png";
import SmallClockImage from "../../../assets/sprites/clocks-clone/smallclock.png";
import SmallHandImage from "../../../assets/sprites/clocks-clone/smallhand.png";

export class LoadingScene extends Phaser.Scene {
    constructor() {
        super({
            key: "LoadingScene"
        });
    }

    preload(): void {
        // set the background and create loading bar
        //this.cameras.main.setBackgroundColor(0x98d687);
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

        this.load.image("ball", BallImage);
        this.load.image("smallclockface", SmallClockFaceImage);
        this.load.image("bigclockface", BigClockFaceImage);
        this.load.spritesheet("bigclock", BigClockImage, {
            frameWidth: 140,
            frameHeight: 140
        });
        this.load.spritesheet("bighand", BigHandImage, {
            frameWidth: 140,
            frameHeight: 140
        });
        this.load.spritesheet("smallclock", SmallClockImage, {
            frameWidth: 70,
            frameHeight: 70
        });

        this.load.spritesheet("smallhand", SmallHandImage, {
            frameWidth: 70,
            frameHeight: 70
        });
    }

    update(): void {
        this.scene.start("PlayScene");
    }
}
