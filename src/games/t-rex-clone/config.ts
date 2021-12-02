import Phaser from "phaser";
import { GameOverScene } from "./scenes/game-over-scene";
import { LoadingScene } from "./scenes/loading-scene";
import { PlayScene } from "./scenes/play-scene";

export const TRexGameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 1000 }
        }
    },
    scene: [LoadingScene, PlayScene, GameOverScene]
};
