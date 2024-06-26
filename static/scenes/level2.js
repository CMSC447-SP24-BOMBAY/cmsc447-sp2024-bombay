import Game from "./Game.js"
export default class level2 extends Game{

    constructor(){
        super('level2')
        this.currentLevel = 'level2'
        this.fnDict = {
            null: ()=>{
                return
            },
            //Things that dont do anything
            "roundTable":()=>{
                this.message = [["Doesn't look like theres anything on this table...", "I should probably check tables that have things on them"]]
                this.dialog()
            },
            "brownChest":()=>{
                this.message = [["Hmm there's a magazine here:", "TIME TRAVELERS WEEKLY", "Doesn't look like much..."]]
                this.dialog()
            },
            "pinkTable":()=>{
                if(this.cashRechisterChecked == true){
                    this.message = [["This doesn't look like a table that needs to be served...","Maybe I should serve the tables with the green seats"]]
                    this.dialog()
                }
                else{
                    this.message = [["Hmm nothing on this table"]]
                    this.dialog()
                }
            },
            "darkBrownDrawers":()=>{
                this.message = [["Just a bunch of junk in here"]]
                this.dialog()
            },
            "tanDrawers":()=>{
                this.message = [["Just a bunch of junk in here"]]
                this.dialog()
            },
            "tanBookshelf":()=>{
                this.message = [["Looks like a screenplay... for Shrek the Musical"]]
                this.dialog()
            },
            "brownBookshelf":()=>{
                this.message = [["I dont see any books that look special here"]]
                this.dialog()
            },

            // SCATTERED PUZZLE PIECES
            //This table is for the user to figure out where the password pieces are
            "brokenTable": ()=>{
                //Clue for first piece of password
                if(this.strayList == 0){
                    this.message = [["Huh... There's ripped up note here... it says"],[ "Before Closing :", "Employees remember to check cushions for spare change or any lost items"]]
                    this.dialog() 
                    this.strayList = 1                  
                }
                else if (this.strayList == 1){
                    this.message = [["Hmm...The note said to check the cushions"]]
                    this.dialog()
                }
                //Clue for other password pieces
                else if (this.strayList == 2){
                    this.message = [["It looks like I missed another piece of the note"],[ "It says 'Also dust the plants and sweep the chimney'"]]
                    this.dialog()
                    this.niko.inventory.splice(this.niko.inventory.indexOf("Password"), 1)
                    this.niko.inventory.push("Password Piece #1")
                    this.strayList = 3
                }
                else if (this.strayList == 3){
                    this.message = [["I guess I should go clean the plants and the fireplace"]]
                    this.dialog()
                }
            
            },
            //Red couch that has first password piece
            "redCouch":()=>{
                if(this.strayList == 0){
                    this.message = [["What a nice couch?"]]
                    this.dialog()                  
                }
                else if(this.foundRedCouch == true){
                    this.message = [["Good thing I checked the couch"]]
                    this.dialog()
                }
                //If they know to check couch gives them password piece
                else{
                    this.message = [["There's a note in here, It says 'password is : time'"],["Kinda feels on the nose for a time machine..."]]
                    this.dialog()
                    this.niko.inventory.push("Password")
                    this.foundRedCouch = true
                    this.computer = 1
                }                
            },
            //Black couch that has quarter
            "blackCouch":()=>{
                if(this.strayList == 0){
                    this.message = [["This couch looks lumpy"]]
                    this.dialog()                  
                }
                else if(this.foundBlackCouch == true){
                    this.message = [["Nothing else in here"]]
                    this.dialog()
                }
                //If they havent gotten the quarter and know to look 
                else{
                    this.message = [["I feel something in here... oh its just a quarter"]]
                    this.dialog()
                    this.niko.inventory.push("quarter")
                    this.foundBlackCouch = true
                }  
            },
            "sideRedCouch":()=>{
                if(this.strayList == 0){
                    this.message = [["No time to sit"]]
                    this.dialog()                  
                }
                else{
                    this.message = [["Hmm nothing here... just some lint"]]
                    this.dialog()
                }  
            },
            "sideBlueCouch":()=>{
                if(this.strayList == 0){
                    this.message = [["No time to sit"]]
                    this.dialog()                  
                }
                else{
                    this.message = [["Hmm nothing here...", "Oh wait! There's an old cheeto!","Yum"]]
                    this.dialog()
                }  
            },
            //Red pot plant with password piece in it
            "smallPlant":()=>{
                if (this.strayList == 3){
                    if (this.niko.inventory.includes("mop") && this.cleanSmallPlant == false){
                        //Gives them password piece 2, 3, or 4 based on what they already have
                        if (this.niko.inventory.includes("Password Piece #3")){
                            this.message = [["I should probably clean up this spilled dirt..."],["Theres something in here...", "Its the last piece!"]]
                            this.dialog()
                            this.niko.inventory.splice(this.niko.inventory.indexOf("Password Piece #1"), 1)
                            this.niko.inventory.splice(this.niko.inventory.indexOf("Password Piece #2"), 1)
                            this.niko.inventory.splice(this.niko.inventory.indexOf("Password Piece #3"), 1)                                
                            this.niko.inventory.push("Full Password")   
                        }
                        else if(this.niko.inventory.includes("Password Piece #2")){
                            this.message = [["I should probably clean up this spilled dirt..."],["Theres something in here...", "Its another piece of the password!"]]
                            this.dialog()
                            this.niko.inventory.push("Password Piece #3")
                        }
                        else{
                            this.message = [["I should probably clean up this spilled dirt..."],["Theres something in here...", "Its another piece of the password!"]]
                            this.dialog()
                            this.niko.inventory.push("Password Piece #2")
                        }
                        this.cleanSmallPlant = true                              
                    }
                    //If they are still on this step but cleaned the plant already
                    else if(this.cleanSmallPlant == true){
                        this.message = [["All clean here"]]
                        this.dialog()
                    }
                    //If they dont have the mop in their inventory
                    else{
                        this.message = [["I dont have anything to clean this up..."]]
                        this.dialog()
                    }
                }
                //if they've already cleaned the plant
                else if(this.strayList >= 4){
                    this.message = [["Nothing else to clean here!"]]
                    this.dialog()
                }
                //if they dont know they have to clean the plant
                else{
                    this.message = [["What a nice plant, looks like someone spilled some dirt here"]]
                    this.dialog()
                }
            },
            //all yellow potted plants
            "bigPlant": ()=>{
                if (this.strayList == 3){
                    //checks for which plant it is
                    if(this.wallTile.y == 22 || this.wallTile.y == 23){
                        if (this.niko.inventory.includes("mop") && this.cleanBigPlant == false){
                            //Gives them password piece 2, 3, or 4 based on what they already have
                            if (this.niko.inventory.includes("Password Piece #3")){
                                this.message = [["Oh it looks like theres something in here..",  "I think this is the last piece!"]]
                                this.dialog()
                                this.niko.inventory.splice(this.niko.inventory.indexOf("Password Piece #1"), 1)
                                this.niko.inventory.splice(this.niko.inventory.indexOf("Password Piece #2"), 1)
                                this.niko.inventory.splice(this.niko.inventory.indexOf("Password Piece #3"), 1)
                                this.niko.inventory.push("Full Password")   
                            }
                            else if(this.niko.inventory.includes("Password Piece #2")){
                                this.message = [["Oh it looks like theres something in here..", "Its another piece of the password"]]
                                this.dialog()
                                this.niko.inventory.push("Password Piece #3")
                            }
                            else{
                                this.message = [["Oh it looks like theres something in here..", "Its another piece of the password"]]
                                this.dialog()
                                this.niko.inventory.push("Password Piece #2")
                            }
                            this.cleanBigPlant = true    

                        }
                        //If they already lceaned the plant
                        else if(this.cleanBigPlant == true){
                            this.message = [["Everything looks all good here"]]
                            this.dialog()
                        }
                        //if they dont have the mop
                        else{
                            this.message = [["This plant looks a bit dusty, I should probably get something to clean this"]]
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
            //Fireplace where password piece is found
            "firePlace": ()=>{
                if (this.strayList == 3){
                    if (this.niko.inventory.includes("mop") && this.cleanFirePlace == false){
                        //Gives them password piece 2, 3, or 4 base don what they already have
                        if (this.niko.inventory.includes("Password Piece #3")){
                            this.message = [["Theres alot of soot here... *COUGH* *COUGH*"],[ "Hey... there's the last piece!"]]
                            this.dialog()
                            this.niko.inventory.splice(this.niko.inventory.indexOf("Password Piece #1"), 1)
                            this.niko.inventory.splice(this.niko.inventory.indexOf("Password Piece #2"), 1)
                            this.niko.inventory.splice(this.niko.inventory.indexOf("Password Piece #3"), 1)
                            this.niko.inventory.push("Full Password")   
                        }
                        else if(this.niko.inventory.includes("Password Piece #2")){
                            this.message = [["Theres alot of soot here... *COUGH* *COUGH*"],[ "Hey... there's another piece"]]
                            this.dialog()
                            this.niko.inventory.push("Password Piece #3")
                        }
                        else{
                            this.message = [["Theres alot of soot here... *COUGH* *COUGH*"],[ "Hey... there's another piece"]]
                            this.dialog()
                            this.niko.inventory.push("Password Piece #2")
                        }
                        this.cleanFirePlace = true                        
                    }
                    //If they cleaned it
                    else if(this.cleanFirePlace == true){
                        this.message = [["Everything looks good here"]]
                        this.dialog()
                    }
                    //If they dont have a mop to clean it
                    else{
                        this.message = [["I dont have anything I can use to clean this"]]
                        this.dialog()
                    }
                }
                //If the fireplace is cleaned
                else if(this.cleanFirePlace == true){
                    this.message = [["Everything looks good here"]]
                    this.dialog()
                }
                //Before they know to clean the fireplace
                else{
                    this.message = [["This place looks kinda dusty"]]
                    this.dialog()
                }
            },

            // POOL TABLE PUZZLE
            //Tells the user that the pool painting is relvant
            "paintingBackground":()=>{
                if(this.computer == 3){
                    this.message = [["This painting looks a bit out of place..."],["This probably has something to do with the computer code"]]
                    this.dialog()
                }
                else{
                    this.message = [["What a nice painting"]]
                    this.dialog()
                }
            },
            //Tells the user that the other painting is irrelevant
            "paintingFloor":()=>{
                if (this.computer == 3){
                    this.message = [["Nothing looks strange here...", "I don't think this is the painting the computer is", "talking about"]]
                    this.dialog()
                }
                else{
                    this.message = [["Hmm nothing here..."]]
                    this.dialog()
                }
            },
            //If they interact with the couch instead of the painting
            "blueCouch":()=>{
                if(this.strayList == 0){
                    this.message = [["What a nice painting"]]
                    this.dialog()
                }
                else if(this.strayList == 1){
                    this.message = [["Nothing in here"]]
                    this.dialog()
                }
                else if (this.computer == 3){
                    this.message = [["This painting looks a bit out of place..."],["This probably has something to do with the computer code"]]
                    this.dialog()
                } 
            },

            //COMPUTER
            "brownTable": ()=>{
                //Intro Message
                if(this.computer == 0){
                    this.message = [["Looks like I need a password to open the computer..."]]
                    this.dialog()                  
                }

                //Once they get first password piece tells them its incomplete
                else if(this.computer == 1){
                    this.message = [["Ok lets put in the password..."],[ "Huh that didn't work...", "Oh the note is ripped, maybe I should check the table again for more clues"]]
                    this.dialog()
                    this.computer = 2
                    this.strayList = 2                    
                }

                //checks for full password
                else if(this.computer == 2){
                    if (this.strayList == 2){
                        this.message = [["Maybe I should check the table again for more clues"]]
                        this.dialog()
                    }
                    else if (this.niko.inventory.includes("Full Password")){
                        this.message = [["The password was right!"," But it looks like the computer needs something else..."]]
                        this.dialog()
                        this.computer = 3
                        this.strayList = 4
                    }
                    else{
                        this.message = [["I dont think I have the full password yet"]]
                        this.dialog()
                    }
                }
                //Pool Table puzzle
                else if(this.computer == 3){
                    if(!this.niko.numpadIntro){
                        this.message = [["The computer is asking for a 4 digit pin...", "It says password hint : 'painting'"], ["Why is the time machine so complicated!"], ["..."],["Actually scratch that. It kinda makes sense now", "Still very inconvenient"]]
                        this.dialog()
                        this.niko.numpadIntro = true
                    }
                    else{
                        if(this.paused){
                            return ;
                        }
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
                    this.message = [["The computer has a new message!"], ["Please enter 1 dollar into time machine to continue"],["You can check the cash register for any extra money"],["ARE YOU KIDDING ME???", "ITS A TIME MACHINE MACHINE IN A BAR????", "IM NOT AT THE LAUNDROMAT"]]
                    this.dialog()
                }
                //Cipher puccle
                else if(this.computer == 5){
                    this.message = [["The computer is showing a new message!", "But it is mostly Giberish..."], ['[12] -> "Ruzp ftq Mjq. Ndqmw Ftq Nqmd."', 'Like what does that even mean?', 'Is this encoded?']]
                    this.dialog()
                }
                //Finished puzzles
                else if(this.computer == 6){
                    this.message = [["The computer has a new message", "We better be done by now..."],['It reads "The Time Machine is Ready!, Enter the Time Machine."', "Neat! This time for sure I'll get home!"]]
                    this.dialog()
                }
            },
            //When they get to the pin pad puzzle tells the player the code numbers
            "poolFloor1": ()=>{
                if (this.computer < 3){
                    this.message = [["Maybe I shouldn't worry about playing right now"]]
                    this.dialog()
                }
                else{
                    if(this.floorTile.x == 18 && this.floorTile.y == 23){
                        this.message = [["The only ball left is the 4 ball"]]
                        this.dialog() 
                    }
                    else if(this.floorTile.x == 11 && this.floorTile.y == 27){
                        this.message = [["The only ball left is the 9 ball"]]
                        this.dialog() 
                    }
                }
            },
            //When they get to the pin pad puzzle tells the player the code numbers
            "poolFloor2": ()=>{
                if (this.computer < 3){
                    this.message = [["Maybe I shouldn't worry about playing right now"]]
                    this.dialog()
                }
                else{
                    if(this.floorTile.x == 11 && this.floorTile.y == 23){
                        this.message = [["The only ball left is the 8 ball"]] 
                        this.dialog()
                    }
                    else if(this.floorTile.x == 18 && this.floorTile.y == 27){
                        this.message = [["The only ballleft is the 6 ball"]]
                        this.dialog() 
                    }
                }
            },
            //Gives user the cipher
            //Tried to be a bit more specific when they get to the cipher portion
            "wideBrownBookshelf": ()=>{
                if(this.computer == 5){
                    this.message = [["There is a book that looks out of place...", 'The cover reads...'], ['"Time Travelling for dummies, like you!"', "For security reasons, a time machine may be under many passwords", "This is mostly for security... and taxes.", "One such puzzle is often a cipher."], ["One such cipher we use is the Ceasar Cipher", "Where we take a coded string of characters, and shift them to the right!", "The code can be identified by a mess of letters and a number"], ["This must be the way to decode the computer's message!", "I just need to shift every letter right by 12"]]
                    this.dialog()                   
                }
                else{
                    this.message = [["There is a book that looks out of place...", 'The cover reads...'], ['"Time Travelling for dummies, like you!"', "For security reasons, a time machine may be under many passwords", "This is mostly for security... and taxes.", "One such puzzle is often a cipher."], ["One such cipher we use is the Ceasar Cipher", "Where we take a coded string of characters, and shift them to the right!", "The code can be identified by a mess of letters and a number"], ["Huh, for time travellers, that kinda seems outdated", "Then again, this seems like useful information to have. Handy!"]]
                    this.dialog()
                }
            },
            //ORDERS PUZZLE
            //tells the user the instructions for the orders
            "cashRegister": ()=>{
                if (this.computer < 4){
                    this.message = [["Its Locked"]]
                    this.dialog()
                }
                else if (this.computer == 4){
                    if (this.cashRegisterChecked == false){
                        this.cashRechisterChecked = true
                        this.message = [["Dang it, its locked..."], ["Maybe if I hit this cash register REALLLLY hard it'll open", "*BANG* *BANG* *BANG*"],["Well that was easy..", "Doesn't look like there's any money in here but there is an", "emplyee's handbook"], ["Employee's Handbook : ", "Make sure all tables are served, As a reminder:", "Wine is kept in the keg, Juice is in the barrel next to that", "Chips are in the big barrel at the bottom, and Cheese is next to that", "Remember you can use the trash can to get rid of food in you hands"]]
                        this.dialog()
                    }
                    else{
                        message =  [["Employees Handbook : ", "Make sure all tables are served, As a reminder:", "Wine is kept in the keg, Juice is in the barrel next to that", "Chips are in the big barrel at the bottom, and Cheese is next to that", "Remember you can use the trash can to get rid of food in you hands"]]
                        this.dialog()
                    }
                }
            },  
            //Tables to serve orders to
            "dinerTable": ()=>{
                if (this.cashRechisterChecked == true){
                    //top left table
                    if (this.wallTile.x == 38 && this.wallTile.y == 21){
                        if (this.servedTopLeft != true){
                            if (this.foodInHand == 0){
                                this.message = [["This table has a receipt for a bottle of wine, a juice box" , "and two orders of cheese"]]
                                this.dialog()
                            }
                            else if (this.foodInHand < 4){
                                this.message = [["Looks like I dont have the full order yet"],["This table has a receipt for a bottle of wine, a juice box" , "and two orders of cheese"]]
                                this.dialog()
                            }
                            //If order is correct gets rid of food and gives quarter
                            else if(this.foodInHand == 4){
                                if (this.niko.inventory.includes("wine") && this.niko.inventory.includes("juice") && (this.niko.inventory.filter(i => i === "cheese").length) == 2){
                                    this.message = [["Looks like I got the full order"], ["Hey look!", "I wonder how this quarter got here"]]
                                    this.dialog()
                                    while (this.foodInHand != 0){
                                        if (this.niko.inventory.includes("wine")) {
                                            const index = this.niko.inventory.indexOf("wine")
                                            this.niko.inventory.splice(index, 1)
                                            this.foodInHand -= 1
                                        } 
                                        else if (this.niko.inventory.includes("juice")) {
                                            const index = this.niko.inventory.indexOf("juice")
                                            this.niko.inventory.splice(index, 1)
                                            this.foodInHand -= 1
                                        } 
                                        else if (this.niko.inventory.includes("chips")) {
                                            const index = this.niko.inventory.indexOf("chips")
                                            this.niko.inventory.splice(index, 1)
                                            this.foodInHand -= 1
                                        } 
                                        else if (this.niko.inventory.includes("cheese")) {
                                            const index = this.niko.inventory.indexOf("cheese")
                                            this.niko.inventory.splice(index, 1)
                                            this.foodInHand -= 1
                                        }
                                    }
                                    
                                    this.niko.inventory.push("quarter")
                                    this.servedTopLeft = true
                                }
                                else{
                                    this.message = [["I don't have the right order... I think I need to restart"],["This table has a receipt for a bottle of wine, a juice box" , "and two orders of cheese"]]
                                    this.dialog()
                                }
                            }
                        }
                        else{
                            this.message = [["Ive already served this table"]]
                            this.dialog()
                        }
                    }
                    //top right table
                    else if (this.wallTile.x == 43 && this.wallTile.y == 21){
                        if (this.servedTopRight != true){
                            if (this.foodInHand == 0){
                                this.message = [["This table has a receipt for two bottles of wine and two bags of chips"]]
                                this.dialog()
                            }
                            else if (this.foodInHand < 4){
                                this.message = [["Looks like I dont have the full order yet"], ["This table has a receipt for two bottles of wine and two bags of chips"]]
                                this.dialog()
                            }
                            //Gets rid of food and gives quarter if order is right
                            else if(this.foodInHand == 4){
                                if ((this.niko.inventory.filter(i => i === "wine").length) == 2 && (this.niko.inventory.filter(i => i === "chips").length) == 2){
                                    this.message = [["Looks like I got the full order"], ["Not sure where this quarte came from...", "But I'll take it!"]]
                                    this.dialog()
                                    while (this.foodInHand != 0){
                                        if (this.niko.inventory.includes("wine")) {
                                            const index = this.niko.inventory.indexOf("wine")
                                            this.niko.inventory.splice(index, 1)
                                            this.foodInHand -= 1
                                        } 
                                        else if (this.niko.inventory.includes("juice")) {
                                            const index = this.niko.inventory.indexOf("juice")
                                            this.niko.inventory.splice(index, 1)
                                            this.foodInHand -= 1
                                        } 
                                        else if (this.niko.inventory.includes("chips")) {
                                            const index = this.niko.inventory.indexOf("chips")
                                            this.niko.inventory.splice(index, 1)
                                            this.foodInHand -= 1
                                        }
                                        else if (this.niko.inventory.includes("cheese")) {
                                            const index = this.niko.inventory.indexOf("cheese")
                                            this.niko.inventory.splice(index, 1)
                                            this.foodInHand -= 1
                                        }
                                    }
                                
                                    this.niko.inventory.push("quarter")
                                    this.servedTopRight = true
                                }
                                else{
                                    this.message = [["I don't have the right order... I think I need to restart"], ["This table has a receipt for two bottles of wine and two bags of chips"]]
                                    this.dialog()
                                }
                            }
                        }
                        else{
                            this.message = [["I've already served this table"]]
                            this.dialog()
                        }
                    }
                    //bottom right
                    else if (this.wallTile.x == 43 && this.wallTile.y == 25){
                        if (this.servedBottomRight != true){
                            if (this.foodInHand == 0){
                                this.message = [["This table has a receipt for four orders of cheese"], ["Kinda strange... but ok..."]]
                                this.dialog()
                            }
                            else if (this.foodInHand < 4){
                                this.message = [["Looks like I dont have the full order yet"], ["This table has a receipt for four orders of cheese"]]
                                this.dialog()
                            }
                            //Gets rid of food and gives quarter if order is right
                            else if(this.foodInHand == 4){
                                if ((this.niko.inventory.filter(i => i === "cheese").length) == 4){
                                    this.message = [["Looks like I got the full order"], ["Hey look!", "A quarter"]]
                                    this.dialog()
                                    while (this.foodInHand != 0){
                                        if (this.niko.inventory.includes("wine")) {
                                            const index = this.niko.inventory.indexOf("wine")
                                            this.niko.inventory.splice(index, 1)
                                            this.foodInHand -= 1
                                        } 
                                        else if (this.niko.inventory.includes("juice")) {
                                            const index = this.niko.inventory.indexOf("juice")
                                            this.niko.inventory.splice(index, 1)
                                            this.foodInHand -= 1
                                        }
                                        else if (this.niko.inventory.includes("chips")) {
                                            const index = this.niko.inventory.indexOf("chips")
                                            this.niko.inventory.splice(index, 1)
                                            this.foodInHand -= 1
                                        } 
                                        else if (this.niko.inventory.includes("cheese")) {
                                            const index = this.niko.inventory.indexOf("cheese")
                                            this.niko.inventory.splice(index, 1)
                                            this.foodInHand -= 1
                                        }
                                    }
                                
                                    this.niko.inventory.push("quarter")
                                    this.servedBottomRight = true
                                }
                                else{
                                    this.message = [["I don't have the right order... I think I need to restart"], ["This table has a receipt for four orders of cheese"]]
                                    this.dialog()
                                }
                            }
                        }
                        else{
                            this.message = [["I've already served this table"]]
                            this.dialog()
                        }
                    }
                    //bottom left table
                    else{
                        this.message = [["This table doesnt look like it needs anything"]]
                        this.dialog()
                    }
                }
                //if they didnt get to the order puzzle yet
                else{
                    this.message = [["Ehh im not really hungry right now"]]
                    this.dialog()
                }
            },
            //throws away any food in the users inventory
            "bin": ()=>{
                if (this.foodInHand > 0){
                    //checks for each item of food and removes it until no food is left
                    while (this.foodInHand != 0){
                        if (this.niko.inventory.includes("wine")) {
                            const index = this.niko.inventory.indexOf("wine")
                            this.niko.inventory.splice(index, 1)
                            this.foodInHand -= 1
                        } 
                        else if (this.niko.inventory.includes("juice")) {
                            const index = this.niko.inventory.indexOf("juice")
                            this.niko.inventory.splice(index, 1)
                            this.foodInHand -= 1
                        } 
                        else if (this.niko.inventory.includes("chips")) {
                            const index = this.niko.inventory.indexOf("chips")
                            this.niko.inventory.splice(index, 1)
                            this.foodInHand -= 1
                        } 
                        else if (this.niko.inventory.includes("cheese")) {
                            const index = this.niko.inventory.indexOf("cheese")
                            this.niko.inventory.splice(index, 1)
                            this.foodInHand -= 1
                        }
                    }
                    this.message = [["Ok let me get rid of this food"]]
                    this.dialog()
                }
                else{
                    this.message = [["I dont have any food to get rid of..."]]
                    this.dialog()
                }
            },
            //lets the user pick up wine if they are at the order puzzle
            "keg": ()=>{
                if (this.cashRechisterChecked == true){
                    //if they have too much in their hands
                    if (this.foodInHand == 4){
                        this.message = [["I dont think I have enough space to hold anything else"]]
                        this.dialog()
                    }
                    else{
                        this.message = [["Let me grab a bottle wine"]]
                        this.dialog()
                        this.niko.inventory.push("wine")
                        this.foodInHand += 1
                    }
                }
                else{
                    this.message = [["This keg smells like grapes"]]
                    this.dialog()
                }
            },
            //lets the user pick up juice if they are at the order puzzle
            "bigBarrel": ()=>{
                if (this.cashRechisterChecked == true){
                    if (this.foodInHand == 4){
                        this.message = [["I dont think I have enough space to hold anything else"]]
                        this.dialog()
                    }
                    else{
                        this.message = [["Let me grab a juice box"]]
                        this.dialog()
                        this.niko.inventory.push("juice")
                        this.foodInHand += 1
                    }
                }
                else{
                    this.message = [["This barrel smells tropical"]]
                    this.dialog()
                }               
            },
            //lets the user pick up chips if they are at the order puzzle
            "wideBarrel": ()=>{
                if (this.cashRechisterChecked == true){
                    if (this.foodInHand == 4){
                        this.message = [["I dont think I have enough space to hold anything else"]]
                        this.dialog()
                    }
                    else{
                        this.message = [["Let me grab a bag of chips"]]
                        this.dialog()
                        this.niko.inventory.push("chips")
                        this.foodInHand += 1
                    }
                }
                else{
                    this.message = [["This barrel smells oily"]]
                    this.dialog()
                }               
            },
            //lets the user pick up cheese if they are at the order puzzle
            "thinBarrel": ()=>{
                if (this.cashRechisterChecked == true){
                    if (this.foodInHand == 4){
                        this.message = [["I dont think I have enough space to hold anything else"]]
                        this.dialog()
                    }
                    else{
                        this.message = [["Let me grab a slice cheese"]]
                        this.dialog()
                        this.niko.inventory.push("cheese")
                        this.foodInHand += 1
                    }
                }
                else{
                    this.message = [["This barrel smells funky"]]
                    this.dialog()
                }               
            },

            //Bear/Cipher puzzle
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
                if(this.computer == 5 && this.niko.inventory.includes("axe")){
                    this.message = [["If I deciphered the message correctly, then I need to cut this bear's head off!"],["*SWING*"],["Huh, would you look at that", "There was a button underneath!", "*Presses Button*"],["***COMPUTER PING***", "I think that did it!"]]
                    this.dialog()
                    this.removedHead = true
                    this.computer = 6
                    this.wallslayer.removeTileAt(38, 16, true, true, this.wallsLayer)
                    this.wallslayer.removeTileAt(37, 16, true, true, this.wallsLayer)
                }
                else{
                    this.message = [["The head of this bear kind of looks a bit off..."],["..."],["Freddy Fazbear?"]]
                    this.dialog()
                }
            },
            "timeMachine": ()=>{
                //gets 4 quarters from user if at the right step
                if(this.computer == 4){
                    if ((this.niko.inventory.filter(i => i === "quarter").length) == 4){
                        this.computer = 5
                        this.message = [["Payment accepted!", "Powered up and ready to activate!", "Please return to the computer to activate the time machine"]]
                        this.dialog()
                        this.niko.inventory.splice
                        while (this.niko.inventory.includes("quarter")){
                            const index = this.niko.inventory.indexOf("quarter")
                            this.niko.inventory.splice(index, 1)
                        }
                    }
                    //if they dont have 4 quarters
                    else{
                        this.message = [["Insufficient funds", "Please come back when you have 4 quarters"]]
                        this.dialog()
                    }
                }
                //ends level
                else if(this.computer == 6){
                    this.scene.stop("level2")
                    this.scene.start('completed2', {time: this.endTime, hints: this.hints})
                }
                //default message at start of puzzle
                else{
                    this.message = [["There is a label on the side of this machine...","It reads 'time machine'"],["Will I be able to go home in this?!"]]
                    this.dialog()
                }
            },
            //HINT MACHINE
            "hintMachine":() =>{
                //default message
                if(!this.hintBookInteracted){
                    this.message = [["There is a wierd machine here!", 'It has a label on it saying "hint machine"', "There are instructions attached that says to interact when stuck"], ["[Gameplay Notice: You can use hints as many times as you want.", "However, sometimes the notes won't change.", "And using a hint, will cost you more of your overall score"]]
                    this.dialog()
                    this.hintBookInteracted = true
                }
                else if (this.strayList <= 1){
                    this.hints += 1
                    this.message = [["Hmm Im not really sure where to start...", "Lets see what the machine has to say", "*BOOP*"],["*Machine Whirring*","'To escape you must activate the time machine","But the computer is locked...","You should go check the tables for anything that'll help you'"], ['hints used:'+this.hints]]
                    this.dialog()                
                }
                else if (this.strayList <= 3){
                    this.hints += 1                    
                    this.message = [["I don't know where to look for more pieces of the password...", "Lets see what the machine has to say", "*BOOP*"],["*Machine Whirring*", "To find the other pieces of the password, check the table again...", "There might be some other things you need to clean", "You should also make sure you have a tool to clean them" ], ['hints used:'+this.hints]]
                    this.dialog()
                }
                else if (this.computer == 3){
                    this.hints += 1                    
                    this.message = [["I don't know what the painting means... ", "Lets see what the machine has to say", "*BOOP*"],["*Machine Whirring*", "The numbers on the painting correspond to the order of the pool tables", "In the painting the top left pool table has the number 3 on it","So the top left pool table has the third digit of the pin" ], ['hints used:'+this.hints]]
                    this.dialog()
                }
                else if(this.computer == 4){
                    this.hints +=1
                    this.message = [["Well where am I supposed to get money from?", "Lets see what the machine has to say", "*BOOP*"],["*Machine Whirring*", "You can go to the cash register for instructions on how to earn money", "With those instructions you should gather different food orders", "from this room and deliver them to their corresponding table" ],["If all the tables have been served and you still dont have enough money", "you should look around the room for something you missed"], ['hints used:'+this.hints]]
                    this.dialog()
                }
                else if (this.computer == 5){
                    this.hints += 1
                    this.message = [["What does the computer's message even mean...", "Lets see what the machine has to say", "*BOOP*"],["*Machine Whirring*","The computers message is encoded","To decipher it you should use a code thats been mentioned in the room","The decoded message will be an instruction to activate the time machine"], ['hints used:'+this.hints]]
                    this.dialog()     
                }
                else if(this.computer == 6){
                    this.message = [["What should I do now...", "*BOOP*"],["*Machine Whirring*"," WHY ARE YOU STILL HERE YOU DID EVERYTHING!"]]
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
 
        this.niko.setX(410)
        this.niko.setY(360)
        //Hnt machine variables
        this.hintBookInteracted = false
        this.hints = 0

        //The stage of the puzzle
        this.computer = 0


        this.removedHead = 0

        //Stray Puzzle Pieces (Can be found around the map) COMPUTER = 0-2
        this.strayList = 0
        this.cleanBigPlant = false
        this.cleanSmallPlant = false
        this.cleanFirePlace = false
        this.foundBlackCouch = false
        this.foundRedCouch = false
        //Pool Table Puzzle COMPUTER = 3
        this.niko.numpadIntro = false

        //Combination COMPUTER = 4

        //Deliver Drinks COMPUTER = 5
        this.cashRegisterChecked = false
        this.foodInHand = 0
        this.servedTopLeft = false
        this.servedTopRight = false 
        this.servedBottomRight = false
        //Break the Bear COMPUTER = 6

        //COMPUTER = 6 is the end
    }

    update(time, dTime){
       super.update()
    }
}

