import Game from "./Game.js"
export default class level2 extends Game{

    constructor(){
        super('level2')
        this.currentLevel = 'level2'
        this.fnDict = {
            null: ()=>{
                return
            },
            "brownTable": ()=>{
                if(this.computer == 0){

                }
                else if(this.computer == 1){
                    
                }
                else if(this.computer == 2){
                    
                }
                else if(this.computer == 3){
                    
                }
                else if(this.computer == 4){
                    this.message = [["The computer is showing a new message!", "But it is mostly Giberish..."], ['[12] -> "Ruzp ftq Mjq. Ndqmw Ftq Nqmd."', 'Like what does that even mean?', 'Is this encoded?']]
                    this.dialog()
                }
                else if(this.computer == 5){
                    this.message = [["The computer has a new message", "We better be done by now..."],['It reads "The Time Machine is Ready!, Enter the Time Machine."', "Neat! This time for sure I'll get home!"]]
                    this.dialog()
                }
            },
            "axe": ()=>{
                this.message = [["I might need this axe...", "But I can't carry both the mop and axe, its too heavy."], ["I guess I'll just leave the mop here for now."]]
                this.dialog()
                this.niko.inventory.splice(this.niko.inventory.indexOf("mop"), 1)
                this.niko.inventory.push("axe")
                this.wallslayer.removeTileAt(35, 25, true, true, this.wallsLayer)

                const temp1 = this.wallslayer.putTileAt(2356, 35, 24, this.wallslayer)
                const temp2 = this.wallslayer.putTileAt(2364, 35, 25, this.wallslayer)
                temp1.properties.isInteractable = "mop"
                temp2.properties.isInteractable = "mop"
                temp1.properties.collides = true
                temp2.properties.collides = true
                this.wallslayer.setCollisionByProperty({collides: true})
            },
            "mop": ()=>{
                this.message = [["Hello again Mr.Mop, I may again require your assistance.","..."], ["I've been here too long, I started talking to objects", "I guess I'll just leave the axe here for now."]]
                this.dialog()
                this.niko.inventory.splice(this.niko.inventory.indexOf("axe"), 1)
                this.niko.inventory.push("mop")
                this.wallslayer.removeTileAt(35, 25, true, true, this.wallsLayer)
                this.wallslayer.removeTileAt(35, 24, true, true, this.wallsLayer)

                const temp = this.wallslayer.putTileAt(1030, 35, 25, this.wallslayer)
                temp.properties.isInteractable = "axe"
                temp.properties.collides = true
                this.wallslayer.setCollisionByProperty({collides: true})
            },
            "bear": ()=>{
                if(!this.removedHead){
                    this.message = [["Just a normal looking wooden bear."],["The head is kinda off center tho...", "Heh cool."]]
                    this.dialog()
                }
                else{
                    this.message = [["Kinda wierd how the button for a Time Machine is hidden under a Bear Head"],["I'm not gonna argue with it if this gets me closer to home"],["hmm..."],["Food For Thought I guess..."]]
                    this.dialog()
                }
            },
            "bearHead": ()=>{
                if(this.computer == 4 && this.niko.inventory.includes("axe")){
                    this.message = [["If I deciphered the message correctly, then I need to cut this bear's head off!"],["*SWING*"],["Huh, would you look at that", "There was a button underneath!", "*Presses Button*"],["***COMPUTER PING***", "I think that did it!"]]
                    this.dialog()
                    this.removedHead = true
                    this.computer = 5
                    this.wallslayer.removeTileAt(38, 16, true, true, this.wallsLayer)
                    this.wallslayer.removeTileAt(37, 16, true, true, this.wallsLayer)
                }
                else{
                    this.message = [["The head of this bear kind of looks a bit off..."],["..."],["Freddy Fazbear?"]]
                    this.dialog()
                }
            },
            "timeMachine": ()=>{
                if(this.computer == 5){
                    this.scene.stop("level2")
                    this.scene.start('levelSelect')
                }
                else{
                    this.message = [["There is a label on the side of this machine...","It reads 'time machine'"],["Will I be able to go home in this?!"]]
                    this.dialog()
                }
            }
        }
    }

    preload(){
        super.preload()
        this.load.image('table', '/static/Assets/Interactable Sprites/table.jpg')
    }

    create(){
        this.delay = this.time.now
        //For the Cursors
        //This Creates the Map + sets collisions
        this.map = this.make.tilemap({key : 'dungeon2'})
        this.tileset = this.map.addTilesetImage('stardew', 'tiles2')
        this.tileset2 = this.map.addTilesetImage('misc', 'tavern2')
        const tilesetArr = [this.tileset, this.tileset2]
        
        this.floorlayer = this.map.createLayer('floor', tilesetArr)
        this.wallslayer = this.map.createLayer('Walls', tilesetArr)
        this.floorInteractLayer = this.map.createLayer('floorInteractables', tilesetArr)
        this.decorLayer = this.map.createLayer('walldecor', tilesetArr)
        super.create()
        this.niko.inventory = ["mop"]

        this.wallslayer.setCollisionByProperty({collides: true})

        this.physics.add.collider(this.niko, this.wallslayer)
 
        //Now comes the level specific puzzles.
        
        this.removedHead = 0
        this.computer = 4

        //Stray Puzzle Pieces (Can be found around the map) COMPUTER = 0

        //Pool Table Puzzle COMPUTER = 1

        //Combination COMPUTER = 2

        //Deliver Drinks COMPUTER = 3

        //Break the Bear COMPUTER = 4

        //COMPUTER = 5 is the end
    }

    update(time, dTime){
       super.update()
    }
}

