/** @type {import("..typings/phaser")} */

import mainMenu from "../scenes/mainMenu.js";
import levelSelect from "../scenes/levelSelect.js";
import login from "../scenes/login.js";
import loader1 from "../scenes/loader1.js";
import level1 from "../scenes/level1.js";
import loader2 from "../scenes/loader2.js";
import level2 from "../scenes/level2.js";
import completed1 from "../scenes/completed1.js";
import cutscenes1 from "../scenes/cutscenes1.js";
import loader3 from "../scenes/loader3.js";
import level3 from "../scenes/level3.js";
import cutscenes2 from "../scenes/cutscenes2.js";
import cutscenes3 from "../scenes/cutscenes3.js";
import cutscenes4 from "../scenes/cutscenes4.js";
import completed2 from "../scenes/completed2.js";
import completed3 from "../scenes/completed3.js";
import settings from "../scenes/settings.js";

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [login, mainMenu, levelSelect, loader1, level1, loader2, level2, completed1, cutscenes1, loader3, level3, cutscenes2, cutscenes3, cutscenes4, completed2, completed3, settings],
    
    parent: 'canvas_body',
    dom: {
        createContainer: true
    },

    physics:{
        default: 'arcade',
        arcade:{
            gravity: {y:0},
            //Only Turn on Debug if Needed
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render:{
        pixelArt: true
    }
};

export default new Phaser.Game(config)