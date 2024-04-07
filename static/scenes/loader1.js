export default class loader1 extends Phaser.Scene{
    constructor(){
        super('loader1')
    }
    
    preload(){
        //Loads in Map
        //Loads in Map (Commented one is old Demo)
        // this.load.image('tiles', '/static/Assets/Map Sprites/0x72_DungeonTilesetII_v1.7.png')
        // this.load.tilemapTiledJSON('dungeon', '/static/Assets/TiledMap/demomapjson.tmj')

        this.load.image('niko_face', '/static/Assets/Character_Sprites/FaceSheet/Portrait_Niko (31).png')
        this.load.image('tiles', '/static/Assets/Map Sprites/0x72_DungeonTilesetII_v1.7.png')
        this.load.image('tavern', '/static/Assets/Map Sprites/PC Computer - Stardew Valley - Craftables.png')
        this.load.tilemapTiledJSON('dungeon', '/static/Assets/TiledMap/levelOneMap.tmj')

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
            console.log(percent);
        })

        this.load.on("complete", ()=>{
            console.log("Completeed Load")
        })
    }

    create(){
        this.scene.start('level1')
    }
}