interface IRectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class InputHandler {
    canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    handleKeydownInput(key: string, callback: () => void) {
        const keydownEventHandler = (event: KeyboardEvent) => {
            if (key == event.code) callback();
        };
        this.canvas.addEventListener(
            "keydown",
            keydownEventHandler.bind(this),
            false
        );
    }

    handleKeyupInput(key: string, callback: () => void) {
        const keyupEventHandler = (event: KeyboardEvent) => {
            if (key == event.code) callback();
        };
        this.canvas.addEventListener(
            "keyup",
            keyupEventHandler.bind(this),
            false
        );
    }

    handleClickInput(rectangle: IRectangle, callback: () => void) {
        const clickEventHandler = (event: MouseEvent) => {
            let mousePosition = this.getMousePosition(this.canvas, event);
            if (this.isClickInside(mousePosition, rectangle)) callback();
        };
        this.canvas.addEventListener(
            "click",
            clickEventHandler.bind(this),
            false
        );
    }

    getMousePosition(
        canvas: HTMLCanvasElement,
        event: MouseEvent
    ): { x: number; y: number } {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    isClickInside(
        position: { x: number; y: number },
        rect: { x: number; y: number; width: number; height: number }
    ) {
        return (
            position.x > rect.x &&
            position.x < rect.x + rect.width &&
            position.y < rect.y + rect.height &&
            position.y > rect.y
        );
    }
}
