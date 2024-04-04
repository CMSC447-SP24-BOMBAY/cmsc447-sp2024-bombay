export default class login extends Phaser.Scene{
    constructor(){
        super('login')
    }
    
    preload(){
        this.load.image("play", '/static/Assets/Menu Assets/Transparent/Play_Transparent.png')
    }

    create(){
        let playButton = this.add.image(this.game.renderer.width/2 ,this.game.renderer.height/2, "play")
        
        playButton.setInteractive();
        playButton.on("pointerup", ()=>{
            //This part is not coded yet, please add the backend login portion here.
            console.log("Player Login Button Clicked")
            this.scene.start('mainMenu')
            this.scene.stop('login')
        })
    }
}