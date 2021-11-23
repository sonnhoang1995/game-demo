// import { Game } from "./simple-engine/game/Game";
// import { GameOverScene } from "./t-rex-clone/GameOverScene";
// import { PlayScene } from "./t-rex-clone/PlayScene";
import Phaser from "phaser";
import "./styles/button";
import "./styles/object";
import "./styles/text";
import { GameOverScene } from "./t-rex-clone/GameOverScene";
import { LoadingScene } from "./t-rex-clone/LoadingScene";
import { PlayScene } from "./t-rex-clone/PlayScene";

var config = {
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

new Phaser.Game(config);

