import { InputHandler } from "../simple-engine/input-handler/InputHandler";
import { Scene } from "../simple-engine/scene/Scene";
import { PlayScene } from "./PlayScene";
import { Popup } from "./Popup";

export class GameOverScene extends Scene {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    popup: Popup;
    scene: Scene = new Scene();
    sceneName: string = "Game Over Scene";

    constructor() {
        super();
        this.canvas = document.getElementById("my-canvas") as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d")!;
        this.canvas.focus();
        this.popup = new Popup({
            context: this.context,
            x: 250,
            y: 150,
            width: 250,
            height: 100,
            text: "Restart",
            textColor: "#000000",
            backgroundColor: "rgba(225,225,225,0.5)",
            borderWidth: 2,
            borderColor: "#000000",
            fontStyle: "Kremlin Pro Web",
            fontSize: 24
        });
        this.scene.createScenes(
            this.sceneName,
            [],
            [this.popup.render.bind(this.popup)],
            this.getUserInput.bind(this),
            () => {}
        );
    }

    getUserInput() {
        const inputHandler = new InputHandler(this.canvas);
        inputHandler.handleClickInput(
            { x: 250, y: 150, width: 250, height: 100 },
            () => {
                this.scene.changeScene("Play Scene");
                PlayScene.isRestart = true;
            }
        );
    }
}
