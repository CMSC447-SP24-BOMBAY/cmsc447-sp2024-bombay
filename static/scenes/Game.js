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
        // keybinds

        //TODO: Once login is added, use this with user information to get user's keybinds
        /*
        fetch('/api/settings/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(result => {keybinds = result})
        .catch(error => {console.error('Error:', error)})
        this.cursors = this.input.keyboard.addKeys(keybinds)
        */
        this.cursors = this.input.keyboard.createCursorKeys()
        this.interact = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
        this.backpack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B)
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
        // For Debugging
        // const debugGraphics = this.add.graphics().setAlpha(0.7)
        // wallslayer.renderDebug(debugGraphics, {
        //     tileColor:null,
        //     collidingTileColor: new Phaser.Display.Color(255,255,0, 255),
        //     faceColor: new Phaser.Display.Color(255, 0, 255, 255)
        // })
    }

    update(time, dTime){
        //Initial check to see if input and Player exists
        if(!this.cursors || !this.niko){
            console.log(this.cursors)
            console.log(this.niko)
            console.log("Update is not being run")
            return
        }
        const speed = 100

        if(this.cursors.left.isDown){
            this.niko.anims.play('niko-run-left', true)
            this.niko.setVelocity(-speed, 0)
            this.niko.facing = "left"
        }
        else if(this.cursors.right.isDown){
            this.niko.anims.play('niko-run-right', true)
            this.niko.setVelocity(speed, 0)
            this.niko.facing = "right"
        }
        else if(this.cursors.up.isDown){
            this.niko.anims.play('niko-run-back', true)
            this.niko.setVelocity(0, -speed)
            this.niko.facing = "up"
        }
        else if(this.cursors.down.isDown){
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
                console.log(JSON.stringify(interact))
                if (interact in this.fnDict){
                    this.fnDict[interact]()
                }
            }
            if(this.wallTile.properties.isInteractable != "" && this.wallTile.index != -1){
                var interact = this.wallTile.properties.isInteractable
                console.log(JSON.stringify(interact))
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
                if (clickedOn in this.fnDict){
                    this.fnDict[clickedOn]
                    clickedOn.setVisible(false)
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

    dialog(){
        this.scene.pause("level1")
        this.r = this.add.rectangle(this.niko.x, this.niko.y+200, 700, 150, 0x301934)
        this.r.setStrokeStyle(4,0xefc53f)
        this.face = this.add.image(this.niko.x-290, this.niko.y+200, 'niko_face').setScale(1.5,1.5)
        this.text = this.add.text(this.niko.x-200, this.niko.y+150, this.message, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
            
        const end = () =>{
            this.r.destroy()
            this.text.destroy()
            this.face.destroy()
            this.scene.resume("level1")
        }

        var keypressed = false
        document.addEventListener("keydown", (event) => {
            end()
            keypressed = true
        })
        
        function repeat(){
            if(!keypressed){
                setTimeout(repeat,0)
            }
        }
        repeat()
    }

    openBackpack(){
        this.scene.pause("level1")
        this.r = this.add.rectangle(this.niko.x, this.niko.y, 700, 500, 0x301934)
        this.r.setStrokeStyle(4,0xefc53f)
        const invSize = this.niko.inventory.length
        const items = new Array(invSize)
        var currX = this.niko.x -300
        var currY = this.niko.y - 200

        for (let i = 0; i < invSize; i++) {
            items[i] = this.add.text(currX, currY, this.niko.inventory[i], { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(1.4,1.4);
            items[i].setInteractive();
            items[i].on("pointerup", ()=>{
                //Having Issue here, tryna click on mop but its not working.
                //Issue - Have player equip the item on click of the text.
                this.niko.equipped = this.niko.inventory[i]
                console.log("Equipped", this.niko.equipped)
            })
            if(i%2 == 0){
                currX = currX + 300
            }
            else{
                currX = currX - 300
                currY = currY + 50
            }
        }

        //Kills the program
        const end = () =>{
            this.r.destroy()
            for (let i = 0; i < invSize; i++) {
                items[i].destroy()
            }   
            this.scene.resume("level1")
        }

        var keypressed = false
        document.addEventListener("keydown", (event) => {
            end()
            keypressed = true
        })
        
        function repeat(){
            if(!keypressed){
                setTimeout(repeat,0)
            }
        }
        repeat()
    }
}

