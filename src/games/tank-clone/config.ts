import Phaser from "phaser";
import { LoadingScene } from "./scenes/loading-scene";
import { MenuScene } from "./scenes/menu-scene";
import { PlayScene } from "./scenes/play-scene";
import { UIScene } from "./scenes/ui-scene";

export const TankGameConfig: Phaser.Types.Core.GameConfig = {
    title: "Tank",
    url: "https://github.com/digitsensitive/phaser3-typescript",
    version: "2.0",
    width: 1600,
    height: 1080,
    zoom: 0.6,
    type: Phaser.AUTO,
    parent: "game",
    scene: [LoadingScene, MenuScene, PlayScene, UIScene],
    input: {
        keyboard: true
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    backgroundColor: "#000000",
    render: { pixelArt: false, antialias: true }
};
