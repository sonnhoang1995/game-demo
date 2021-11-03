import { Zombie } from "./Zombie";
import { Enemy } from "./Enemy";
import { Background } from "./Background";
import { Player } from "./Player";
import { Score } from "./Score";
import { Popup } from "./Popup";

export class GameWorld {
    myText: HTMLElement;
    position: number = 0;
    rAF_id: number = 0;
    startTime: DOMHighResTimeStamp = 0;
    elapsedTime: number = 0;
    fps: number = 0;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    rectX: number = 0;
    rectY: number = 0;
    gameTimePassed: number = 0;
    enemies: Enemy[] = [];
    player: Player;
    background: Background;
    score: Score;
    enemySpawnRate: number = 90;
    popup: Popup;

    constructor() {
        this.myText = document.getElementById("my-text")!;
        this.canvas = document.getElementById("my-canvas") as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d")!;
        this.canvas.tabIndex = 1;
        this.canvas.focus();
        this.score = new Score(this.context, 350, 50, 0);
        this.player = new Player({
            context: this.context,
            x: 50,
            y: 350,
            vx: 0,
            vy: -200
        });
        this.background = new Background({
            context: this.context,
            x: 0,
            y: -300,
            vx: 0,
            vy: 0
        });
        this.popup = new Popup(this.context);
    }

    initialize() {
        this.createWorld();
        this.startTime = performance.now();
        requestAnimationFrame(this.loop.bind(this));
    }

    createWorld() {
        this.enemies = [];
    }

    loop(timestamp: DOMHighResTimeStamp) {
        this.elapsedTime = (timestamp - this.startTime) / 1000;
        this.startTime = timestamp;
        this.fps = Math.round(1 / this.elapsedTime);
        this.elapsedTime = Math.min(this.elapsedTime, 0.1);
        this.spawnEnemy();
        this.enemySpawnRate++;
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].update(this.elapsedTime);
        }

        this.handleInput();

        if (this.detectCollision()) {
            cancelAnimationFrame(this.rAF_id);
            // if (confirm("You lose! Play again?")) {
            //     this.player = new Player({
            //         context: this.context,
            //         x: 50,
            //         y: 350,
            //         vx: 0,
            //         vy: -200
            //     });
            //     this.score = new Score(this.context, 350, 50, 0);
            //     this.initialize();
            // }
            this.popup.render();
            return false;
        }

        this.checkScore();
        this.player.update(this.elapsedTime);

        this.clearCanvas();

        this.background.render();

        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].render();
        }

        this.player.render();

        this.score.render();

        this.rAF_id = requestAnimationFrame(this.loop.bind(this));
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    handleInput() {
        this.canvas.addEventListener(
            "keydown",
            this.keyDownEventHandler.bind(this),
            false
        );
        this.canvas.addEventListener(
            "keyup",
            this.keyUpEventHandler.bind(this),
            false
        );
        this.canvas.addEventListener(
            "click",
            this.clickEventHandler.bind(this),
            false
        );
    }

    keyDownEventHandler(event: KeyboardEvent) {
        if (event.code == "ArrowUp") {
            this.player.isJumping = true;
        }
        if (event.code == "ArrowDown") {
            this.player.isDucking = true;
        }
        return false;
    }

    keyUpEventHandler(event: KeyboardEvent) {
        if (event.code == "ArrowDown") {
            this.player.isDucking = false;
        }
        return false;
    }

    clickEventHandler(event: MouseEvent) {
        if (this.detectCollision()) {
            let rect = {
                x: 250,
                y: 100,
                width: 190,
                height: 100
            };
            let mousePosition = this.getMousePosition(this.canvas, event);

            if (this.isInside(mousePosition, rect)) {
                this.player = new Player({
                    context: this.context,
                    x: 50,
                    y: 350,
                    vx: 0,
                    vy: -200
                });
                this.score = new Score(this.context, 350, 50, 0);
                this.initialize();
            }
        }
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
        if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
            return false;
        }

        return true;
    }

    checkScore() {
        if (this.enemies[0] && this.enemies[0].x < 0) {
            this.score.increaseScore();
            this.enemies.shift();
        }
    }

    spawnEnemy() {
        // let newEnemy = Math.round(Math.random())
        //     ? new Zombie({
        //           context: this.context,
        //           x: 800,
        //           y: 350,
        //           vx: -250,
        //           vy: 0
        //       })
        //     : new FlyingMonster({
        //           context: this.context,
        //           x: 800,
        //           y: 300,
        //           vx: -200,
        //           vy: 0
        //       });
        let newEnemy = new Zombie({
            context: this.context,
            x: Math.round(Math.random()) ? 1400 : 1000,
            y: 350,
            vx: -300,
            vy: 0
        });
        if (this.enemySpawnRate == 90) {
            this.enemies.push(newEnemy);
            this.enemySpawnRate = 0;
        }
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

    isInside(
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
