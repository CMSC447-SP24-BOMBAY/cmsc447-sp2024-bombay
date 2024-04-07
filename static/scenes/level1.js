export default class level1 extends Phaser.Scene{

    interactIsPressed;
    cursors;
    niko = Phaser.Physics.Arcade.Sprite;
    fnDict = {
        null: ()=>{
            return
        },
        "mop": ()=>{
            this.niko.inventory.push("mop")
            this.wallslayer.removeTileAt(29, 14, true, true, this.wallsLayer)
            this.wallslayer.removeTileAt(29, 15, true, true, this.wallsLayer)
        },
        "brownSign": ()=>{
            this.message = "This is a sign!"
            this.r = this.add.rectangle(this.niko.x, this.niko.y+200, 700, 150, 0x301934);
            this.r.setStrokeStyle(4,0xefc53f)
            this.face = this.add.image(this.niko.x-290, this.niko.y+200, 'niko_face').setScale(1.5,1.5)
            this.text = this.add.text(this.niko.x-200, this.niko.y+150, this.message, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
            
            const end = () =>{
                this.r.destroy()
                this.text.destroy()
                this.face.destroy()
                this.scene.resume("level1")
            }
            this.scene.pause("level1")
            const timeout = setTimeout(end, 10000)
        }
    }

    constructor(){
        super('level1')
    }

    preload(){
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create(){
        this.delay = this.time.now
        //For the Cursors
        //This Creates the Map + sets collisions
        this.map = this.make.tilemap({key : 'dungeon'})
        this.tileset = this.map.addTilesetImage('dungeon3', 'tiles')
        this.tileset2 = this.map.addTilesetImage('stardewValley_assets', 'tavern')
        const tilesetArr = [this.tileset, this.tileset2]
        
        this.floorlayer = this.map.createLayer('floor', tilesetArr)
        this.wallslayer = this.map.createLayer('Walls', tilesetArr)
        this.floorInteractLayer = this.map.createLayer('floorInteractables', tilesetArr)

        this.wallslayer.setCollisionByProperty({collides: true})

        //This will create the character
        this.niko = this.physics.add.sprite(250,200,'Niko','Sun F1.png')
        this.niko.setScale(0.5)
        this.niko.body.setSize(16,16,true)
        this.niko.body.setOffset(24, 32)
        this.niko.inventory = []
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

        this.physics.add.collider(this.niko, this.wallslayer)
        this.cameras.main.startFollow(this.niko, true)

        // For Debugging
        // const debugGraphics = this.add.graphics().setAlpha(0.7)
        // this.wallslayer.renderDebug(debugGraphics, {
        //     tileColor:null,
        //     collidingTileColor: new Phaser.Display.Color(255,255,0, 255),
        //     faceColor: new Phaser.Display.Color(255, 0, 255, 255)
        // })
    }

    update(time, dTime){
        //Initial check to see if input and Player exists
        if(!this.cursors || !this.niko){
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
        //console.log("Movement Key Pressed ", this.niko.facing)

        this.input.keyboard.on('keydown-E', ()=>{
            if(this.interactIsPressed){
                //Prevents The game from interacting way to many times.
                return 
            }
            this.interactIsPressed = true;
            
            //This Returns the Floor Layer
            this.floorTile = this.map.getTileAtWorldXY(this.niko.body.x, this.niko.body.y, true, null, this.floorInteractLayer)

            //Find the Wall Layer of direction faced.
            this.wallTile;
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
            console.log(this.floorTile.index, this.wallTile.index)
            if(this.floorTile.properties.isInteractable != "" && this.floorTile.index != -1){
                var interact = this.floorTile.properties.isInteractable
                console.log(JSON.stringify(interact))
                this.fnDict[interact]()
            }
            if(this.wallTile.properties.isInteractable != "" && this.wallTile.index != -1){
                var interact = this.wallTile.properties.isInteractable
                console.log(JSON.stringify(interact))
                this.fnDict[interact]()
            }
        })
        this.input.keyboard.on('keyup-E', ()=>{this.interactIsPressed = false})
    }
}
