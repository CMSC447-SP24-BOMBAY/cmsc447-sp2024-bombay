import loader from "./loader.js"

export default class loader2 extends loader{
    constructor(){
        super('loader2')
    }
    
    preload(){
        super.preload()

        this.load.image('niko_face', '/static/Assets/Character_Sprites/FaceSheet/Portrait_Niko (31).png')
        this.load.image('tiles2', '/static/Assets/Map Sprites/PC Computer - Stardew Valley - Town Interior.png')
        this.load.image('tavern2', '/static/Assets/Map Sprites/PC Computer - Stardew Valley - Craftables.png')
        this.load.image('pool2', '/static/Assets/Map Sprites/PoolTable (1).png')
        this.load.tilemapTiledJSON('dungeon2', '/static/Assets/TiledMap/leveltwoMap.tmj')
    }

    create(){
        this.scene.start('level2')
    }
}