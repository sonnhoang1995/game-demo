import { LoadingScene } from "./scenes/loading-scene";
import { PlayScene } from "./scenes/play-scene";

export const BlocksGameConfig: Phaser.Types.Core.GameConfig = {
    title: "Blocks",
    url: "https://github.com/digitsensitive/phaser3-typescript",
    version: "1.0",
    width: 160,
    height: 144,
    zoom: 3,
    type: Phaser.AUTO,
    parent: "game",
    scene: [LoadingScene, PlayScene],
    backgroundColor: "#24232e",
    render: { pixelArt: true, antialias: false }
};
