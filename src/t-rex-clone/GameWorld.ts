import { Zombie } from "./Zombie";
import { Background } from "./Background";
import { Player } from "./Player";
import { Score } from "./Score";
import { Popup } from "./Popup";
import { GameLoop } from "../simple-engine/game-loop/GameLoop";
import { InputHandler } from "../simple-engine/input-handler/InputHandler";

export class GameWorld {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    rectX: number = 0;
    rectY: number = 0;
    player: Player;
    background: Background;
    score: Score;
    enemySpawnRate: number = 90;
    popup: Popup;
    inputHanlder: InputHandler;
    gameLoop: GameLoop;
    zombies: Zombie[] = [];

    constructor() {
        this.canvas = document.getElementById("my-canvas") as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d")!;
        this.canvas.tabIndex = 1;
        this.canvas.focus();
        this.inputHanlder = new InputHandler(this.canvas);
        this.score = new Score({
            context: this.context,
            text: "Score",
            x: 350,
            y: 50,
            value: 0
        });
        this.background = new Background(this.context, this.canvas);
        this.player = new Player(
            {
                context: this.context,
                x: 50,
                y: 350,
                vx: 0,
                vy: -200
            },
            this.canvas,
            this.getUserInput.bind(this)
        );
        this.popup = new Popup({
            context: this.context,
            x: 250,
            y: 150,
            width: 250,
            height: 100
        });
        this.gameLoop = new GameLoop(
            this.canvas,
            this.player.userInput,
            [
                this.background.render.bind(this.background),
                this.player.render.bind(this.player),
                this.score.render.bind(this.score)
            ],
            [this.player.update.bind(this.player)],
            this.gameLogic.bind(this)
        );
    }

    initialize() {
        this.zombies = [];
        this.enemySpawnRate = 90;
        this.score = new Score({
            context: this.context,
            text: "Score",
            x: 350,
            y: 50,
            value: 0
        });
        this.background = new Background(this.context, this.canvas);
        this.player = new Player(
            {
                context: this.context,
                x: 50,
                y: 350,
                vx: 0,
                vy: -200
            },
            this.canvas,
            this.getUserInput.bind(this)
        );
        this.gameLoop.handleUserInput = this.player.userInput.bind(this.player);
        this.gameLoop.renderCallbacks = [
            this.background.render.bind(this.background),
            this.player.render.bind(this.player),
            this.score.render.bind(this.score)
        ];
        this.gameLoop.updateCallbacks = [this.player.update.bind(this.player)];
        this.gameLoop.gameLogic = this.gameLogic.bind(this);
        this.gameLoop.isGameOver = false;
        this.gameLoop.initialize();
    }

    gameLogic() {
        this.spawnEnemy();
        this.enemySpawnRate++;
        this.checkScore();
        if (this.detectCollision()) {
            cancelAnimationFrame(this.gameLoop.rAF_id);
            this.gameLoop.renderCallbacks.push(
                this.popup.render.bind(this.popup)
            );
            this.gameLoop.isGameOver = true;
        }
    }

    spawnEnemy() {
        let newZombie = new Zombie(
            {
                context: this.context,
                x: Math.round(Math.random()) ? 1400 : 1000,
                y: 350,
                vx: -300,
                vy: 0
            },
            this.canvas
        );
        if (this.enemySpawnRate == 90) {
            this.gameLoop.updateCallbacks.push(
                newZombie.update.bind(newZombie)
            );
            this.gameLoop.renderCallbacks.push(
                newZombie.render.bind(newZombie)
            );
            this.zombies.push(newZombie);
            this.enemySpawnRate = 0;
        }
    }

    checkScore() {
        if (this.zombies[0] && this.zombies[0].x < 0) {
            this.score.increaseScore();
            this.zombies.shift();
            this.gameLoop.updateCallbacks.splice(1, 1);
            this.gameLoop.renderCallbacks.splice(3, 1);
        }
    }

    detectCollision() {
        let zombie: Zombie;

        for (let i = 0; i < this.zombies.length; i++) {
            zombie = this.zombies[i];
            if (
                this.rectIntersect(
                    this.player.x,
                    this.player.y,
                    this.player.width,
                    this.player.height,
                    zombie.x,
                    zombie.y,
                    zombie.width,
                    zombie.height
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

    getUserInput() {
        const inputHandler = new InputHandler(this.canvas);
        inputHandler.handleKeydownInput("ArrowUp", () => {
            this.player.isJumping = true;
        });
        inputHandler.handleKeydownInput("ArrowDown", () => {
            this.player.isDucking = true;
        });
        inputHandler.handleKeyupInput("ArrowDown", () => {
            this.player.isDucking = false;
        });
        inputHandler.handleClickInput(
            { x: 250, y: 150, width: 250, height: 100 },
            () => {
                if (this.detectCollision()) this.initialize();
            }
        );
    }
}
