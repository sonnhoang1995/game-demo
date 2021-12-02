import { PlayScene } from "./scenes/play-scene";

export const CoinRunnerGameConfig: Phaser.Types.Core.GameConfig = {
    title: "Coin Runner",
    url: "https://github.com/digitsensitive/phaser3-typescript",
    version: "2.0",
    width: 768,
    height: 576,
    type: Phaser.AUTO,
    parent: "game",
    scene: [PlayScene],
    input: {
        keyboard: true
    },
    backgroundColor: "#3A99D9",
    render: { pixelArt: false, antialias: false }
};
