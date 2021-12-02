import CursorImage from "../../../assets/images/blocks-clone/cursor.png";
import BlockSprite from "../../../assets/sprites/blocks-clone/blocksprite.png";

export class LoadingScene extends Phaser.Scene {
    constructor() {
        super({
            key: "LoadingScene"
        });
    }

    preload(): void {
        // set the background, create the loading and progress bar and init values
        // with the global data manager (= this.registry)
        this.cameras.main.setBackgroundColor(0x000000);

        let loadingBar = this.add.graphics();
        loadingBar.fillStyle(0xffffff, 1);
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
                progressBar.fillStyle(0x88e453, 1);
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

        this.load.spritesheet("Block", BlockSprite, {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.image("Cursor", CursorImage);
    }

    update(): void {
        this.scene.start("PlayScene");
    }
}
