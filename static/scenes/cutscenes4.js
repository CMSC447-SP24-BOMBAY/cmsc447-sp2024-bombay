export default class cutscenes4 extends Phaser.Scene{
    constructor(){
        super('cutscenes4')
    }
    
    preload(){
        this.load.image('4cut1', '/static/Assets/cutScenes/level4scenes/4cut1.png')
        this.load.image('4cut2', '/static/Assets/cutScenes/level4scenes/4cut2.png')
        this.load.image('4cut3', '/static/Assets/cutScenes/level4scenes/4cut3.png')
        this.load.image('4cut4', '/static/Assets/cutScenes/level4scenes/4cut4.png')
        this.load.image('4cut5', '/static/Assets/cutScenes/level4scenes/4cut5.png')
        this.load.image('4cut6', '/static/Assets/cutScenes/level4scenes/4cut6.png')
        this.load.image('4cut7', '/static/Assets/cutScenes/level4scenes/4cut7.png')
        this.load.image('4cut8', '/static/Assets/cutScenes/level4scenes/4cut8.png')
        this.load.image('4cut9', '/static/Assets/cutScenes/level4scenes/4cut9.png')
        this.load.image('4cut10', '/static/Assets/cutScenes/level4scenes/4cut10.png')
        this.load.image('4cut11', '/static/Assets/cutScenes/level4scenes/4cut11.png')
        this.load.image('4cut12', '/static/Assets/cutScenes/level4scenes/4cut12.png')
        this.load.image('4cut13', '/static/Assets/cutScenes/level4scenes/4cut13.png')
        this.load.audio("cutsceneSong4", "/static/Assets/Menu Assets/music/123. Undertale Yellow.mp3")
    }

    create(){
        let i = 1
        this.screen = this.physics.add.image(this.game.renderer.width/2, this.game.renderer.height/2, '4cut'+String(i)).setScale(0.78,1.05)
        this.sound.play("cutsceneSong4", {
            loop: true,
            volume: 0.5
        })

        const end = () =>{
            if(!lock){
                lock = true
                if(i == 13){
                    this.screen.destroy()
                    document.removeEventListener("keyup", reset)
                    document.removeEventListener("keydown", end)
                    this.game.sound.stopAll();
                    this.scene.start("levelSelect")
                    this.scene.stop("cutscenes4")
                }
                else{
                    i += 1
                    this.screen.destroy()
                    this.screen = this.physics.add.image(this.game.renderer.width/2, this.game.renderer.height/2, '4cut'+String(i)).setScale(0.78,1.05)
                }
            }
        }

        const reset = () =>{
            lock = false
        }

        var lock = false
        document.addEventListener("keydown", end)
        document.addEventListener("keyup", reset)
    }
}