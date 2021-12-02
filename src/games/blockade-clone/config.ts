import { MenuScene } from "./scenes/menu-scene";
import { PlayScene } from "./scenes/play-scene";

export const BlockadeGameConfig: Phaser.Types.Core.GameConfig = {
    title: "Blockade",
    url: "https://github.com/digitsensitive/phaser3-typescript",
    version: "2.0",
    width: 256,
    height: 224,
    zoom: 3,
    type: Phaser.AUTO,
    parent: "game",
    scene: [MenuScene, PlayScene],
    input: {
        keyboard: true,
        mouse: false,
        touch: false,
        gamepad: false
    },
    backgroundColor: "#000000",
    render: { pixelArt: true, antialias: false }
};
