/** @type {import("..typings/phaser")} */

export default class Game extends Phaser.Scene{
    cursors
    niko = Phaser.Physics.Arcade.Sprite
    constructor(){
        super('game')
    }

    preload(){
        keybinds

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
        this.input.keyboard.addkey({'interact': 'E'}) //For interaction in interim
    }

    create(){
        //For the Cursors
        //This Creates the Map + sets collisions
        const map = this.make.tilemap({key : 'dungeon'})
        const tileset = map.addTilesetImage('dungeon3', 'tiles')
        
        map.createLayer('floor', tileset)
        const wallslayer = map.createLayer('Walls', tileset)
        wallslayer.setCollisionByProperty({collides: true})

        //This will create the character
        this.niko = this.physics.add.sprite(250,200,'Niko','Sun F1.png')
        this.niko.setScale(0.5)
        this.niko.body.setSize(16,16,true)
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

        this.physics.add.collider(this.niko, wallslayer)
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
            this.niko.facing = "back"
        }
        else if(this.cursors.down.isDown){
            this.niko.anims.play('niko-run-forward', true)
            this.niko.setVelocity(0, speed)
            this.niko.facing = "right"
        }
        else{
            this.niko.anims.play('niko-idle-forward', true)
            this.niko.setVelocity(0, 0)
        }
        
        this.input.keyboard.on(this.cursors.key('interact'), ()=>{
            if(this.interactIsPressed){
                //Prevents The game from interacting way to many times.
                return 
            }
            this.interactIsPressed = true;

            //This Returns the Floor Layer
            const tile = this.map.getTileAtWorldXY(this.niko.body.x, this.niko.body.y, true, null, this.floorlayer)
            console.log(tile.index-1)

            //Find the Wall Layer of direction faced.
            this.wallTile;
            if(this.niko.facing = "left"){
                this.wallTile = this.map.getTileAtWorldXY(this.niko.x - 8, this.niko.y, true, null, this.wallslayer)
            }
            else if(this.niko.facing = "right"){
                this.wallTile = this.map.getTileAtWorldXY(this.niko.x + 8, this.niko.y, true, null, this.wallslayer)
            }
            else if(this.niko.facing = "up"){
                this.wallTile = this.map.getTileAtWorldXY(this.niko.x, this.niko.y + 8, true, null, this.wallslayer)
            }
            else if(this.niko.facing = "down"){
                this.wallTile = this.map.getTileAtWorldXY(this.niko.x, this.niko.y - 8, true, null, this.wallslayer)
            }
            console.log("INTERACTION: FACING", this.niko.facing, this.wallTile.index-1)
        })
        this.input.keyboard.on(this.cursors.key('interact'), ()=>{this.interactIsPressed = false})
    }
}

