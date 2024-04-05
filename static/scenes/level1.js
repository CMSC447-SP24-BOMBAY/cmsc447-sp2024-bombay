export default class level1 extends Phaser.Scene{
    delay;
    cursors;
    niko = Phaser.Physics.Arcade.Sprite;
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
        
        this.floorlayer = this.map.createLayer('floor', this.tileset)
        this.wallslayer = this.map.createLayer('Walls', this.tileset)
        this.wallslayer.setCollisionByProperty({collides: true})

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

        this.physics.add.collider(this.niko, this.wallslayer)
        this.cameras.main.startFollow(this.niko, true)
        // For Debugging
        const debugGraphics = this.add.graphics().setAlpha(0.7)
        this.wallslayer.renderDebug(debugGraphics, {
            tileColor:null,
            collidingTileColor: new Phaser.Display.Color(255,255,0, 255),
            faceColor: new Phaser.Display.Color(255, 0, 255, 255)
        })
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
        console.log("Movement Key Pressed ", this.niko.facing)

        this.input.keyboard.on('keydown-E', ()=>{
            if(this.delay > this.time.now){
                //Prevents The game from interacting way to many times.
                return 
            }

            this.delay = this.time.now + 500
            //console.log("Interact Key Pressed ", this.niko.facing)
            
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
    }
}

