import "./styles/button";
import "./styles/text";
import "./styles/object";
import { GameLoop } from "./gameLoop";

const myButton = document.getElementById("my-button")!;
let gameLoop = new GameLoop();

myButton.addEventListener("click", () => {
    gameLoop.initialize();
});
