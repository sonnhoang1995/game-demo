export class GameLoop {
    elapsedTime: number = 0;
    startTime: DOMHighResTimeStamp = 0;
    fps: number = 0;
    rAF_id: number = 0;
    canvas: HTMLCanvasElement;
    handleUserInput: () => void;
    renderCallbacks: { (): void }[] = [];
    updateCallbacks: { (elapsedTime: number): void }[] = [];
    gameLogic: () => void;
    isGameOver: boolean;

    constructor(
        canvas: HTMLCanvasElement,
        handleUserInput: () => void,
        renderCallbacks: { (): void }[],
        updateCallbacks: { (elapsedTime: number): void }[],
        gameLogic: () => void
    ) {
        this.canvas = canvas;
        this.handleUserInput = handleUserInput;
        this.renderCallbacks = renderCallbacks;
        this.updateCallbacks = updateCallbacks;
        this.gameLogic = gameLogic;
        this.isGameOver = false;
    }

    initialize() {
        requestAnimationFrame(this.loop.bind(this));
    }

    loop(timestamp: DOMHighResTimeStamp) {
        if(this.isGameOver) {
            this.handleUserInput = () => {};
            this.renderCallbacks = [];
            this.updateCallbacks = [];
            this.gameLogic = () => {};
            return false;
        }

        this.elapsedTime = (timestamp - this.startTime) / 1000;
        this.startTime = timestamp;
        this.fps = Math.round(1 / this.elapsedTime);
        this.elapsedTime = Math.min(this.elapsedTime, 0.1);

        this.gameLogic();

        this.handleUserInput();
        
        this.handleUpdate(this.elapsedTime);
        
        this.handleRender();

        this.rAF_id = requestAnimationFrame(this.loop.bind(this));
    }

    handleUpdate(elapsedTime: number) {
        this.updateCallbacks.forEach((updateCallback) => {
            updateCallback(elapsedTime);
        });
    }

    handleRender() {
        this.renderCallbacks.forEach((renderCallback) => {
            renderCallback();
        });
    }
}
