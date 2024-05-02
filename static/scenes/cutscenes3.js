export default class cutscenes3 extends Phaser.Scene{
    constructor(){
        super('cutscenes3')
    }
    
    preload(){
        this.load.image('3cut1', '/static/Assets/cutScenes/level3scenes/3cut1.png')
        this.load.image('3cut2', '/static/Assets/cutScenes/level3scenes/3cut2.png')
        this.load.image('3cut3', '/static/Assets/cutScenes/level3scenes/3cut3.png')
        this.load.image('3cut4', '/static/Assets/cutScenes/level3scenes/3cut4.png')
        this.load.image('3cut5', '/static/Assets/cutScenes/level3scenes/3cut5.png')
        this.load.image('3cut6', '/static/Assets/cutScenes/level3scenes/3cut6.png')
        this.load.image('3cut7', '/static/Assets/cutScenes/level3scenes/3cut7.png')
        this.load.audio("cutsceneSong3", "/static/Assets/Menu Assets/music/73. Kanako.mp3")
    }

    create(){
        let i = 1
        this.screen = this.physics.add.image(this.game.renderer.width/2, this.game.renderer.height/2, '3cut'+String(i)).setScale(0.78,1.05)
        this.sound.play("cutsceneSong3", {
            loop: true,
            volume: 0.5
        })

        const end = () =>{
            if(!lock){
                lock = true
                if(i == 7){
                    this.screen.destroy()
                    document.removeEventListener("keyup", reset)
                    document.removeEventListener("keydown", end)
                    this.game.sound.stopAll();
                    this.scene.start("levelSelect")
                    this.scene.stop("cutscenes3")
                }
                else{
                    i += 1
                    this.screen.destroy()
                    this.screen = this.physics.add.image(this.game.renderer.width/2, this.game.renderer.height/2, '3cut'+String(i)).setScale(0.78,1.05)
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