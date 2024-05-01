/** @type {import("..typings/phaser")} */

export default class Game extends Phaser.Scene{
    constructor(name){
        super(name)
        this.interactIsPressed
        this.mouseIsClicked
        this.backpackIsPressed
        this.cursors
        this.niko = Phaser.Physics.Arcade.Sprite
    }

    preload(){
        //Fetch the keybinds for the curret player and setting the corresponding buttons
        const url = '/api/settings/' + this.registry.get('username')
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(result => {
            this.backpack = this.input.keyboard.addKey(result['backpack'])
            this.interact = this.input.keyboard.addKey(result['interact'])
            this.up = this.input.keyboard.addKey(result['up'])
            this.down = this.input.keyboard.addKey(result['down'])
            this.left = this.input.keyboard.addKey(result['left'])
            this.right = this.input.keyboard.addKey(result['right'])
            this.menu = this.input.keyboard.addKey(result['menu'])
        })
        .catch(error => {console.error('Error:', error)})
    }

    create(){
        //For the Cursors
        //This Creates the Map + sets collisions
        
        //Setting everything that -isn't- level specific. (character and cursors)

        //This will create the character
        this.niko = this.physics.add.sprite(250,200,'Niko','Sun F1.png')
        this.niko.setScale(0.5)
        this.niko.body.setSize(16,16,true)
        this.niko.inventory = []
        this.niko.body.setOffset(24, 32)
        //this.niko.body.setOffset(8,8)
        this.niko.facing = "down"

        this.anims.create({
            key: 'niko-idle-back',
            frames: [{key: "Niko", frame: "Sun B1.png"}]
        })

        this.anims.create({
            key: 'niko-idle-forward',
            frames: [{key: "Niko", frame: "Sun F1.png"}]
        })

        this.anims.create({
            key: 'niko-idle-left',
            frames: [{key: "Niko", frame: "Sun L1.png"}]
        })

        this.anims.create({
            key: 'niko-idle-right',
            frames: [{key: "Niko", frame: "Sun R1.png"}]
        })

        this.anims.create({
            key: 'niko-run-right',
            frames: this.anims.generateFrameNames('Niko', {start: 1, end: 2, prefix: "Sun R", suffix: ".png"}),
            repeat: -1,
            frameRate: 10
        })

        this.anims.create({
            key: 'niko-run-left',
            frames: this.anims.generateFrameNames('Niko', {start: 1, end: 2, prefix: "Sun L", suffix: ".png"}),
            repeat: -1,
            frameRate: 10
        })

        this.anims.create({
            key: 'niko-run-back',
            frames: this.anims.generateFrameNames('Niko', {start: 1, end: 2, prefix: "Sun B", suffix: ".png"}),
            repeat: -1,
            frameRate: 10
        })

        this.anims.create({
            key: 'niko-run-forward',
            frames: this.anims.generateFrameNames('Niko', {start: 1, end: 3, prefix: "Sun F", suffix: ".png"}),
            repeat: -1,
            frameRate: 10
        })

        this.cameras.main.startFollow(this.niko, true)
        this.paused = false
        // For Debugging
        // const debugGraphics = this.add.graphics().setAlpha(0.7)
        // wallslayer.renderDebug(debugGraphics, {
        //     tileColor:null,
        //     collidingTileColor: new Phaser.Display.Color(255,255,0, 255),
        //     faceColor: new Phaser.Display.Color(255, 0, 255, 255)
        // })

        //The timer
        this.scene.timeText = this.add.text(0, 0, "Time: 0", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.scene.timeText.setScrollFactor(0)
        let time=0
        this.endTime = time
        this.time.addEvent({
        delay:1000,
        repeat:-1,
        callback:()=>{
        time+=1
        this.endTime = time
        this.scene.timeText.setText('Time: '+time)}
        })

        //Hint Variables
        this.hints = 0
        this.hintBookInteracted = false
    }

    update(time, dTime){
        if(this.paused == true){
            return ;
        }
        //Initial check to see if input and Player exists
        if(!this.niko){
            console.log(this.cursors)
            console.log(this.niko)
            console.log("Update is not being run")
            return
        }
        const speed = 100

        //Directional input
        if(this.left.isDown){
            this.niko.anims.play('niko-run-left', true)
            this.niko.setVelocity(-speed, 0)
            this.niko.facing = "left"
        }
        else if(this.right.isDown){
            this.niko.anims.play('niko-run-right', true)
            this.niko.setVelocity(speed, 0)
            this.niko.facing = "right"
        }
        else if(this.up.isDown){
            this.niko.anims.play('niko-run-back', true)
            this.niko.setVelocity(0, -speed)
            this.niko.facing = "up"
        }
        else if(this.down.isDown){
            this.niko.anims.play('niko-run-forward', true)
            this.niko.setVelocity(0, speed)
            this.niko.facing = "down"
        }
        else{
            this.niko.anims.stop()
            this.niko.setVelocity(0, 0)
        }

        //Use keyboard to interact with objects and to enter and exit object pop ups
        this.interact.on('down', ()=>{
            if(this.interactIsPressed){
                //Prevents The game from interacting way to many times.
                return 
            }
            this.interactIsPressed = true;
            
            //This Returns the Floor Layer
            this.floorTile = this.map.getTileAtWorldXY(this.niko.body.x, this.niko.body.y, true, null, this.floorInteractLayer)

            //Find the Wall Layer of direction faced.
            if(this.niko.facing == "left"){
                this.wallTile = this.map.getTileAtWorldXY(this.niko.x - 16, this.niko.y, true, null, this.wallslayer)
            }
            else if(this.niko.facing == "right"){
                this.wallTile = this.map.getTileAtWorldXY(this.niko.x + 16, this.niko.y, true, null, this.wallslayer)
            }
            else if(this.niko.facing == "up"){
                this.wallTile = this.map.getTileAtWorldXY(this.niko.x, this.niko.y - 16, true, null, this.wallslayer)
            }
            else if(this.niko.facing == "down"){
                this.wallTile = this.map.getTileAtWorldXY(this.niko.x, this.niko.y + 16, true, null, this.wallslayer)
            }
            
            //Now knowing the current standing tile and facing tile, we can perform interactions based on the tile 'isInteractable' string
            //  DEBUGGING ISSUE FOR LATER, sometimes game does allow unauthorized interacts so it looks for something that isnt defined in the dictionary. Will need to fix later
            //console.log(this.floorTile.index, this.wallTile.index)
            if(this.floorTile.properties.isInteractable != "" && this.floorTile.index != -1){
                var interact = this.floorTile.properties.isInteractable
                if (interact in this.fnDict){
                    this.fnDict[interact]()
                }
            }
            if(this.wallTile.properties.isInteractable != "" && this.wallTile.index != -1){
                var interact = this.wallTile.properties.isInteractable
                if (interact in this.fnDict){
                    this.fnDict[interact]()
                }
            }
        })
        this.interact.on('up', ()=>{this.interactIsPressed = false})

        this.input.topOnly = false //Enables you to layer objects
        //Use mouse to interact with object pop ups
        this.input.on('pointerup', (pointer, gameObjects)=>{
            for (let clickedOn of gameObjects){
                //In case an interactable object is not in the dictionary
                if (clickedOn.name in this.fnDict){
                    this.fnDict[clickedOn.name]
                }
            }
        })

        this.backpack.on('down', ()=>{
            if(this.backpackIsPressed){
                //Prevents The game from interacting way to many times.
                return 
            }
            this.backpackIsPressed = true;
            this.openBackpack()
        })
        this.backpack.on('up', ()=>{this.backpackIsPressed = false})
    }

    dialog(curr = 0){
        if(curr == 0){
            this.scene.pause(this.currentLevel)
        }
        this.r = this.add.rectangle(this.niko.x, this.niko.y+200, 700, 150, 0x301934)
        this.r.setStrokeStyle(4,0xefc53f)
        this.face = this.add.image(this.niko.x-290, this.niko.y+200, 'niko_face').setScale(1.5,1.5)
        this.text = this.add.text(this.niko.x-200, this.niko.y+150, this.message[curr], { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
            
        const end = () =>{
            this.r.destroy()
            this.text.destroy()
            this.face.destroy()
            document.removeEventListener("keydown", end)
            curr = curr + 1
            if(curr == this.message.length){
                this.scene.resume(this.currentLevel)
            }
            else{
                this.dialog(curr)
            }
        }

        document.addEventListener("keydown", end)
    }

    openBackpack(){
        this.scene.pause(this.currentLevel)
        this.r = this.add.rectangle(this.niko.x, this.niko.y, 700, 500, 0x301934)
        this.r.setStrokeStyle(4,0xefc53f)
        const invSize = this.niko.inventory.length
        const items = new Array(invSize)
        var currX = this.niko.x -300
        var currY = this.niko.y - 200

        for (let i = 0; i < invSize; i++) {
            items[i] = this.add.text(currX, currY, this.niko.inventory[i], { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(1.4,1.4)

            items[i].setInteractive()
            items[i].on('pointerup', ()=>{
                //Having Issue here, tryna click on mop but its not working.
                //Issue - Have player equip the item on click of the text.
                this.niko.equipped = this.niko.inventory[i]
            }, items[i])
            if(i%2 == 0){
                currX = currX + 300
            }
            else{
                currX = currX - 300
                currY = currY + 50
            }
        }

        //Kills the backpack
        const end = () =>{
            this.r.destroy()
            for (let i = 0; i < invSize; i++) {
                items[i].destroy()
            }   
            this.scene.resume(this.currentLevel)
            document.removeEventListener("keydown", end)
        }

        document.addEventListener("keydown", end)
    }
}

