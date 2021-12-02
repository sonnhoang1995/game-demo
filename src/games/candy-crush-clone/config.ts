import { LoadingScene } from "./scenes/loading-scene";
import { PlayScene } from "./scenes/play-scene";

export const CandyCrushGameConfig: Phaser.Types.Core.GameConfig = {
    title: "Candy crush",
    url: "https://github.com/digitsensitive/phaser3-typescript",
    version: "2.0",
    width: 520,
    height: 700,
    type: Phaser.AUTO,
    parent: "game",
    scene: [LoadingScene, PlayScene],
    backgroundColor: "#de3412",
    render: { pixelArt: false, antialias: true }
};
