/** @type {import("..typings/phaser")} */

import mainMenu from "../scenes/mainMenu.js";
import levelSelect from "../scenes/levelSelect.js";
import login from "../scenes/login.js";
import loader1 from "../scenes/loader1.js";
import level1 from "../scenes/level1.js";

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [login, mainMenu, levelSelect, loader1, level1],
    
    parent: 'canvas_body',
    dom: {
        createContainer: true
    },

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