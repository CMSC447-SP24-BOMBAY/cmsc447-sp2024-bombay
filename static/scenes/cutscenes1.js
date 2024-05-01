export default class cutscenes1 extends Phaser.Scene{
    constructor(){
        super('cutscenes1')
    }
    
    preload(){
        this.load.image('cut1', '/static/Assets/cutScenes/level1scenes/cut1.png')
        this.load.image('cut2', '/static/Assets/cutScenes/level1scenes/cut2.png')
        this.load.image('cut3', '/static/Assets/cutScenes/level1scenes/cut3.png')
        this.load.image('cut4', '/static/Assets/cutScenes/level1scenes/cut4.png')
        this.load.image('cut5', '/static/Assets/cutScenes/level1scenes/cut5.png')
        this.load.image('cut6', '/static/Assets/cutScenes/level1scenes/cut6.png')
        this.load.image('cut7', '/static/Assets/cutScenes/level1scenes/cut7.png')
        this.load.image('cut8', '/static/Assets/cutScenes/level1scenes/cut8.png')
        this.load.image('cut9', '/static/Assets/cutScenes/level1scenes/cut9.png')
        this.load.image('cut10', '/static/Assets/cutScenes/level1scenes/cut10.png')
        this.load.image('cut11', '/static/Assets/cutScenes/level1scenes/cut11.png')
        this.load.image('cut12', '/static/Assets/cutScenes/level1scenes/cut12.png')
        this.load.image('cut13', '/static/Assets/cutScenes/level1scenes/cut13.png')
        this.load.image('cut14', '/static/Assets/cutScenes/level1scenes/cut14.png')
        this.load.audio("cutsceneSong1", "/static/Assets/Menu Assets/music/SpongeBob Music - Hawaiian Train [Remaster].mp3")
    }

    create(){
        let i = 1
        this.screen = this.physics.add.image(this.game.renderer.width/2, this.game.renderer.height/2, 'cut'+String(i)).setScale(0.78,1.05)
        this.sound.play("cutsceneSong1", {
            loop: true,
            volume: 0.5
        })

        const end = () =>{
            if(!lock){
                lock = true
                if(i == 14){
                    this.screen.destroy()
                    document.removeEventListener("keydown", end)
                    document.removeEventListener("keyup", reset)
                    this.game.sound.stopAll();
                    this.scene.start("levelSelect")
                    this.scene.stop("cutscenes1")
                }
                else{
                    i += 1
                    this.screen.destroy()
                    this.screen = this.physics.add.image(this.game.renderer.width/2, this.game.renderer.height/2, 'cut'+String(i)).setScale(0.78,1.05)
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