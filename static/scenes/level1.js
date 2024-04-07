import Game from "./unused/Game.js";

export default class level1 extends Game{
    interactIsPressed;
    cursors;
    niko = Phaser.Physics.Arcade.Sprite;
    constructor(){
        super('level1')
    }

    fnDict = {
        null: ()=>{
            return
        },
        "mop": ()=>{
            this.niko.inventory.push("mop")
            this.wallslayer.removeTileAt(29, 14, true, true, this.wallsLayer)
            this.wallslayer.removeTileAt(29, 15, true, true, this.wallsLayer)
        },
        "brownSign": ()=>{
            this.message = ['There is a note here.', 'It says "To anyone who finds my key, Plz give back. I lost it near the table."']
            super.dialog()
            this.niko.checkedSign = true
        },
        "brownTable": ()=>{
            if(this.niko.checkedSign == false){
                this.message = "Just a regular table!"
                super.dialog()
            }
            else{
                this.message = "The sign was right! There was a key here! Its Red."
                super.dialog()
                this.niko.inventory.push("red key")
            }
        }
    }

    preload(){
        super.preload()
    }

    create(){
        this.delay = this.time.now
        //For the Cursors
        //This Creates the Map + sets collisions
        this.map = this.make.tilemap({key : 'dungeon'})
        this.tileset = this.map.addTilesetImage('dungeon3', 'tiles')
        this.tileset2 = this.map.addTilesetImage('stardewValley_assets', 'tavern')
        const tilesetArr = [this.tileset, this.tileset2]
        
        this.floorlayer = this.map.createLayer('floor', tilesetArr)
        this.wallslayer = this.map.createLayer('Walls', tilesetArr)
        this.floorInteractLayer = this.map.createLayer('floorInteractables', tilesetArr)
        super.create()

        this.wallslayer.setCollisionByProperty({collides: true})

        this.physics.add.collider(this.niko, this.wallslayer)

        // For Debugging
        // const debugGraphics = this.add.graphics().setAlpha(0.7)
        // this.wallslayer.renderDebug(debugGraphics, {
        //     tileColor:null,
        //     collidingTileColor: new Phaser.Display.Color(255,255,0, 255),
        //     faceColor: new Phaser.Display.Color(255, 0, 255, 255)
        // })
    }

    update(time, dTime){
        super.update()
    }
}

