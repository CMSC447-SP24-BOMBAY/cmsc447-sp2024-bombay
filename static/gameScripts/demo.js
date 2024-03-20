/** @type {import("..typings/phaser")} */

import loader from "../scenes/loader.js";
import Game from "../scenes/Game.js"

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [loader, Game],
    
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
    }
};

export default new Phaser.Game(config)