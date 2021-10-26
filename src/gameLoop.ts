export class GameLoop {
    myText: HTMLElement;
    position: number = 0;
    rAF_id: number = 0;
    startTime: DOMHighResTimeStamp = 0;
    elapsedTime: number = 0;
    fps: number = 0;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    myObject: HTMLElement;
    rectX: number = 0;
    rectY: number = 0;

    constructor() {
        this.myText = document.getElementById("my-text")!;
        this.canvas = document.getElementById("my-canvas") as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d")!;
        this.myObject = document.getElementById("my-object")!;
    }

    initialize() {
        this.startTime = performance.now();
        requestAnimationFrame(this.loop);
    }
    
    loop = (timestamp: DOMHighResTimeStamp) => {
        console.log(this)
        this.elapsedTime = timestamp - this.startTime;
        this.startTime = timestamp;
        console.log("elapsedTime :>> ", this.elapsedTime);
        this.fps = Math.round(1000 / this.elapsedTime);
        this.update();
        this.render();
        this.position == 60
            ? cancelAnimationFrame(this.rAF_id)
            : (this.rAF_id = requestAnimationFrame(this.loop));
    }

    update() {
        this.position++;
        this.rectX++;
        this.rectY++;
    }

    render() {
        this.context.fillStyle = "black";
        this.context.fillRect(this.position, 0, 10, 10);
        this.myObject.style.transform = `translateX(${this.position}px)`;
        this.myText.innerText = this.fps.toString();
    }
}
