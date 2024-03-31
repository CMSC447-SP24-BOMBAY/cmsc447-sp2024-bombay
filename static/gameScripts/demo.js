/** @type {import("..typings/phaser")} */

import mainMenu from "../scenes/mainMenu.js";
import loader1 from "../scenes/loader1.js";
import level1 from "../scenes/level1.js";

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [mainMenu, loader1, level1],
    
    physics:{
        default: 'arcade',
        arcade:{
            gravity: {y:0},
            //Only Turn on Debug if Needed
            debug: true
        }
    },
    scale: {
        zoom:1.2
    },
    render:{
        pixelArt: true
    }
};

export default new Phaser.Game(config)