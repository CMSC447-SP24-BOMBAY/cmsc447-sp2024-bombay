export default class levelSelect extends Phaser.Scene{
    constructor(){
        super('levelSelect')
    }
    
    preload(){
        //Loads images + Other Assets
        this.load.image("lightbulb", "/static/Assets/cutScenes/lightbulb.png")

        this.load.image("levelSelect_bg", "/static/Assets/Menu Assets/Transparent/levelSelect.jpg")
        
        this.load.image("level1", '/static/Assets/Menu Assets/Transparent/level_1_transparent.png')

        this.load.image("level2", '/static/Assets/Menu Assets/Transparent/level_2_transparent.png')

        this.load.image("level3", '/static/Assets/Menu Assets/Transparent/level_3_transparent.png')

        this.load.image("quit", '/static/Assets/Menu Assets/Transparent/Quit_Transparent.png')

        this.load.atlas('Main Niko', '/static/Assets/Character_Sprites/Blue Niko/idle_spritesheet.png', '/static/Assets/Character_Sprites/Blue Niko/idle_spritesheet.json')

        this.load.audio("eleventh_hour_music", "/static/Assets/Menu Assets/music/11. Eleventh Hour.mp3")

        //Creates the Loading Bar
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        })

        this.load.on("progress", (percent)=>{
            loadingBar.fillRect(0, this.game.renderer.height/2, this.game.renderer.width * percent, 50);
        })

        this.load.on("complete", ()=>{
            console.log("Completed Load")
        })
    }

    create(){
        //Creates all the images
        this.add.image(this.game.renderer.width/1.25 ,this.game.renderer.height/1.5 , "levelSelect_bg").setScale(0.75,0.75)
        let level1 = this.add.image(this.game.renderer.width/1.5 ,this.game.renderer.height/6, "level1").setScale(0.5, 0.5)
        let anim1 = this.add.image(this.game.renderer.width/1.5+200 ,this.game.renderer.height/6, "lightbulb").setScale(0.05, 0.05)

        let level2 = this.add.image(this.game.renderer.width/1.5 ,this.game.renderer.height/3, "level2").setScale(0.5, 0.5)
        let anim2 = this.add.image(this.game.renderer.width/1.5+200 ,this.game.renderer.height/3, "lightbulb").setScale(0.05, 0.05)

        let level3 = this.add.image(this.game.renderer.width/1.5 ,this.game.renderer.height/2, "level3").setScale(0.5, 0.5)
        let anim3 = this.add.image(this.game.renderer.width/1.5+200 ,this.game.renderer.height/2, "lightbulb").setScale(0.05, 0.05)

        let quit = this.add.image(this.game.renderer.width/1.5 ,this.game.renderer.height/1.6, "quit").setScale(0.35,0.35)
        let anim4 = this.add.image(this.game.renderer.width/1.5+200 ,this.game.renderer.height/1.6, "lightbulb").setScale(0.05, 0.05)
    
        //Music - From Oneshot (Im a nerd)
        this.sound.play("eleventh_hour_music", {
            loop: true
        })

        //Settings for our Hover Sprite
        let hoverSp = this.add.sprite(0, 0, "Main Niko")
        hoverSp.setVisible(false)

        //Sets Animations for Hovering and onClick events
        //  PlayButton Events
        level1.setInteractive();
        level1.on("pointerover", ()=>{
            hoverSp.setVisible(true)
            hoverSp.play("idle")
            hoverSp.x = 330
            hoverSp.y = level1.y
        })
        level1.on("pointerout", ()=>{
            hoverSp.setVisible(false)
        })
        level1.on("pointerup", ()=>{
            this.scene.start('loader1')
            this.game.sound.stopAll();
            this.scene.stop('levelSelect')
        })

        anim1.setInteractive();
        anim1.on("pointerup", ()=>{
            this.scene.start('cutscenes1')
            this.game.sound.stopAll();
            this.scene.stop('levelSelect')
        })

        //  Leaderboard Button Events
        level2.setInteractive();
        level2.on("pointerover", ()=>{
            hoverSp.setVisible(true)
            hoverSp.play("idle")
            hoverSp.x = 330
            hoverSp.y = level2.y
        })
        level2.on("pointerout", ()=>{
            hoverSp.setVisible(false)
        })
        level2.on("pointerup", ()=>{
            this.scene.start('loader2')
            this.game.sound.stopAll();
            this.scene.stop('levelSelect')
        })

        anim2.setInteractive();
        anim2.on("pointerup", ()=>{
            this.scene.start('cutscenes2')
            this.game.sound.stopAll();
            this.scene.stop('levelSelect')
        })

        //  Level3 Button Events
        level3.setInteractive();
        level3.on("pointerover", ()=>{
            hoverSp.setVisible(true)
            hoverSp.play("idle")
            hoverSp.x = 330
            hoverSp.y = level3.y
        })
        level3.on("pointerout", ()=>{
            hoverSp.setVisible(false)
        })
        level3.on("pointerup", ()=>{
            this.scene.start('loader3')
            this.game.sound.stopAll();
            this.scene.stop('levelSelect')
        })

        anim3.setInteractive();
        anim3.on("pointerup", ()=>{
            this.scene.start('cutscenes3')
            this.game.sound.stopAll();
            this.scene.stop('levelSelect')
        })

        //  Quit Button Events
        quit.setInteractive();
        quit.on("pointerover", ()=>{
            hoverSp.setVisible(true)
            hoverSp.play("idle")
            hoverSp.x = 330
            hoverSp.y = quit.y
        })
        quit.on("pointerout", ()=>{
            hoverSp.setVisible(false)
        })
        quit.on("pointerup", ()=>{
            this.scene.start('mainMenu')
            this.game.sound.stopAll();
            this.scene.stop('levelSelect')
        })

        anim4.setInteractive();
        anim4.on("pointerup", ()=>{
            this.scene.start('cutscenes4')
            this.game.sound.stopAll();
            this.scene.stop('levelSelect')
        })
    }
}