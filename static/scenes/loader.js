export default class loader extends Phaser.Scene{
    constructor(name){
        super(name)
    }
    
    preload(){
        //Loads in Map (Commented one is old Demo)
        // this.load.image('tiles', '/static/Assets/Map Sprites/0x72_DungeonTilesetII_v1.7.png')
        // this.load.tilemapTiledJSON('dungeon', '/static/Assets/TiledMap/demomapjson.tmj')
    
        //Only load character here
        //Loads in Character
        this.load.atlas('Niko', '/static/Assets/Character_Sprites/Niko/NikoSheet.png', '/static/Assets/Character_Sprites/Niko/NikoSheet.json')

        //Creates the Loading Bar
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        })

        this.load.on("progress", (percent)=>{
            loadingBar.fillRect(0, this.game.renderer.height/2, this.game.renderer.width * percent, 50);
        })

        this.load.on("complete", ()=>{
            console.log("Completed Load")
        })
    }

    create(){
    }
}