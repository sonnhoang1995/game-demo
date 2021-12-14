// import { AlphaAdjustGameConfig } from "./games/alpha-adjust-clone/config";
// import { AsteroidGameConfig } from "./games/asteroids-clone/config";
// import { BlocksGameConfig } from "./games/blocks-clone/config";
import { BreakoutGameConfig } from "./games/breakout-clone/config";
// import { CandyCrushGameConfig } from "./games/candy-crush-clone/config";
import { ClocksGameConfig } from "./games/clocks-clone/config";
import { CoinRunnerGameConfig } from "./games/coin-runner-clone/config";
// import { EndlessRunnerGameConfig } from "./games/endless-runner-clone/config";
// import { MarioGameConfig } from "./games/mario-clone/config";
// import { TRexGameConfig } from "./games/t-rex-clone/config";
import { TankGameConfig } from "./games/tank-clone/config";
import "./styles/button";
import "./styles/object";
import "./styles/text";

let gameConfigs = [
    // AlphaAdjustGameConfig,
    // AsteroidGameConfig,
    // BlockadeGameConfig,
    // BlocksGameConfig,
    {
        name: "breakout",
        value: BreakoutGameConfig
    },
    // CandyCrushGameConfig,
    {
        name: "coinrunner",
        value: CoinRunnerGameConfig
    },
    {
        name: "clocks",
        value: ClocksGameConfig
    },
    {
        name: "tank",
        value: TankGameConfig
    }
    // EndlessRunnerGameConfig,
    // FlappyBirdGameConfig,
    // TRexGameConfig
];
let game = new Phaser.Game(TankGameConfig);
let selectedGame = document.getElementById("my-select")!;
selectedGame.addEventListener("change", (event) => {
    if (game) game.destroy(true);
    const newGameName = (event.target as HTMLSelectElement).value;
    const newGameConfig = gameConfigs.find(
        (gameConfig) => gameConfig.name == newGameName
    )!.value;
    game = new Phaser.Game(newGameConfig);
});
