export default class cutscenes1 extends Phaser.Scene{
    constructor(){
        super('cutscenes1')
    }
    
    preload(){
        this.level1scenes = []
        this.cut1 = this.load.image('winScreen', '/static/Assets/cutScenes/level1scenes/cut1.png')
        this.cut2 = this.load.image('winScreen', '/static/Assets/cutScenes/level1scenes/cut2.png')
        this.cut3 = this.load.image('winScreen', '/static/Assets/cutScenes/level1scenes/cut3.png')
        this.cut4 = this.load.image('winScreen', '/static/Assets/cutScenes/level1scenes/cut4.png')
        this.cut5 = this.load.image('winScreen', '/static/Assets/cutScenes/level1scenes/cut5.png')
        this.cut6 = this.load.image('winScreen', '/static/Assets/cutScenes/level1scenes/cut6.png')
        this.cut7 = this.load.image('winScreen', '/static/Assets/cutScenes/level1scenes/cut7.png')
        this.cut8 = this.load.image('winScreen', '/static/Assets/cutScenes/level1scenes/cut8.png')
        this.cut9 = this.load.image('winScreen', '/static/Assets/cutScenes/level1scenes/cut9.png')
        this.cut10 = this.load.image('winScreen', '/static/Assets/cutScenes/level1scenes/cut10.png')
        this.cut11 = this.load.image('winScreen', '/static/Assets/cutScenes/level1scenes/cut11.png')
        this.cut12 = this.load.image('winScreen', '/static/Assets/cutScenes/level1scenes/cut12.png')
        this.cut13 = this.load.image('winScreen', '/static/Assets/cutScenes/level1scenes/cut13.png')
        this.cut14 = this.load.image('winScreen', '/static/Assets/cutScenes/level1scenes/cut14.png')
    }

    init (data){
        this.timer = data.time
        this.hints = data.hints
    }

    create(){
        const final = this.timer + this.hints * 10
        this.screen = this.physics.add.image(0, 0, 'winScreen').setScale(0.5)
        this.congrats = this.add.text(0, 100, ["Congratulations!", "Level 1 Completed"], { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(3)
        this.endTime = this.add.text(0, 300, "Time Taken:"+this.timer, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(3)
        this.score = this.add.text(0, 400, "Final Score:"+final, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(3)
        this.toContinue = this.add.text(0, 500, "Click any button to Continue!", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(3)
        //Perform whatever database update needed here!

        const end = () =>{
            this.screen.destroy()
            this.congrats.destroy()
            this.score.destroy()
            this.endTime.destroy()
            this.toContinue.destroy()
            document.removeEventListener("keydown", end)
            this.scene.start("levelSelect")
            this.scene.stop("level1")
            this.scene.stop("completed1")
        }

        document.addEventListener("keydown", end)
    }
}