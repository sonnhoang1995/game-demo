import { Background } from "../objects/background";
import { Player } from "../objects/player";
import { Zombie } from "../objects/zombie";

export class PlayScene extends Phaser.Scene {
    background?: Background;
    player?: Player;
    scoreValue?: Phaser.GameObjects.Text;
    zombies: Zombie[] = [];
    createZombieRate: number = 120;
    score: number = 0;
    gameMusic?: Phaser.Sound.BaseSound;
    gameOverMusic?: Phaser.Sound.BaseSound;

    constructor() {
        super("PlayScene");
    }

    preload() {}
    create() {
        this.gameMusic = this.sound.add("GameMusic");
        this.gameOverMusic = this.sound.add("GameOverMusic");
        this.score = 0;
        this.zombies = [];
        this.createBackground();
        this.createPlayer();
        this.createScore();
        this.createGameMusic();
        this.handleCollision();
    }

    update(time: number, delta: number) {
        this.updateZombies();
        if (this.background) this.background.update();
        if (this.player) this.player.update();
        this.zombies.forEach((zombie) => {
            zombie.update();
        });
    }

    createBackground() {
        this.background = new Background(
            this,
            600,
            300,
            1200,
            600,
            "BackgroundImage"
        );
    }

    createPlayer() {
        this.player = new Player(this, 0, 600, "PlayerRun");
    }

    createZombie() {
        this.zombies.push(new Zombie(this, 1200, 600, "Zombie"));
    }

    handleCollision() {
        if (this.player && this.zombies) {
            this.physics.add.collider(this.player, this.zombies, () => {
                this.scene.setActive(false);
                this.scene.start("GameOverScene", { score: this.score });
                this.player?.anims.stop();
                this.player?.setImmovable(true);
                this.player?.setVelocityY(0);
                (this.player?.body as Phaser.Physics.Arcade.Body).allowGravity =
                    false;
                this.zombies.forEach((zombie) => {
                    zombie.anims.stop();
                    zombie.setImmovable(true);
                    zombie.setVelocityX(0);
                });
                this.gameMusic?.stop();
                this.gameOverMusic?.play();
            });
        }
    }

    updateZombies() {
        if (this.createZombieRate == 120) {
            this.createZombie();
            this.createZombieRate = 0;
        }
        this.createZombieRate++;
        if (this.zombies[0] && this.zombies[0].getBounds().x == 0) {
            this.zombies[0].setVisible(false).setActive(false);
            this.zombies.shift();
            this.score++;
            this.scoreValue?.setText(`${this.score}`);
        }
    }

    createScore() {
        let width = this.cameras.main.width;
        let scoreText = this.add.text(width / 2, 50, "Score", {
            font: "28px monospace",
            color: "#000000"
        });
        scoreText.setOrigin(0.5, 0.5);
        this.scoreValue = this.add.text(width / 2, 75, `${this.score}`, {
            font: "20px monospace",
            color: "#000000"
        });
        this.scoreValue.setOrigin(0.5, 0.5);
    }

    createGameMusic() {
        this.gameMusic?.play({ loop: true, volume: 0.5 });
    }
}
