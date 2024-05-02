export default class settings extends Phaser.Scene{
    constructor(){
        super('settings')
    }

    preload(){
        this.load.image("play", '/static/Assets/Menu Assets/Transparent/Play_Transparent.png')
        this.load.image("background", "/static/Assets/Menu Assets/Transparent/water.png")
    }

    create(){
        this.add.image(this.game.renderer.width/1.25 ,this.game.renderer.height/1.5 , "background").setScale(0.75,0.75)
        let playButton = this.add.image(this.game.renderer.width/4 ,this.game.renderer.height/3, "play").setScale(0.60,0.60)
    }
}