import { PlayScene } from "./scenes/play-scene";

export const EndlessRunnerGameConfig: Phaser.Types.Core.GameConfig = {
    title: "Endless Runner",
    url: "https://github.com/digitsensitive/phaser3-typescript",
    version: "1.0",
    type: Phaser.AUTO,
    scene: [PlayScene],
    input: {
        mouse: true
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 800 }
        }
    },
    scale: {
        mode: Phaser.Scale.NONE,
        parent: "game",
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 960,
        height: 640
    },
    backgroundColor: 0x4ac7ff
};
