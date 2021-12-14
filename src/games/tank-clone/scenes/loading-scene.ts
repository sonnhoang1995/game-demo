import Font from "../assets/font/font.fnt";
import FontPng from "../assets/font/font.png";
import BarrelGreySideRustPng from "../assets/obstacles/barrel-grey-side-rust.png";
import BarrelGreySidePng from "../assets/obstacles/barrel-grey-side.png";
import BarrelGreyTopPng from "../assets/obstacles/barrel-grey-top.png";
import BarrelRedSidePng from "../assets/obstacles/barrel-red-side.png";
import BarrelRedTopPng from "../assets/obstacles/barrel-red-top.png";
import TreeLargePng from "../assets/obstacles/tree-large.png";
import TreeSmallPng from "../assets/obstacles/tree-small.png";
import TankHitSound from "../assets/sounds/tank-hit.wav";
import TankShootSound from "../assets/sounds/tank-shoot.mp3";
import BarrelBluePng from "../assets/sprites/barrel-blue.png";
import BarrelRedPng from "../assets/sprites/barrel-red.png";
import BulletBluePng from "../assets/sprites/bullet-blue.png";
import BulletRedPng from "../assets/sprites/bullet-red.png";
import TankBluePng from "../assets/sprites/tank-blue.png";
import TankRedPng from "../assets/sprites/tank-red.png";
import TilesPng from "../assets/tiles/tiles.png";

export class LoadingScene extends Phaser.Scene {
    constructor() {
        super({
            key: "LoadingScene"
        });
    }

    preload(): void {
        // set the background, create the loading and progress bar
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
            function () {
                progressBar.destroy();
                loadingBar.destroy();
            },
            this
        );

        // load our package

        this.load.tilemapTiledJSON(
            "levelMap",
            require("../assets/maps/levelMap.json")
        );
        this.load.bitmapFont("font", FontPng, Font);
        this.load.image("tankBlue", TankBluePng);
        this.load.image("tankRed", TankRedPng);
        this.load.image("barrelBlue", BarrelBluePng);
        this.load.image("barrelRed", BarrelRedPng);
        this.load.image("bulletBlue", BulletBluePng);
        this.load.image("bulletRed", BulletRedPng);
        this.load.image("tiles", TilesPng);
        this.load.image("barrelGreyTop", BarrelGreyTopPng);
        this.load.image("barrelGreySideRust", BarrelGreySideRustPng);
        this.load.image("barrelGreySide", BarrelGreySidePng);
        this.load.image("barrelRedTop", BarrelRedTopPng);
        this.load.image("barrelRedSide", BarrelRedSidePng);
        this.load.image("treeSmall", TreeSmallPng);
        this.load.image("treeLarge", TreeLargePng);
        this.load.audio("tankShoot", TankShootSound);
        this.load.audio("tankHit", TankHitSound);
    }

    update(): void {
        this.scene.start("MenuScene");
    }
}
