import Game from "./Game.js"
export default class level2 extends Game{

    constructor(){
        super('level2')
        this.fnDict = {
            null: ()=>{
                return
            },
        }
    }

    preload(){
        super.preload()
        this.load.image('table', '/static/Assets/Interactable Sprites/table.jpg')
    }

    create(){
        this.delay = this.time.now
        //For the Cursors
        //This Creates the Map + sets collisions
        this.map = this.make.tilemap({key : 'dungeon'})
        this.tileset = this.map.addTilesetImage('stardew', 'tiles')
        this.tileset2 = this.map.addTilesetImage('misc', 'tavern')
        const tilesetArr = [this.tileset, this.tileset2]
        
        this.floorlayer = this.map.createLayer('floor', tilesetArr)
        this.wallslayer = this.map.createLayer('Walls', tilesetArr)
        this.floorInteractLayer = this.map.createLayer('floorInteractables', tilesetArr)
        this.decorLayer = this.map.createLayer('walldecor', tilesetArr)
        super.create()

        this.wallslayer.setCollisionByProperty({collides: true})

        this.physics.add.collider(this.niko, this.wallslayer)
    }

    update(time, dTime){
       super.update()
    }
}

