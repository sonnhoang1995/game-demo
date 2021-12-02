import { LoadingScene } from "./scenes/loading-scene";
import { MenuScene } from "./scenes/menu-scene";
import { PlayScene } from "./scenes/play-scene";

export const FlappyBirdGameConfig: Phaser.Types.Core.GameConfig = {
    title: "Flappy Bird",
    url: "https://github.com/digitsensitive/phaser3-typescript",
    version: "2.0",
    width: 390,
    height: 600,
    type: Phaser.AUTO,
    parent: "game",
    scene: [LoadingScene, MenuScene, PlayScene],
    input: {
        keyboard: true
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 }
        }
    },
    backgroundColor: "#98d687",
    render: { pixelArt: true, antialias: false }
};
