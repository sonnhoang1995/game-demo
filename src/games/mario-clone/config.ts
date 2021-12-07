import Phaser from "phaser";
import { HUDScene } from "./scenes/hud-scene";
import { LoadingScene } from "./scenes/loading-scene";
import { MenuScene } from "./scenes/menu-scene";
import { PlayScene } from "./scenes/play-scene";

export const MarioGameConfig: Phaser.Types.Core.GameConfig = {
    title: "Super Mario Land",
    url: "https://github.com/digitsensitive/phaser3-typescript",
    version: "2.0",
    width: 288,
    height: 144,
    zoom: 4,
    type: Phaser.AUTO,
    parent: "game",
    scene: [LoadingScene, HUDScene, MenuScene, PlayScene],
    loader: {
        baseURL: "assets/"
    },
    input: {
        keyboard: true
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 475 },
            debug: false
        }
    },
    backgroundColor: "#f8f8f8",
    // render: { antialias: false }
};
