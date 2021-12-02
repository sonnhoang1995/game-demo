import CookieImage1 from "../../../assets/images/candy-crush-clone/cookie1.png";
import CookieImage2 from "../../../assets/images/candy-crush-clone/cookie2.png";
import CroissantImage from "../../../assets/images/candy-crush-clone/croissant.png";
import CupcakeImage from "../../../assets/images/candy-crush-clone/cupcake.png";
import DonutImage from "../../../assets/images/candy-crush-clone/donut.png";
import EclairImage from "../../../assets/images/candy-crush-clone/eclair.png";
import MacaroonImage from "../../../assets/images/candy-crush-clone/macaroon.png";
import PieImage from "../../../assets/images/candy-crush-clone/pie.png";
import PoptartImage1 from "../../../assets/images/candy-crush-clone/poptart1.png";
import PoptartImage2 from "../../../assets/images/candy-crush-clone/poptart2.png";
import StarCookieImage1 from "../../../assets/images/candy-crush-clone/starcookie1.png";
import StarCookieImage2 from "../../../assets/images/candy-crush-clone/starcookie2.png";

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

        this.load.image("cookie1", CookieImage1);
        this.load.image("cookie2", CookieImage2);
        this.load.image("croissant", CroissantImage);
        this.load.image("cupcake", CupcakeImage);
        this.load.image("donut", DonutImage);
        this.load.image("eclair", EclairImage);
        this.load.image("macaroon", MacaroonImage);
        this.load.image("pie", PieImage);
        this.load.image("poptart1", PoptartImage1);
        this.load.image("poptart2", PoptartImage2);
        this.load.image("starcookie1", StarCookieImage1);
        this.load.image("starcookie2", StarCookieImage2);
    }

    update(): void {
        this.scene.start("PlayScene");
    }
}
