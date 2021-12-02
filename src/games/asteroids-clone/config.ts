import { MenuScene } from "./scenes/menu-scene";
import { PlayScene } from "./scenes/play-scene";

export const AsteroidGameConfig: Phaser.Types.Core.GameConfig = {
    title: "Asteroid",
    url: "https://github.com/digitsensitive/phaser3-typescript",
    version: "2.0",
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: "game",
    scene: [MenuScene, PlayScene],
    input: {
        keyboard: true,
        mouse: false,
        touch: false,
        gamepad: false
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    backgroundColor: "#000000",
    render: { pixelArt: false, antialias: true }
};
