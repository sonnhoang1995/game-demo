import "./styles/button";
import "./styles/text";
import "./styles/object";
import { GameWorld } from "./t-rex-clone/GameWorld";

const myButton = document.getElementById("my-button")!;
let gameWorld = new GameWorld();
gameWorld.gameLoop.initialize();

