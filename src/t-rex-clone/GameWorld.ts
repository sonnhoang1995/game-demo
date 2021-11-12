import BackgroundImage from "../assets/images/backgroundimage.png";
import JumpingSprite from "../assets/sprites/jumpingsprite.png";
import RunningSprite from "../assets/sprites/runningsprite.png";
import SlidingSprite from "../assets/sprites/slidingsprite.png";
import ZombieSprite from "../assets/sprites/zombiesprite.png";
import { Game } from "../simple-engine/game/Game";
import { ImageLoader } from "../simple-engine/image-loader/ImageLoader";
import { InputHandler } from "../simple-engine/input-handler/InputHandler";
import { Background } from "./Background";
import { Player } from "./Player";
import { Popup } from "./Popup";
import { Score } from "./Score";
import { Zombie } from "./Zombie";

export class GameWorld {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    player: Player;
    background: Background;
    score: Score;
    enemySpawnRate: number = 90;
    popup: Popup;
    inputHanlder: InputHandler;
    game: Game;
    zombies: Zombie[] = [];

    constructor() {
        this.canvas = document.getElementById("my-canvas") as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d")!;
        this.canvas.tabIndex = 1;
        this.canvas.focus();
        this.inputHanlder = new InputHandler(this.canvas);
        this.preloadImage();
        this.background = new Background({
            context: this.context,
            x: 0,
            y: -300,
            imageWidth: 1000,
            imageHeight: 400,
            speed: 2,
            image: ImageLoader.getImage("backgroundimage")!.src
        });
        this.score = new Score({
            context: this.context,
            text: "Score",
            x: 350,
            y: 50,
            value: 0,
            fontSize: 24,
            fontStyle: "Arial",
            align: "center",
            color: "black"
        });
        this.player = new Player(
            {
                context: this.context,
                x: 50,
                y: 350,
                vx: 0,
                vy: -200,
                imageHeight: 966, // need improve
                imageWidth: 1647, // need improve
                height: 75,
                width: 50,
                image: ImageLoader.getImage("runningsprite")!.src
            },
            this.getUserInput.bind(this)
        );
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
            fontSize: 24,
        });
        this.game = new Game(
            this.canvas,
            this.player.userInput,
            [
                this.background.render.bind(this.background),
                this.player.render.bind(this.player),
                this.score.render.bind(this.score)
            ],
            [
                this.player.update.bind(this.player),
                this.background.update.bind(this.background)
            ],
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
            value: 0,
            fontSize: 24,
            fontStyle: "Arial",
            align: "center",
            color: "black"
        });
        this.background = new Background({
            context: this.context,
            x: 0,
            y: -300,
            imageWidth: 1000,
            imageHeight: 400,
            speed: 2,
            image: ImageLoader.getImage("backgroundimage")!.src
        });
        this.player = new Player(
            {
                context: this.context,
                x: 50,
                y: 350,
                vx: 0,
                vy: -200,
                imageHeight: 966,
                imageWidth: 1647,
                height: 75,
                width: 50,
                image: ImageLoader.getImage("runningsprite")!.src
            },
            this.getUserInput.bind(this)
        );
        this.game.handleUserInput = this.player.userInput.bind(this.player);
        this.game.renderCallbacks = [
            this.background.render.bind(this.background),
            this.player.render.bind(this.player),
            this.score.render.bind(this.score)
        ];
        this.game.updateCallbacks = [
            this.player.update.bind(this.player),
            this.background.update.bind(this.background)
        ];
        this.game.gameLogic = this.gameLogic.bind(this);
        this.game.isGameOver = false;
        this.game.initialize();
    }

    gameLogic() {
        this.spawnEnemy();
        this.enemySpawnRate++;
        this.checkScore();
        if (this.detectCollision()) {
            cancelAnimationFrame(this.game.rAF_id);
            this.game.renderCallbacks.push(this.popup.render.bind(this.popup));
            this.game.isGameOver = true;
        }
    }

    spawnEnemy() {
        let newZombie = new Zombie({
            context: this.context,
            x: Math.round(Math.random()) ? 1400 : 1000,
            y: 350,
            vx: -300,
            vy: 0,
            imageHeight: 1042,
            imageWidth: 1296,
            height: 75,
            width: 50,
            image: ImageLoader.getImage("zombiesprite")!.src
        });
        if (this.enemySpawnRate == 90) {
            this.game.renderCallbacks.push(newZombie.render.bind(newZombie));
            this.game.updateCallbacks.push(newZombie.update.bind(newZombie));
            this.zombies.push(newZombie);
            this.enemySpawnRate = 0;
        }
    }

    checkScore() {
        if (this.zombies[0] && this.zombies[0].spriteSheetObject.x < 0) {
            this.score.increaseScore();
            this.zombies.shift();
            this.game.updateCallbacks.splice(2, 1);
            this.game.renderCallbacks.splice(3, 1);
        }
    }

    detectCollision() {
        let zombie: Zombie;

        for (let i = 0; i < this.zombies.length; i++) {
            zombie = this.zombies[i];
            if (
                this.rectIntersect(
                    this.player.spriteSheetObject.x,
                    this.player.spriteSheetObject.y,
                    this.player.width,
                    this.player.height,
                    zombie.spriteSheetObject.x,
                    zombie.spriteSheetObject.y,
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

    preloadImage() {
        ImageLoader.load([
            { name: "backgroundimage", url: BackgroundImage },
            { name: "zombiesprite", url: ZombieSprite },
            { name: "runningsprite", url: RunningSprite },
            { name: "jumpingsprite", url: JumpingSprite },
            { name: "slidingsprite", url: SlidingSprite }
        ]);
    }
}
