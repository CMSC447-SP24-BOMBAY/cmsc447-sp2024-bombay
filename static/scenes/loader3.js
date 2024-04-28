import loader from "./loader.js"

export default class loader3 extends loader{
    constructor(){
        super('loader3')
    }
    
    preload(){
        super.preload()

        this.load.image('niko_face', '/static/Assets/Character_Sprites/FaceSheet/Portrait_Niko (31).png')
        this.load.image('tiles3', '/static/Assets/Map Sprites/PC Computer - Stardew Valley - Town Interior.png')
        this.load.image('tavern3', '/static/Assets/Map Sprites/PC_Computer_-_Stardew_Valley_-_Harvested_Crops_Seed_Packets_Minerals_Food_Equipment__Misc_Objects.png')
        this.load.tilemapTiledJSON('dungeon3', '/static/Assets/TiledMap/levelthreeMap.tmj')
    }

    create(){
        this.scene.start('level3')
    }
}