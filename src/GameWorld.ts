import { Bird } from "./Bird";
import { Cactus } from "./Cactus";
import { Enemy } from "./Enemy";
import { Ground } from "./Ground";
import { Player } from "./Player";

export class GameWorld {
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
    gameTimePassed: number = 0;
    enemies: Enemy[] = [];
    player: Player;
    ground: Ground;

    constructor() {
        this.myText = document.getElementById("my-text")!;
        this.canvas = document.getElementById("my-canvas") as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d")!;
        this.myObject = document.getElementById("my-object")!;
        this.canvas.tabIndex = 1;
        this.canvas.focus();
        this.player = new Player({
            context: this.context,
            x: 50,
            y: 350,
            vx: 0,
            vy: -200
        });
        this.ground = new Ground({
            context: this.context,
            x: 0,
            y: 400,
            vx: 0,
            vy: 0
        });
    }

    initialize() {
        this.createWorld();
        this.startTime = performance.now();
        requestAnimationFrame(this.loop.bind(this));
    }

    createWorld() {
        this.enemies = [
            new Cactus({
                context: this.context,
                x: 500,
                y: 325,
                vx: -200,
                vy: 0
            }),
            new Bird({
                context: this.context,
                x: 1000,
                y: 350,
                vx: -200,
                vy: 0
            }),
            new Cactus({
                context: this.context,
                x: 1500,
                y: 325,
                vx: -200,
                vy: 0
            }),
            new Bird({
                context: this.context,
                x: 2000,
                y: 350,
                vx: -200,
                vy: 0
            }),
            new Cactus({
                context: this.context,
                x: 2500,
                y: 325,
                vx: -200,
                vy: 0
            }),
            new Bird({
                context: this.context,
                x: 3000,
                y: 350,
                vx: -200,
                vy: 0
            })
        ];
    }

    loop(timestamp: DOMHighResTimeStamp) {
        this.elapsedTime = (timestamp - this.startTime) / 1000;
        this.startTime = timestamp;
        this.fps = Math.round(1 / this.elapsedTime);
        this.elapsedTime = Math.min(this.elapsedTime, 0.1);

        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].update(this.elapsedTime);
        }

        this.handleInput();

        if (this.detectCollision()) {
            cancelAnimationFrame(this.rAF_id);
            if (confirm("You lose! Play again?")) {
                this.player = new Player({
                    context: this.context,
                    x: 50,
                    y: 350,
                    vx: 0,
                    vy: -200
                });
                this.initialize();
            }
            return false;
        }

        this.player.update(this.elapsedTime);

        this.clearCanvas();

        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].render();
        }

        this.player.render();

        this.ground.render();

        this.rAF_id = requestAnimationFrame(this.loop.bind(this));
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    handleInput() {
        this.canvas.addEventListener(
            "keypress",
            this.keyPressEventHandler.bind(this),
            false
        );
    }

    keyPressEventHandler(event: KeyboardEvent) {
        console.log(event);
        if (event.code == "Space") {
            this.player.isJumping = true;
        }
        return false;
    }

    detectCollision() {
        let enemy: Enemy;

        for (let i = 0; i < this.enemies.length; i++) {
            enemy = this.enemies[i];
            if (
                this.rectIntersect(
                    this.player.x,
                    this.player.y,
                    this.player.width,
                    this.player.height,
                    enemy.x,
                    enemy.y,
                    enemy.width,
                    enemy.height
                )
            ) {
                return true;
            }
        }
    }

    rectIntersect(
        x1: number,
        y1: number,
        w1: number,
        h1: number,
        x2: number,
        y2: number,
        w2: number,
        h2: number
    ) {
        // Check x and y for overlap
        if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
            return false;
        }

        return true;
    }
    // easeInCircular(
    //     time: number,
    //     beginValue: number,
    //     changeValue: number,
    //     duration: number
    // ): number {
    //     return (
    //         -changeValue * (Math.sqrt(1 - (time /= duration) * time) - 1) +
    //         beginValue
    //     );
    // }

    // easeLinear(
    //     time: number,
    //     beginValue: number,
    //     changeValue: number,
    //     duration: number
    // ): number {
    //     return (changeValue * time) / duration + beginValue;
    // }
}
