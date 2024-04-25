import Game from "./Game.js"
export default class level2 extends Game{

    constructor(){
        super('level2')
        this.currentLevel = 'level2'
        this.fnDict = {
            null: ()=>{
                return
            },

            // SCATTERED PUZZLE PIECES
            "brokenTable": ()=>{
                if(this.niko.strayList == 0){
                    this.message = [["Huh... There's ripped up note here... it says 'Before Closing : remember ", "to check cushions for spare change'"]]
                    this.dialog() 
                    this.niko.strayList = 1                  
                }
                else if (this.niko.strayList == 1){
                    this.message = [["Hmm...The note said to check the cushions"]]
                    this.dialog()
                }
                else if (this.niko.strayList == 2){
                    this.message = [["Oh look there's a sticky note, it says to dust the plants and, ",  "sweep the chimney"]]
                    this.dialog()
                    this.niko.inventory.splice(this.niko.inventory.indexOf("Password"), 1)
                    this.niko.inventory.push("Password Piece #1")
                    this.niko.strayList = 3
                }
                else if (this.niko.strayList == 3){
                    this.message = [["I guess I should go clean the plants and the fireplace"]]
                    this.dialog()
                }
            
            },
            "redCouch":()=>{
                if(this.niko.strayList == 0){
                    this.message = [["What a nice couch?"]]
                    this.dialog()                  
                }
                else if(this.niko.inventory.includes("Password") ||this.niko.inventory.includes("Password Piece #1") ){
                    this.message = [["Good thing I checked the couch"]]
                    this.dialog()
                }
                else{
                    this.message = [["Ohh there's a note in here, It says 'password is : abc'"]]
                    this.dialog()
                    this.niko.inventory.push("Password")
                    this.computer = 1
                }                
            },
            "blackCouch":()=>{
                if(this.niko.strayList == 0){
                    this.message = [["This couch looks lumpy"]]
                    this.dialog()                  
                }
                else if(this.niko.inventory.includes("quarter")){
                    this.message = [["Nothing else in here"]]
                    this.dialog()
                }
                else{
                    this.message = [["ooh I feel something... YES a quarter"]]
                    this.dialog()
                    this.niko.inventory.push("quarter")
                    this.computer = 1
                }  
            },
            "smallPlant":()=>{
                if (this.niko.strayList == 3){
                    if (this.niko.inventory.includes("mop") && this.niko.cleanSmallPlant == false){

                        //if they get a piece check how many they have
                        if (this.niko.inventory.includes("Password Piece #3")){
                            this.message = [["Let me clean up this dirt spill..., Its the last piece!"]]
                            this.dialog()
                            this.niko.inventory.splice(this.niko.inventory.indexOf("Password Piece #1"), 1)
                            this.niko.inventory.splice(this.niko.inventory.indexOf("Password Piece #2"), 1)
                            this.niko.inventory.splice(this.niko.inventory.indexOf("Password Piece #3"), 1)                                
                            this.niko.inventory.push("Full Password")   
                        }
                        else if(this.niko.inventory.includes("Password Piece #2")){
                            this.message = [["Let me clean up this dirt spill..., There's another piece!"]]
                            this.dialog()
                            this.niko.inventory.push("Password Piece #3")
                        }
                        else{
                            this.message = [["Let me clean up this dirt spill..., There's another piece!"]]
                            this.dialog()
                            this.niko.inventory.push("Password Piece #2")
                        }
                        this.niko.cleanSmallPlant = true                              
                    }
                    else if(this.niko.cleanSmallPlant == true){
                        this.message = [["All clean here"]]
                        this.dialog()
                    }
                    else{
                        this.message = [["I probably should get something to clean this"]]
                        this.dialog()
                    }
                }
                else if(this.niko.strayList >= 4){
                    this.message = [["Nothing else to clean here!"]]
                    this.dialog()
                }
                else{
                    this.message = [["What a nice plant, looks like someone spilled some dirt here"]]
                    this.dialog()
                }
            },
            "bigPlant": ()=>{
                if (this.niko.strayList == 3){
                    if(this.wallTile.y == 22 || this.wallTile.y == 23){
                        if (this.niko.inventory.includes("mop") && this.niko.cleanBigPlant == false){
                            
                            //if they get a piece check how many they have
                            if (this.niko.inventory.includes("Password Piece #3")){
                                this.message = [["There seems to be another piece here, I think this is the last piece!"]]
                                this.dialog()
                                this.niko.inventory.splice(this.niko.inventory.indexOf("Password Piece #1"), 1)
                                this.niko.inventory.splice(this.niko.inventory.indexOf("Password Piece #2"), 1)
                                this.niko.inventory.splice(this.niko.inventory.indexOf("Password Piece #3"), 1)
                                this.niko.inventory.push("Full Password")   
                            }
                            else if(this.niko.inventory.includes("Password Piece #2")){
                                this.message = [["There seems to be a piece of paper here"]]
                                this.dialog()
                                this.niko.inventory.push("Password Piece #3")
                            }
                            else{
                                this.message = [["There seems to be a piece of paper here"]]
                                this.dialog()
                                this.niko.inventory.push("Password Piece #2")
                            }
                            this.niko.cleanBigPlant = true    

                        }
                        else if(this.niko.cleanBigPlant == true){
                            this.message = [["Nothing else here"]]
                            this.dialog()
                        }
                        //if they dont have the mop
                        else{
                            this.message = [["This plant looks dusty, I should probably get something to clean this"]]
                            this.dialog()
                        }
                    }
                    //if it is not the right plant
                    else{
                        this.message = [["This plant looks alright"]]
                        this.dialog()
                    }
                }
                //they are not on the step to clean plants
                else{
                    this.message = [["What a nice plant"]]
                    this.dialog()
                }
            },
            "firePlace": ()=>{
                if (this.niko.strayList == 3){
                    if (this.niko.inventory.includes("mop") && this.niko.cleanFirePlace == false){
                        //if they get a piece check how many they have
                        if (this.niko.inventory.includes("Password Piece #3")){
                            this.message = [["This fireplace is so dusty, There's the last piece!"]]
                            this.dialog()
                            this.niko.inventory.splice(this.niko.inventory.indexOf("Password Piece #1"), 1)
                            this.niko.inventory.splice(this.niko.inventory.indexOf("Password Piece #2"), 1)
                            this.niko.inventory.splice(this.niko.inventory.indexOf("Password Piece #3"), 1)
                            this.niko.inventory.push("Full Password")   
                        }
                        else if(this.niko.inventory.includes("Password Piece #2")){
                            this.message = [["This fireplace is so dusty, There's a piece here"]]
                            this.dialog()
                            this.niko.inventory.push("Password Piece #3")
                        }
                        else{
                            this.message = [["This fireplace is so dusty, There's a piece here"]]
                            this.dialog()
                            this.niko.inventory.push("Password Piece #2")
                        }
                        this.niko.cleanFirePlace = true                        
                    }
                    else if(this.niko.cleanFirePlace == true){
                        this.message = [["Everything looks good here"]]
                        this.dialog()
                    }
                    else{
                        this.message = [["I dont have anything to clean this"]]
                        this.dialog()
                    }
                }
            },

            // POOL TABLE PARTS
            "blueCouch":()=>{
                if(this.niko.strayList == 0){
                    this.message = [["What a nice painting"]]
                    this.dialog()
                }
                else if(this.niko.strayList == 1){
                    this.message = [["Nothing in here"]]
                    this.dialog()
                }
                else if (this.computer == 3){
                    this.message = [["I wonder what this means"]]
                    this.dialog()
                } 
            },


            //COMPUTER
            "brownTable": ()=>{
                //Intro Message
                if(this.computer == 0){
                    this.message = [["Looks like I need a password to open this"]]
                    this.dialog()                  
                }

                //Once they get first password piece tells them its incomplete
                else if(this.computer == 1){
                    this.message = [["Ok lets put in the password... Huh that didn't work...", "Oh the note is ripped, maybe I should check the table again for more clues"]]
                    this.dialog()
                    this.computer = 2
                    this.niko.strayList = 2                    
                }

                //checks for full password
                else if(this.computer == 2){
                    if (this.niko.inventory.includes("Full Password")){
                        this.message = [["The password was right! But it looks like I need another code to acess the time machine :|", "The password hint says 'painting'"]]
                        this.dialog()
                        this.computer = 3
                    }
                    else{
                        this.message = [["I dont think I have the full password yet"]]
                        this.dialog()
                    }
                }
                //Pool Table puzzle
                else if(this.computer == 3){
                    if(!this.niko.numpadIntro){
                        this.message = [["The computer is now asking for a pin.", "Where am I gonna find a pin code here?"], ["And why is a time machine so complicated!"], ["..."],["Actually scratch that. It kinda makes sense now", "Still very inconvenient"]]
                        this.dialog()
                        this.niko.numpadIntro = true
                    }
                    else{
                        this.combination = []
                        this.paused = true

                        this.button0 = this.physics.add.image(this.niko.x, this.niko.y+200, '0')
                        this.button0.setInteractive()
                        this.button0.on('pointerup', ()=> {
                            this.combination.push(0)
                        }, this.button0)

                        this.button1 = this.physics.add.image(this.niko.x-100, this.niko.y-100, '1')
                        this.button1.setInteractive()
                        this.button1.on('pointerup', ()=> {
                            this.combination.push(1)
                        }, this.button1)

                        this.button2 = this.physics.add.image(this.niko.x, this.niko.y-100, '2')
                        this.button2.setInteractive()
                        this.button2.on('pointerup', ()=> {
                            this.combination.push(2)
                        }, this.button2)

                        this.button3 = this.physics.add.image(this.niko.x+100, this.niko.y-100, '3')
                        this.button3.setInteractive()
                        this.button3.on('pointerup', ()=> {
                            this.combination.push(3)
                        }, this.button3)

                        this.button4 = this.physics.add.image(this.niko.x-100, this.niko.y, '4')
                        this.button4.setInteractive()
                        this.button4.on('pointerup', ()=> {
                            this.combination.push(4)
                        }, this.button4)

                        this.button5 = this.physics.add.image(this.niko.x, this.niko.y, '5')
                        this.button5.setInteractive()
                        this.button5.on('pointerup', ()=> {
                            this.combination.push(5)
                        }, this.button5)

                        this.button6 = this.physics.add.image(this.niko.x+100, this.niko.y, '6')
                        this.button6.setInteractive()
                        this.button6.on('pointerup', ()=> {
                            this.combination.push(6)
                        }, this.button6)

                        this.button7 = this.physics.add.image(this.niko.x-100, this.niko.y+100, '7')
                        this.button7.setInteractive()
                        this.button7.on('pointerup', ()=> {
                            this.combination.push(7)
                        }, this.button7)

                        this.button8 = this.physics.add.image(this.niko.x, this.niko.y+100, '8')
                        this.button8.setInteractive()
                        this.button8.on('pointerup', ()=> {
                            this.combination.push(8)
                        }, this.button8)

                        this.button9 = this.physics.add.image(this.niko.x+100, this.niko.y+100, '9')
                        this.button9.setInteractive()
                        this.button9.on('pointerup', ()=> {
                            this.combination.push(9)
                        }, this.button9)

                        const repeat = () =>{
                            if(this.combination.length != 4){
                                setTimeout(repeat, 2)
                            }
                            else{
                                this.paused = false
                                const pin = [4,9,8,6]
                                if(JSON.stringify(pin) == JSON.stringify(this.combination)){
                                    this.message = [["*Ping*", "Nice! The computer accepted the Pin!"], ["Still don't know how an arbitrary set of pool balls", "somehow made the pin of a time machine"], ["But hey! I ain't complaining!"]]
                                    this.dialog()
                                    this.computer = 4
                                }
                                else{
                                    this.message = [["*Womp Womp*", "Dangit, it doesn't accept the pin..."], ["..."],["The the computer say 'womp womp'?", "Neat"]]
                                    this.dialog()
                                }
                                this.button0.destroy()
                                this.button1.destroy()
                                this.button2.destroy()
                                this.button3.destroy()
                                this.button4.destroy()
                                this.button5.destroy()
                                this.button6.destroy()
                                this.button7.destroy()
                                this.button8.destroy()
                                this.button9.destroy()
                            }
                        }
                
                        repeat()
                    }
                }
                //Matching Diner/Drink
                else if(this.computer == 4){
                    this.message = [["The computer is showing a new message!", "But it is mostly Giberish..."], ['[12] -> "Ruzp ftq Mjq. Ndqmw Ftq Nqmd."', 'Like what does that even mean?', 'Is this encoded?']]
                    this.dialog()
                }
                else if(this.computer == 5){
                    this.message = [["The computer is showing a new message!", "But it is mostly Giberish..."], ['[12] -> "Ruzp ftq Mjq. Ndqmw Ftq Nqmd."', 'Like what does that even mean?', 'Is this encoded?']]
                    this.dialog()
                }
                else if(this.computer == 6){
                    this.message = [["The computer has a new message", "We better be done by now..."],['It reads "The Time Machine is Ready!, Enter the Time Machine."', "Neat! This time for sure I'll get home!"]]
                    this.dialog()
                }
            },
            "poolFloor1": ()=>{
                if (this.computer != 3){
                    this.message = [["Maybe I shouldn't worry about playing right now"]]
                    this.dialog()
                }
                else if(this.computer == 3){
                    if(this.wallTile.x == 18 || this.wallTile.y == 23){
                        this.message = [["The only ball left is the 4 ball"]]
                        this.dialog() 
                    }
                    else if(this.wallTile.x == 11 || this.wallTile.y == 27){
                        this.message = [["The only ball left is the 9 ball"]]
                        this.dialog() 
                    }
                }
            },
            "poolFloor2": ()=>{
                if (this.computer != 3){
                    this.message = [["Maybe I shouldn't worry about playing right now"]]
                    this.dialog()
                }
                else if(this.computer == 3){
                    if(this.wallTile.x == 11 || this.wallTile.y == 23){
                        this.message = [["The only ball left is the 8 ball"]] 
                        this.dialog()
                    }
                    else if(this.wallTile.x == 18 || this.wallTile.y == 27){
                        this.message = [["The only balls left are the 2 and 4 balls"]]
                        this.dialog() 
                    }
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
                    this.scene.start('completed2', {time: this.endTime, hints: this.hints})
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
        this.load.image('0', '/static/Assets/numpad/0.PNG')
        this.load.image('1', '/static/Assets/numpad/1.PNG')
        this.load.image('2', '/static/Assets/numpad/2.PNG')
        this.load.image('3', '/static/Assets/numpad/3.PNG')
        this.load.image('4', '/static/Assets/numpad/4.PNG')
        this.load.image('5', '/static/Assets/numpad/5.PNG')
        this.load.image('6', '/static/Assets/numpad/6.PNG')
        this.load.image('7', '/static/Assets/numpad/7.PNG')
        this.load.image('8', '/static/Assets/numpad/8.PNG')
        this.load.image('9', '/static/Assets/numpad/9.PNG')
    }

    create(){
        this.delay = this.time.now
        //For the Cursors
        //This Creates the Map + sets collisions
        this.map = this.make.tilemap({key : 'dungeon2'})
        this.tileset = this.map.addTilesetImage('stardew', 'tiles2')
        this.tileset2 = this.map.addTilesetImage('misc', 'tavern2')
        this.tileset3 = this.map.addTilesetImage('poolTable', 'pool2')
        const tilesetArr = [this.tileset, this.tileset2, this.tileset3]
        
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
        this.computer = 3

        //Stray Puzzle Pieces (Can be found around the map) COMPUTER = 0-2
        this.niko.strayList = 0
        this.niko.cleanBigPlant = false
        this.niko.cleanSmallPlant = false
        this.niko.cleanFirePlace = false
        //Pool Table Puzzle COMPUTER = 3
        this.niko.numpadIntro = false

        //Combination COMPUTER = 4

        //Deliver Drinks COMPUTER = 5

        //Break the Bear COMPUTER = 6

        //COMPUTER = 6 is the end
    }

    update(time, dTime){
       super.update()
    }
}

