export default class loader extends Phaser.Scene{
    constructor(){
        super('loader')
    }
    
    preload(){
        this.load.image('tiles', '/static/Assets/Map Sprites/0x72_DungeonTilesetII_v1.7.png')
        this.load.tilemapTiledJSON('dungeon', '/static/Assets/TiledMap/demomapjson.tmj')
    }

    create(){
        this.scene.start('game')
    }
}