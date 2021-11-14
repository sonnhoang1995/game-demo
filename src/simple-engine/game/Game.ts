import { Scene } from "../scene/Scene";

export class Game {
    elapsedTime: number = 0;
    startTime: DOMHighResTimeStamp = 0;
    fps: number = 0;
    static rAF_id: number = 0;

    constructor() {}

    initialize() {
        requestAnimationFrame(this.loop.bind(this));
    }

    loop(timestamp: DOMHighResTimeStamp) {
        this.elapsedTime = (timestamp - this.startTime) / 1000;
        this.startTime = timestamp;
        this.fps = Math.round(1 / this.elapsedTime);
        this.elapsedTime = Math.min(this.elapsedTime, 0.1);

        Scene.currentScene.sceneLogic();

        Scene.currentScene.sceneUserInput();

        this.handleUpdate(this.elapsedTime);

        this.handleRender();

        Game.rAF_id = requestAnimationFrame(this.loop.bind(this));
    }

    handleUpdate(elapsedTime: number) {
        Scene.currentScene.updateCallbacks.forEach((updateCallback) => {
            updateCallback(elapsedTime);
        });
    }

    handleRender() {
        Scene.currentScene.renderCallbacks.forEach((renderCallback) => {
            renderCallback();
        });
    }
}
