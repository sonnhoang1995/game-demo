import Phaser from "phaser";
import Coin2Spritesheet from "../assets/collectibles/coin2.png";
import FlowerSpritesheet from "../assets/collectibles/flower.png";
import HeartSpritesheet from "../assets/collectibles/heart.png";
import MushroomSpritesheet from "../assets/collectibles/mushroom.png";
import StarSpritesheet from "../assets/collectibles/star.png";
import MarioFont from "../assets/font/superMarioLand.fnt";
import MarioFontImage from "../assets/font/superMarioland.png";
import PlatformImage from "../assets/images/platform.png";
import TitleImage from "../assets/images/title.png";
import BoxSpritesheet from "../assets/sprites/box.png";
import BrickSpritesheet from "../assets/sprites/brick.png";
import BulletSpriteSheet from "../assets/sprites/bullet.png";
import CoinSpritesheet from "../assets/sprites/coin.png";
import GoombaSpritesheet from "../assets/sprites/goomba.png";
import MarioSpritesheet from "../assets/sprites/mario.png";
import RotatingCoinSpritesheet from "../assets/sprites/rotatingCoin.png";
import TilesImage from "../assets/tiles/tiles.png";
import { AnimationHelper } from "../helpers/animation-helper";

export class LoadingScene extends Phaser.Scene {
    // helpers
    private animationHelperInstance!: AnimationHelper;

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
                this.animationHelperInstance = new AnimationHelper(
                    this,
                    this.cache.json.get("animationJSON")
                );
            },
            this
        );

        // load our package
        // this.load.pack("preload", require("../assets/pack.json"), "preload");
        this.load.json(
            "animationJSON",
            require("../assets/animations/animations.json")
        );
        this.load.bitmapFont("font", MarioFontImage, MarioFont);

        this.load.tilemapTiledJSON(
            "level1",
            require("../assets/maps/level1.json")
        );
        this.load.tilemapTiledJSON(
            "level1Room1",
            require("../assets/maps/level1Room1.json")
        );
        this.load.tilemapTiledJSON(
            "level1Room2",
            require("../assets/maps/level1Room2.json")
        );
        this.load.tilemapTiledJSON(
            "level2",
            require("../assets/maps/level2.json")
        );
        this.load.tilemapTiledJSON(
            "level3",
            require("../assets/maps/level3.json")
        );

        this.load.image("tiles", TilesImage);

        this.load.spritesheet("mario", MarioSpritesheet, {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("box", BoxSpritesheet, {
            frameWidth: 8,
            frameHeight: 8
        });
        this.load.spritesheet("brick", BrickSpritesheet, {
            frameWidth: 8,
            frameHeight: 8
        });
        this.load.spritesheet("rotatingCoin", RotatingCoinSpritesheet, {
            frameWidth: 8,
            frameHeight: 8
        });
        this.load.spritesheet("coin", CoinSpritesheet, {
            frameWidth: 8,
            frameHeight: 8
        });
        this.load.spritesheet("goomba", GoombaSpritesheet, {
            frameWidth: 8,
            frameHeight: 8
        });
        this.load.spritesheet("bullet", BulletSpriteSheet, {
            frameWidth: 8,
            frameHeight: 8
        });

        this.load.image("platform", PlatformImage);
        this.load.image("title", TitleImage);

        this.load.spritesheet("coin2", Coin2Spritesheet, {
            frameWidth: 8,
            frameHeight: 8
        });
        this.load.spritesheet("flower", FlowerSpritesheet, {
            frameWidth: 8,
            frameHeight: 8
        });
        this.load.spritesheet("heart", HeartSpritesheet, {
            frameWidth: 8,
            frameHeight: 8
        });
        this.load.spritesheet("mushroom", MushroomSpritesheet, {
            frameWidth: 8,
            frameHeight: 8
        });
        this.load.spritesheet("star", StarSpritesheet, {
            frameWidth: 8,
            frameHeight: 8
        });
    }

    update(): void {
        this.scene.start("MenuScene");
    }
}
