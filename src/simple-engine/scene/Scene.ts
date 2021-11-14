interface IScene {
    sceneName: string;
    updateCallbacks: { (elapsedTime: number): void }[];
    renderCallbacks: { (): void }[];
    sceneUserInput: () => void;
    sceneLogic: () => void;
}

export class Scene {
    static currentScene: IScene;
    static scenes: IScene[] = [];
    static sceneUserInput: () => void
    static sceneLogic: () => void;

    constructor() {}

    createScenes(
        sceneName: string,
        updateCallbacks: { (elapsedTime: number): void }[],
        renderCallbacks: { (): void }[],
        sceneUserInput: () => void,
        sceneLogic: () => void
    ) {
        Scene.scenes.push({
            sceneName,
            updateCallbacks,
            renderCallbacks,
            sceneUserInput,
            sceneLogic
        });
    }

    changeScene(sceneName: string) {
        const scene = Scene.scenes.find(
            (scene) => scene.sceneName == sceneName
        );
        Scene.currentScene = scene
            ? scene
            : {
                  sceneName: "notFoundScene",
                  updateCallbacks: [],
                  renderCallbacks: [],
                  sceneUserInput: () => {},
                  sceneLogic: () => {}
              };
    }
}
