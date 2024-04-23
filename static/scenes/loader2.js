import loader from "./loader.js"

export default class loader2 extends loader{
    constructor(){
        super('loader2')
    }
    
    preload(){
        super.preload()

        this.load.image('niko_face', '/static/Assets/Character_Sprites/FaceSheet/Portrait_Niko (31).png')
        this.load.image('tiles', '/static/Assets/Map Sprites/PC Computer - Stardew Valley - Town Interior.png')
        this.load.image('tavern', '/static/Assets/Map Sprites/PC Computer - Stardew Valley - Craftables.png')
        this.load.tilemapTiledJSON('dungeon', '/static/Assets/TiledMap/leveltwoMap.tmj')
    }

    create(){
        this.scene.start('level2')
    }
}