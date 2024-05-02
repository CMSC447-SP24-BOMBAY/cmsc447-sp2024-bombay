export default class cutscenes2 extends Phaser.Scene{
    constructor(){
        super('cutscenes2')
    }
    
    preload(){
        this.load.image('2cut1', '/static/Assets/cutScenes/level2scenes/2cut1.png')
        this.load.image('2cut2', '/static/Assets/cutScenes/level2scenes/2cut2.png')
        this.load.image('2cut3', '/static/Assets/cutScenes/level2scenes/2cut3.png')
        this.load.image('2cut4', '/static/Assets/cutScenes/level2scenes/2cut4.png')
        this.load.image('2cut5', '/static/Assets/cutScenes/level2scenes/2cut5.png')
        this.load.image('2cut6', '/static/Assets/cutScenes/level2scenes/2cut6.png')
        this.load.image('2cut7', '/static/Assets/cutScenes/level2scenes/2cut7.png')
        this.load.image('2cut8', '/static/Assets/cutScenes/level2scenes/2cut8.png')
        this.load.image('2cut9', '/static/Assets/cutScenes/level2scenes/2cut9.png')
        this.load.image('2cut10', '/static/Assets/cutScenes/level2scenes/2cut10.png')
        this.load.audio("cutsceneSong2", "/static/Assets/Menu Assets/music/55. The Wild East.mp3")
    }

    create(){
        let i = 1
        this.screen = this.physics.add.image(this.game.renderer.width/2, this.game.renderer.height/2, '2cut'+String(i)).setScale(0.78,1.05)
        this.sound.play("cutsceneSong2", {
            loop: true,
            volume: 0.5
        })

        const end = () =>{
            if(!lock){
                lock = true
                if(i == 10){
                    this.screen.destroy()
                    document.removeEventListener("keyup", reset)
                    document.removeEventListener("keydown", end)
                    this.game.sound.stopAll();
                    this.scene.start("levelSelect")
                    this.scene.stop("cutscenes2")
                }
                else{
                    i += 1
                    this.screen.destroy()
                    this.screen = this.physics.add.image(this.game.renderer.width/2, this.game.renderer.height/2, '2cut'+String(i)).setScale(0.78,1.05)
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