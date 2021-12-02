import { LoadingScene } from "./scenes/loading-scene";
import { PlayScene } from "./scenes/play-scene";

export const ClocksGameConfig: Phaser.Types.Core.GameConfig = {
    title: "Clocks",
    url: "https://github.com/digitsensitive/phaser3-typescript",
    version: "1.0",
    type: Phaser.AUTO,
    scene: [LoadingScene, PlayScene],
    input: {
        keyboard: true
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 }
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "game",
        width: 640,
        height: 960
    },
    backgroundColor: 0x4ac7ff
};
