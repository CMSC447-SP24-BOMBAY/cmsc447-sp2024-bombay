import loader from "./unused/loader.js"

export default class loader1 extends loader{
    constructor(){
        super('loader1')
    }
    
    preload(){
        //Loads in Map
        //Loads in Map (Commented one is old Demo)
        // this.load.image('tiles', '/static/Assets/Map Sprites/0x72_DungeonTilesetII_v1.7.png')
        // this.load.tilemapTiledJSON('dungeon', '/static/Assets/TiledMap/demomapjson.tmj')

        super.preload()

        this.load.image('niko_face', '/static/Assets/Character_Sprites/FaceSheet/Portrait_Niko (31).png')
        this.load.image('tiles', '/static/Assets/Map Sprites/0x72_DungeonTilesetII_v1.7.png')
        this.load.image('tavern', '/static/Assets/Map Sprites/PC Computer - Stardew Valley - Craftables.png')
        this.load.tilemapTiledJSON('dungeon', '/static/Assets/TiledMap/levelOneMap.tmj')
    }

    create(){
        this.scene.start('level1')
    }
}