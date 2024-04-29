import Game from "./Game.js"
export default class level3 extends Game{

    constructor(){
        super('level3')
        this.currentLevel = 'level3'
        this.fnDict = {
            null: ()=>{
                return
            },
            "laptop": ()=>{
                if(!this.niko.interactLaptop){
                    this.message = [["There is a laptop here, with a single text file open", '"To whoever finds the laptop, there is a not so secret pin around here', 'that if you use, can unlock this room and set room power to 1"']]
                    this.dialog()
                    this.niko.interactLaptop = true
                }
                else if(this.niko.interactLaptop && !this.niko.unlockedLaptop){
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
                            const pin = [5,4,1,2]
                            if(JSON.stringify(pin) == JSON.stringify(this.combination)){
                                this.message = [["*Ping*", "Nice! The computer accepted the Pin!"], ["A new message appeared!", "It seems that the room is now open!", "And interacting again will set room power to one!"]]
                                this.dialog()
                                this.niko.unlockedLaptop = true
                                this.wallslayer.removeTileAt(47, 26, true, true, this.wallsLayer)
                                this.wallslayer.removeTileAt(47, 27, true, true, this.wallsLayer)
                                this.wallslayer.removeTileAt(47, 28, true, true, this.wallsLayer)
                                this.wallslayer.removeTileAt(47, 29, true, true, this.wallsLayer)
                            }
                            else{
                                this.message = [["*Womp Womp*", "Dangit, it doesn't accept the pin..."], ["..."],["Wait... Womp womp again?"]]
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
                else{
                    this.message = ["Lemme just set the current room power to one!", "*Flicks switch*"]
                    this.dialog()
                    this.roomPower = 1
                    this.darkness.setScale(6)
                }
            },
            "todoList": ()=>{
                this.message = [["There is a little post-it note here...", "It talks about something related to this 'red powder'"], ['"To refine this red powder', 'There are a couple of reactions it must undergo."'], ['"First, add water to make red paste', 'Then, boil to obtain red mass"'], ['"Then dice this red mass to make red crystals', 'Finally, chill this to make refined red powder"']]
                this.dialog()
            },
            "redPowder": ()=>{
                if(!this.obtainedRed){
                    this.niko.inventory.push("red powder")
                    this.obtainedRed = true
                    this.message = [["*picked up red powder*", "*sniff sniff*"], ["... This kinda smells like chili powder..."], ["I shouLd not be just sniffing random powder..."]]
                    this.dialog()
                }
                else{
                    this.message = [["I already picked up this red powder...", "I don't need anymore..."], ["Unless..."]]
                    this.dialog()
                }
            },
            "sink": ()=>{
                if(this.niko.inventory.includes("red powder")){
                    this.message = [["Soooo, the first step is to add water to this powder", "...", "So uh, do I just throw it on?"], ["A screw it!", "*Tosses Red Powder*", "..."], ["Huh, it didn't do anyth-", "*BANG* *BANG* *BANG*"],["AHHHHHHHH!", "...", "Is it over?"], ["Oh there is some red paste in the pot. Neat."]]
                    this.dialog()
                    const index = this.niko.inventory.indexOf("red powder")
                    this.niko.inventory.splice(index, 1)
                    this.niko.inventory.push("red paste")
                }
                else{
                    this.message = [["I- I dont think I need to be using this yet..."], ["I don't really wanna get wet..."]]
                    this.dialog()
                }
            },
            "stove": ()=>{
                if(this.niko.inventory.includes("red paste")){
                    this.message = [["Now I gotta boil this?"], ["Is it gonna start popping again?...", "Only one way to find out......", "*Throws Paste onto stovetop*"], ["..."], ["Hey would you look at that. Nothing even happened this ti-", "*BANG* *BANG* *BANG*"], ["NOT AGAIN!", "...", "Is it over now?"], ["Oh hey neat, there is some red goey mass now."]]
                    this.dialog()
                    const index = this.niko.inventory.indexOf("red paste")
                    this.niko.inventory.splice(index, 1)
                    this.niko.inventory.push("red mass")
                }
                else{
                    this.message = [["I- I dont think I need to be using this yet..."], ["But fire tho..."]]
                    this.dialog()
                }
            },
            "cuttingBoard": ()=>{
                if(this.niko.inventory.includes("red mass")){
                    this.message = [["Now I gotta dice this?"], ["There is now way this starts popping again...", "Right?"], ["*Gently starts dicing the mass*", "..."], ["..."], ["Huh, it actually was safe this time...", "Oh neat red crstyals!"]]
                    this.dialog()
                    const index = this.niko.inventory.indexOf("red mass")
                    this.niko.inventory.splice(index, 1)
                    this.niko.inventory.push("red crystals")
                }
                else{
                    this.message = [["I- I dont think I need to be using this yet..."], ["I feel like I might end up stabbing myself", "if I had to use this cutting board"]]
                    this.dialog()
                }
            },
            "freezer": ()=>{
                if(this.niko.inventory.includes("red crystals") && this.roomPower <= 1){
                    this.message = [["Final step! Now I just gotta chill this.", "But wait... The freezer isn't even on?"], ["Oh there is a label here!", '"The freezer is only usable, once room power is set to 2 or above"'], ["So I gotta find a way to increase the power?"]]
                    this.dialog()
                }
                else if(this.niko.inventory.includes("red crystals") && this.roomPower >= 2){
                    this.message = [["Now I just need to chill this."], ["It took a while to get the power up", "But hey! Its finally done!"], ["*Throws the crystals into the fridge*", "*Shuts fridge door*"], ["...", "I feel like I'm forgetting something..."], ["*BANG* *BANG* *BANG*", "*BANG* *BANG* *BANG*", "*BANG* *BANG* *BANG*"], ["JEEZ, MY EARS!","..."], ["Oh neat, there is a large looking red clump now :)"]]
                    this.dialog()
                    const index = this.niko.inventory.indexOf("red crystals")
                    this.niko.inventory.splice(index, 1)
                    this.niko.inventory.push("Refined Red Stone")
                }
                else{
                    this.message = [["I- I dont think I need to be using this yet..."], ["Do they got ice pops in there?"]]
                    this.dialog()
                }
            },
            "largeTV": ()=>{
                if(!this.interactLargeTV){
                    this.message = [["There is a note on this TV...", "It reads..."], ["In order to increase the room power again,", "The blast furnace next to this TV must be turned on"], ["A sequence will appear on this TV that will indicate the order"]]
                    this.dialog()
                    this.interactLargeTV = true
                }
                else{
                    if(this.paused){
                        return ;
                    }
                    else{
                        this.paused = true
                        const pos1 = () =>{
                            this.star = this.physics.add.image(this.niko.x-100, this.niko.y-100, 'star').setScale(0.3)
                            setTimeout(pos2, 1000)
                        }
                        const pos2 = () =>{
                            this.star.setX(this.niko.x+100)
                            setTimeout(pos3, 1000)
                        }
                        const pos3 = () =>{
                            this.star.setX(this.niko.x + 200)
                            this.star.setY(this.niko.y)
                            setTimeout(pos4, 1000)
                        }
                        const pos4 = () =>{
                            this.star.setX(this.niko.x - 200)
                            setTimeout(pos5, 1000)
                        }
                        const pos5 = () =>{
                            this.star.setX(this.niko.x+100)
                            this.star.setY(this.niko.y + 100)
                            setTimeout(pos6, 1000)
                        }
                        const pos6 = () =>{
                            this.star.setX(this.niko.x - 100)
                            setTimeout(end, 1000)
                        }
                        const end = () =>{
                            this.paused = false
                            this.star.destroy()
                        }
                        pos1()
                        
                    }
                }
            },
            "starFurnace": ()=>{
                if(!this.interactLargeTV){
                    this.message = [["Jeezus... Thats a big ah furnace...", "I wonder what it's for?"], ["It looks kinda old fashioned... Still neat!"]]
                    this.dialog()
                }
                else if(this.interactLargeTV && !this.furnaceUnlocked){
                    if(this.paused){
                        return ;
                    }
                    else{
                        this.paused = true
                        this.combination = []

                        this.star1 = this.physics.add.image(this.niko.x-100, this.niko.y-100, 'star').setScale(0.3)
                        this.star1.setInteractive()
                        this.star1.on('pointerup', ()=> {
                            this.combination.push(1)
                        }, this.star1)

                        this.star2 = this.physics.add.image(this.niko.x+100, this.niko.y-100, 'star').setScale(0.3)
                        this.star2.setInteractive()
                        this.star2.on('pointerup', ()=> {
                            this.combination.push(2)
                        }, this.star2)

                        this.star3 = this.physics.add.image(this.niko.x+200, this.niko.y, 'star').setScale(0.3)
                        this.star3.setInteractive()
                        this.star3.on('pointerup', ()=> {
                            this.combination.push(3)
                        }, this.star3)

                        this.star4 = this.physics.add.image(this.niko.x-200, this.niko.y, 'star').setScale(0.3)
                        this.star4.setInteractive()
                        this.star4.on('pointerup', ()=> {
                            this.combination.push(4)
                        }, this.star4)

                        this.star5 = this.physics.add.image(this.niko.x+100, this.niko.y+100, 'star').setScale(0.3)
                        this.star5.setInteractive()
                        this.star5.on('pointerup', ()=> {
                            this.combination.push(5)
                        }, this.star5)

                        this.star6 = this.physics.add.image(this.niko.x-100, this.niko.y+100, 'star').setScale(0.3)
                        this.star6.setInteractive()
                        this.star6.on('pointerup', ()=> {
                            this.combination.push(6)
                        }, this.star6)

                        const repeat = () =>{
                            if(this.combination.length != 6){
                                setTimeout(repeat, 2)
                            }
                            else{
                                this.paused = false
                                const pin = [1,2,3,4,5,6]
                                if(JSON.stringify(pin) == JSON.stringify(this.combination)){
                                    this.message = [["*WHOOSH*"], ["Jeez man?!", "Fire just blared out!"], ["Oh neat! There is a now a button to turn on level2 power!"]]
                                    this.dialog()
                                    this.furnaceUnlocked = true
                                }
                                else{
                                    this.message = [["*Womp Womp*", "Dangit, it doesn't accept the combination..."], ["..."],["At this point, I'm expecting everything to womp womp"]]
                                    this.dialog()
                                }
                                this.star1.destroy()
                                this.star2.destroy()
                                this.star3.destroy()
                                this.star4.destroy()
                                this.star5.destroy()
                                this.star6.destroy()
                            }
                        }
                        repeat()
                    }
                }
                else{
                    this.roomPower = 2
                    this.message = [["Aiight, lemme switch on to more power!", "Come on Level 2!"]]
                    this.dialog()
                    this.darkness.setScale(9)
                }
            },
            "purpleTablet": ()=>{
                if(this.roomPower < 2){
                    this.message = [["There is a note on this tablet here..."], ["I can only open the door to the outer labs", "only if the room has level 2 power..."], ["I need more???"]]
                    this.dialog()
                }
                else if(!this.tabletUnlocked && this.roomPower >=2){
                    this.tabletUnlocked = true
                    this.message = [["Neato! I can turn open the door to the next layers!"]]
                    this.dialog()

                    this.wallslayer.removeTileAt(54, 24, true, true, this.wallsLayer)
                    this.wallslayer.removeTileAt(54, 25, true, true, this.wallsLayer)
                    this.wallslayer.removeTileAt(54, 26, true, true, this.wallsLayer)
                    this.wallslayer.removeTileAt(54, 27, true, true, this.wallsLayer)
                    this.wallslayer.removeTileAt(54, 28, true, true, this.wallsLayer)

                    this.wallslayer.removeTileAt(23, 24, true, true, this.wallsLayer)
                    this.wallslayer.removeTileAt(23, 25, true, true, this.wallsLayer)
                    this.wallslayer.removeTileAt(23, 26, true, true, this.wallsLayer)
                    this.wallslayer.removeTileAt(23, 27, true, true, this.wallsLayer)

                    this.wallslayer.removeTileAt(23, 31, true, true, this.wallsLayer)
                    this.wallslayer.removeTileAt(23, 32, true, true, this.wallsLayer)
                    this.wallslayer.removeTileAt(23, 33, true, true, this.wallsLayer)
                    this.wallslayer.removeTileAt(23, 34, true, true, this.wallsLayer)
                    this.wallslayer.removeTileAt(23, 35, true, true, this.wallsLayer)
                    this.wallslayer.removeTileAt(23, 36, true, true, this.wallsLayer)
                }
                else{
                    this.message = [["I already opened the doors...", "I don't really need this anymore"], ["..."], ["Can I pirate Kung Fu Panda 4 on this?"]]
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
        this.load.image('blackout', '/static/Assets/Map Sprites/blackScreen.png')
        this.load.image('star', '/static/Assets/Map Sprites/star.png')
    }

    create(){
        this.delay = this.time.now
        //For the Cursors
        //This Creates the Map + sets collisions
        this.map = this.make.tilemap({key : 'dungeon3'})
        this.tileset = this.map.addTilesetImage('stardewLabs', 'tiles3')
        this.tileset2 = this.map.addTilesetImage('stardewComponents', 'tavern3')
        const tilesetArr = [this.tileset, this.tileset2]
        
        this.floorlayer = this.map.createLayer('floor', tilesetArr)
        this.wallslayer = this.map.createLayer('Walls', tilesetArr)
        this.floorInteractLayer = this.map.createLayer('floorInteractables', tilesetArr)
        this.decorLayer = this.map.createLayer('walldecor', tilesetArr)
        super.create()
        this.niko.inventory = ["mop"]
        this.niko.setX(600)
        this.niko.setY(400)

        this.wallslayer.setCollisionByProperty({collides: true})

        this.physics.add.collider(this.niko, this.wallslayer)

        //This is the fog of war to implement.
        this.darkness = this.physics.add.image(this.niko.x-192, this.niko.y-100, 'blackout').setScale(3.7)
        this.darkness.setScrollFactor(0)

        // For Debugging
        // const debugGraphics = this.add.graphics().setAlpha(0.7)
        // this.wallslayer.renderDebug(debugGraphics, {
        //     tileColor:null,
        //     collidingTileColor: new Phaser.Display.Color(255,255,0, 255),
        //     faceColor: new Phaser.Display.Color(255, 0, 255, 255)
        // })

        //Puzzle Specific pieces
        this.roomPower = 0
        this.obtainedRed = false
        this.interactLaptop = false
        this.unlockedLaptop = false
        this.interactLargeTV = false
        this.furnaceUnlocked = false
        this.tabletUnlocked = false
    }

    update(time, dTime){
       super.update()
    }
}

