import BackgroundImage from "../assets/images/backgroundimage.png";
import JumpingSprite from "../assets/sprites/jumpingsprite.png";
import RunningSprite from "../assets/sprites/runningsprite.png";
import SlidingSprite from "../assets/sprites/slidingsprite.png";
import ZombieSprite from "../assets/sprites/zombiesprite.png";
import { ImageLoader } from "../simple-engine/image-loader/ImageLoader";
import { InputHandler } from "../simple-engine/input-handler/InputHandler";
import { Scene } from "../simple-engine/scene/Scene";
import { Background } from "./Background";
import { Player } from "./Player";
import { Score } from "./Score";
import { Zombie } from "./Zombie";

export class PlayScene extends Scene {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    player: Player;
    background: Background;
    score: Score;
    enemySpawnRate: number = 90;
    inputHanlder: InputHandler;
    zombies: Zombie[] = [];
    sceneName: string = "Play Scene";
    scene: Scene = new Scene();
    static isRestart: boolean = false;

    constructor() {
        super();
        this.canvas = document.getElementById("my-canvas") as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.canvas.tabIndex = 1;
        this.canvas.focus();
        this.inputHanlder = new InputHandler(this.canvas);
        this.preloadImage();
        this.background = new Background({
            context: this.context,
            x: 0,
            y: -300,
            imageWidth: 1000, // need improvements
            imageHeight: 400, // need improvements
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
        this.player = new Player({
            context: this.context,
            x: 50,
            y: 350,
            vx: 0,
            vy: -200,
            imageHeight: 966, // need improvements
            imageWidth: 1647, // need improvements
            height: 75,
            width: 50,
            image: ImageLoader.getImage("runningsprite")!.src
        });
        this.scene.createScenes(
            this.sceneName,
            [
                this.player.update.bind(this.player),
                this.background.update.bind(this.background)
            ],
            [
                this.background.render.bind(this.background),
                this.player.render.bind(this.player),
                this.score.render.bind(this.score)
            ],
            this.getUserInput.bind(this),
            this.gameLogic.bind(this)
        );
        this.scene.changeScene("Play Scene");
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
            imageWidth: 1000, // need improvements
            imageHeight: 400, // need improvements
            speed: 2,
            image: ImageLoader.getImage("backgroundimage").src
        });
        this.player = new Player({
            context: this.context,
            x: 50,
            y: 350,
            vx: 0,
            vy: -200,
            imageHeight: 966, // need improvements
            imageWidth: 1647, // need improvements
            height: 75,
            width: 50,
            image: ImageLoader.getImage("runningsprite").src
        });
        Scene.currentScene.updateCallbacks = [
            this.player.update.bind(this.player),
            this.background.update.bind(this.background)
        ];
        Scene.currentScene.renderCallbacks = [
            this.background.render.bind(this.background),
            this.player.render.bind(this.player),
            this.score.render.bind(this.score)
        ];
    }

    gameLogic() {
        if (PlayScene.isRestart) {
            this.initialize();
            PlayScene.isRestart = false;
        }
        this.spawnEnemy();
        this.enemySpawnRate++;
        this.checkScore();
        if (this.detectCollision()) {
            this.scene.changeScene("Game Over Scene");
        }
    }

    spawnEnemy() {
        let newZombie = new Zombie({
            context: this.context,
            x: Math.round(Math.random()) ? 1400 : 1000,
            y: 350,
            vx: -300,
            vy: 0,
            imageHeight: 1042, // need improvements
            imageWidth: 1296, // need improvements
            height: 75,
            width: 50,
            image: ImageLoader.getImage("zombiesprite").src
        });
        if (this.enemySpawnRate == 90) {
            Scene.currentScene.renderCallbacks.push(
                newZombie.render.bind(newZombie)
            );
            Scene.currentScene.updateCallbacks.push(
                newZombie.update.bind(newZombie)
            );
            this.zombies.push(newZombie);
            this.enemySpawnRate = 0;
        }
    }

    checkScore() {
        if (this.zombies[0] && this.zombies[0].spriteSheetObject.x < 0) {
            this.score.increaseScore();
            this.zombies.shift();
            Scene.currentScene.updateCallbacks.splice(2, 1);
            Scene.currentScene.renderCallbacks.splice(3, 1);
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
