// import { AlphaAdjustGameConfig } from "./games/alpha-adjust-clone/config";
// import { AsteroidGameConfig } from "./games/asteroids-clone/config";
// import { BlockadeGameConfig } from "./games/blockade-clone/config";
// import { BlocksGameConfig } from "./games/blocks-clone/config";
// import { BreakoutGameConfig } from "./games/breakout-clone/config";
// import { CandyCrushGameConfig } from "./games/candy-crush-clone/config";
// import { ClocksGameConfig } from "./games/clocks-clone/config";
// import { CoinRunnerGameConfig } from "./games/coin-runner-clone/config";
// import { EndlessRunnerGameConfig } from "./games/endless-runner-clone/config";
import { MarioGameConfig } from "./games/mario-clone/config";
// import { TRexGameConfig } from "./games/t-rex-clone/config";
import "./styles/button";
import "./styles/object";
import "./styles/text";

// let gameConfigs = [
//     AlphaAdjustGameConfig,
//     AsteroidGameConfig,
//     BlockadeGameConfig,
//     BlocksGameConfig,
//     BreakoutGameConfig,
//     CandyCrushGameConfig,
//     ClocksGameConfig,
//     CoinRunnerGameConfig,
//     EndlessRunnerGameConfig,
//     FlappyBirdGameConfig,
//     TRexGameConfig
// ];
const game = new Phaser.Game(MarioGameConfig);
