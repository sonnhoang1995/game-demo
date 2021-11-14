import { Game } from "./simple-engine/game/Game";
import "./styles/button";
import "./styles/object";
import "./styles/text";
import { GameOverScene } from "./t-rex-clone/GameOverScene";
import { PlayScene } from "./t-rex-clone/PlayScene";

new PlayScene();
new GameOverScene();
const game = new Game();
game.initialize();

