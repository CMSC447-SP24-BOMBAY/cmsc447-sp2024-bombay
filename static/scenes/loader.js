export default class loader extends Phaser.Scene{
    constructor(){
        super('loader')
    }
    
    preload(){
        //Loads in Map
        this.load.image('tiles', '/static/Assets/Map Sprites/0x72_DungeonTilesetII_v1.7.png')
        this.load.tilemapTiledJSON('dungeon', '/static/Assets/TiledMap/demomapjson.tmj')

        //Loads in Character
        this.load.atlas('Niko', '/static/Assets/Character_Sprites/Niko/NikoSheet.png', '/src/static/Assets/Character_Sprites/Niko/NikoSheet.json')
    }

    create(){
        this.scene.start('game')
    }
}