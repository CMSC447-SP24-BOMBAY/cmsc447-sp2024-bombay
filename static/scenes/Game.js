/** @type {import("..typings/phaser")} */

export default class Game extends Phaser.Scene{
    constructor(){
        super('game')
    }

    preload(){
    }

    create(){
        const map = this.make.tilemap({key : 'dungeon'})
        const tileset = map.addTilesetImage('dungeon3', 'tiles')
        
        map.createLayer('floor', tileset)
        const wallslayer = map.createLayer('Walls', tileset)
        wallslayer.setCollisionByProperty({collides: true})

        
        // For Debugging
        // const debugGraphics = this.add.graphics().setAlpha(0.7)
        // wallslayer.renderDebug(debugGraphics, {
        //     tileColor:null,
        //     collidingTileColor: new Phaser.Display.Color(255,255,0, 255),
        //     faceColor: new Phaser.Display.Color(255, 0, 255, 255)
        // })
    }
}

