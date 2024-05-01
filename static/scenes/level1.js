import Game from "./Game.js"
export default class level1 extends Game{

    constructor(){
        super('level1')
        this.currentLevel = 'level1'
        this.fnDict = {
            null: ()=>{
                return
            },
            "mop": ()=>{
                this.niko.inventory.push("mop")
                this.wallslayer.removeTileAt(29, 14, true, true, this.wallsLayer)
                this.wallslayer.removeTileAt(29, 15, true, true, this.wallsLayer)
            },
            "brownSign": ()=>{
                this.message = [['There is a note here.', 'It says "To anyone who finds my key, Plz give back. I lost it near the table."']]
                this.dialog()
                this.niko.checkedSign = true
            },
            "brownTable": ()=>{
                if(this.niko.checkedSign == false){
                    this.message = ["Just a regular table!"]
                    this.dialog()
                }
                else{
                    if(this.paused){
                        return ;
                    }
                    this.table = this.physics.add.image(this.niko.x, this.niko.y, 'table').setScale(0.6);
                    this.table.setInteractive(new Phaser.Geom.Rectangle(400, 500, 200, 100), Phaser.Geom.Rectangle.Contains)
                    this.paused = true
                    this.table.on('pointerup', ()=> {
                        this.fnDict['table']()
                        this.table.destroy()
                        this.paused = false
                    }, this.table);
                }
            },
            "greySign": ()=>{
                this.message = [['Another Sign!'], ['It has a little holder labeled blue key... But its empty', 'Maybe it fell somewhere around here.', "I'll just clean around here then till I find it!"]]
                this.dialog()
                this.niko.readGreySign = true
            },
            "hiddenKey": ()=>{
                if(this.niko.readGreySign && this.niko.inventory.includes("mop")){
                    this.message = [['The sign was right!', 'After a bit of sweepin... There was a Blue Key!', '*yoink* Mine now Bi-']]
                    this.dialog()
                    if(!this.niko.inventory.includes("blue key")){
                        this.niko.inventory.push("blue key")
                    }
                }
                else{
                    this.message = [['This place is awfully dusty...', 'Welp! That aint my problem. No sir.', 'Absolutely no reason for me to clean this mess', 'mhm']]
                    this.dialog()
                }
            },
            "unlockDoor": ()=>{
                if(this.niko.inventory.includes("blue key") && this.niko.inventory.includes("red key") && this.niko.inventory.includes("green key")){
                    this.message = [['Thats it!', 'All the Keys fit!', 'I can finally go back ho-', "Wait a minute... That doesn't look right..."]]
                    this.dialog()
                    this.scene.stop("level1")
                    this.map.destroy()
                    this.scene.start('completed1', {time: this.endTime, hints: this.hints})
                }
                else{
                    this.message = [["Huh, that's wierd...", "It's a big door! With three colored locks on it...", "A red, green, and blue one..."]]
                    this.dialog()
                }
            },
            "keg": ()=>{
                if(this.wallTile.x == 16 && this.niko.holdingDrink == false){
                    this.message = [["Its a wine keg!", "This one kinda tastes...", "A bit sweet?", "I think I'll bring a drink with me just in case"]]
                    this.dialog()
                    this.niko.inventory.push("A sweet drink?")
                    this.niko.holdingDrink = true
                }
                else if(this.wallTile.x == 16 && this.niko.holdingDrink == true){
                    this.message = [["Its a wine keg!", "This one kinda tastes...", "A bit sweet?", "But I'm already holding a drink..."]]
                    this.dialog()
                }
                else if(this.wallTile.x == 18 && this.niko.holdingDrink == false){
                    this.message = [["Its a wine keg!", "This one kinda tastes...", "A bit Sour?", "I think I'll bring a drink with me just in case"]]
                    this.dialog()
                    this.niko.inventory.push("A Sour drink?")
                    this.niko.holdingDrink = true
                }
                else if(this.wallTile.x == 18 && this.niko.holdingDrink == true){
                    this.message = [["Its a wine keg!", "This one kinda tastes...", "A bit Sour?", "But I'm already holding a drink..."]]
                    this.dialog()
                }
                else if(this.wallTile.x == 20 && this.niko.holdingDrink == false){
                    this.message = [["Its a wine keg!", "This one kinda tastes...", "PTOO, This one was HORRIBLE?!", "I think I'll bring a drink with me just in case"]]
                    this.dialog()
                    this.niko.inventory.push("Smirnoff Vodka")
                    this.niko.holdingDrink = true
                }
                else if(this.wallTile.x == 20 && this.niko.holdingDrink == true){
                    this.message = [["Its a wine keg!", "This one kinda tastes...", "PTOO, This one was HORRIBLE?!", "But I'm already holding a drink..."]]
                    this.dialog()
                }
                else if(this.wallTile.x == 22 && this.niko.holdingDrink == false){
                    this.message = [["Its a wine keg!", "This one kinda tastes...", "Like nothing?", "I think I'll bring a drink with me just in case"]]
                    this.dialog()
                    this.niko.inventory.push("Water")
                    this.niko.holdingDrink = true
                }
                else if(this.wallTile.x == 22 && this.niko.holdingDrink == true){
                    this.message = [["Its a wine keg!", "This one kinda tastes...", "Like nothing?", "But I'm already holding a drink..."]]
                    this.dialog()
                }
            },
            "bin": ()=>{
                if(this.niko.holdingDrink == false){
                    this.message = [["Its a little well!", "I can probably dispose of my trash here"]]
                    this.dialog()
                }
                else if(this.niko.holdingDrink == true){
                    this.message = [['"Hasta La Vista" little drink!','','[Held drink was disposed of]']]
                    this.dialog()
                    if(this.niko.inventory.includes("A sweet drink?")){
                        this.niko.inventory.splice(this.niko.inventory.indexOf("A sweet drink?"), 1)
                    }
                    else if(this.niko.inventory.includes("A Sour drink?")){
                        this.niko.inventory.splice(this.niko.inventory.indexOf("A Sour drink?"), 1)
                    }
                    else if(this.niko.inventory.includes("Smirnoff Vodka")){
                        this.niko.inventory.splice(this.niko.inventory.indexOf("Smirnoff Vodka"), 1)
                    }
                    else if(this.niko.inventory.includes("Water")){
                        this.niko.inventory.splice(this.niko.inventory.indexOf("Water"), 1)
                    }
                    this.niko.holdingDrink = false
                }
            },
            "barrel": ()=>{
                if(this.wallTile.x == 16 && this.niko.vodkaFilled){
                    this.message = [["This barrel is now full of Vodka...", "Maybe just a sip won't hurt"]]
                    this.dialog()
                }
                else if(this.wallTile.x == 16 && this.niko.inventory.includes("Smirnoff Vodka")){
                    this.message = [["Its a barrel!", "It has a label that reads...", "Smirnoff Vodka?", "OHHHHH, that makes much more sense.", "Welp, down it goes."]]
                    this.dialog()
                    this.niko.inventory.splice(this.niko.inventory.indexOf("Smirnoff Vodka"), 1)
                    this.niko.vodkaFilled = true
                    this.niko.holdingDrink = false
                }
                else if(this.wallTile.x == 16 && !this.niko.inventory.includes("Smirnoff Vodka")){
                    this.message = [["Its a barrel!", "It has a label that reads...", "Smirnoff Vodka?", "There is Vodka in this period?!"]]
                    this.dialog()
                }

                else if(this.wallTile.x == 18 && this.niko.waterFilled){
                    this.message = [["This barrel is now full of Poisned Water...", "Who just carries around poisoned water?"]]
                    this.dialog()
                }
                else if(this.wallTile.x == 18 && this.niko.inventory.includes("Water")){
                    this.message = [["Its a barrel!", "It has a label that reads...", "Poisoned Water!", "...", "Thankfully I didn't drink it yet. Down it goes!"]]
                    this.dialog()
                    this.niko.inventory.splice(this.niko.inventory.indexOf("Water"), 1)
                    this.niko.waterFilled = true
                    this.niko.holdingDrink = false
                }
                else if(this.wallTile.x == 18 && !this.niko.inventory.includes("Water")){
                    this.message = [["Its a barrel!", "It has a label that reads...", "Poisoned Water!", "...", "Note to self... Don't drink that..."]]
                    this.dialog()
                }

                else if(this.wallTile.x == 20 && this.niko.sweetFilled){
                    this.message = [["This barrel is now full of Sweet Tea!", "But I already had my fill. So it's okay!"]]
                    this.dialog()
                }
                else if(this.wallTile.x == 20 && this.niko.inventory.includes("A sweet drink?")){
                    this.message = [["Its a barrel!", "It has a label that reads...", "Sweet Tea!", "Oh neat!", "One more sip for the road aaaaand", "Down it goes!"]]
                    this.dialog()
                    this.niko.inventory.splice(this.niko.inventory.indexOf("A sweet drink?"), 1)
                    this.niko.sweetFilled = true
                    this.niko.holdingDrink = false
                }
                else if(this.wallTile.x == 20 && !this.niko.inventory.includes("A sweet drink?")){
                    this.message = [["Its a barrel!", "It has a label that reads...", "Sweet Tea!", "Oh neat!", "I'm really parched so I gotta get some of that!"]]
                    this.dialog()
                }

                else if(this.wallTile.x == 22 && this.niko.sourFilled){
                    this.message = [["This barrel is now full of Whiskey Sour...", "Still feeling kinda tipsy~"]]
                    this.dialog()
                }
                else if(this.wallTile.x == 22 && this.niko.inventory.includes("A Sour drink?")){
                    this.message = [["Its a barrel!", "The label got a bit clearer... It reads...", "Whiskey Sour!", "That was Alcohol!", "I guess that explains the wooziness...", "Lemme just pour it down..."]]
                    this.dialog()
                    this.niko.inventory.splice(this.niko.inventory.indexOf("A Sour drink?"), 1)
                    this.niko.sourFilled = true
                    this.niko.holdingDrink = false
                }
                else if(this.wallTile.x == 22 && !this.niko.inventory.includes("A Sour drink?")){
                    this.message = [["Its a barrel!", "A scrached up label reads...", "_his__y Sour", "I guess I need to look for something sour."]]
                    this.dialog()
                }

                if(this.niko.sourFilled && this.niko.sweetFilled && this.niko.vodkaFilled && this.niko.waterFilled){
                    const chestTile = this.wallslayer.putTileAt(820, 24, 18, this.wallslayer)
                    chestTile.properties.isInteractable = "chest"
                    chestTile.properties.collides = true
                    this.wallslayer.setCollisionByProperty({collides: true})
                }
            },
            "chest": ()=>{
                this.message = [["This chest just fell through the ceiling!", "I think the weight of all the barrels knocked it off or something.", "Pretty conveinent...", "Hey look a green key!"]]
                this.dialog()
                if(!this.niko.inventory.includes("green key")){
                    this.niko.inventory.push("green key")
                }
            },
            "table": ()=>{
                this.message = [["The sign was right! There was a key here! Its Red."]]
                this.dialog()
                if(!this.niko.inventory.includes("red key")){
                    this.niko.inventory.push("red key")
                }
            },
            "hintMachine": ()=>{
                if(!this.hintBookInteracted){
                    this.message = [["There is a wierd machine here!", 'It has a label on it saying "hint machine"', "There are instructions attached that says to interact when stuck"], ["[Gameplay Notice: You can use hints as many times as you want.", "However, sometimes the notes won't change.", "And using a hint, will cost you more of your overall score"]]
                    this.dialog()
                    this.hintBookInteracted = true
                }
                else if(!this.niko.inventory.includes("red key")){
                    this.hints += 1
                    this.message = [["Im kinda stuck of the bat", "Lets see what the machine has to say", "*BOOP*"],["*Machine Whirring*","'Three Keys are needed to escape, First find the red key","Someone has lost this key long ago, and left a note on a brown sign'"], ['hints used:'+this.hints]]
                    this.dialog()
                }
                else if(!this.niko.inventory.includes("green key")){
                    this.hints += 1
                    this.message = [["I got the red key now, but where are the others?", "Lets see what the machine has to say", "*BOOP*"],["*Machine Whirring*","'A blue key was stuck in the pipes of this place","The pipes must be flushed by filling the kegs with their respective drinks'"], ['hints used:'+this.hints]]
                    this.dialog()
                }
                else if(!this.niko.inventory.includes("blue key")){
                    this.hints += 1
                    this.message = [["Two keys down! I just need help on this last one", "Lets see what the machine has to say", "*BOOP*"],["*Machine Whirring*","'The Green key was lost on the floor, among the dust", "Inspect the floor for out of place cracks, and inspect the grey sign'"], ['hints used:'+this.hints]]
                    this.dialog()
                }
                else{
                    this.hints += 1
                    this.message = [["I know what to do here!", "I already have all 3 keys, I just need to put them in the key to escape!"]]
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
        this.map = this.make.tilemap({key : 'dungeon'})
        this.tileset = this.map.addTilesetImage('dungeon3', 'tiles')
        this.tileset2 = this.map.addTilesetImage('stardewValley_assets', 'tavern')
        const tilesetArr = [this.tileset, this.tileset2]
        
        this.floorlayer = this.map.createLayer('floor', tilesetArr)
        this.wallslayer = this.map.createLayer('Walls', tilesetArr)
        this.floorInteractLayer = this.map.createLayer('floorInteractables', tilesetArr)
        super.create()

        this.wallslayer.setCollisionByProperty({collides: true})

        this.physics.add.collider(this.niko, this.wallslayer)

        this.niko.checkedSign = false;
        this.niko.readGreySign = false;
        this.niko.holdingDrink = false;

        this.niko.vodkaFilled = false;
        this.niko.waterFilled = false;
        this.niko.sweetFilled = false;
        this.niko.sourFilled = false;

        // For Debugging
        // const debugGraphics = this.add.graphics().setAlpha(0.7)
        // this.wallslayer.renderDebug(debugGraphics, {
        //     tileColor:null,
        //     collidingTileColor: new Phaser.Display.Color(255,255,0, 255),
        //     faceColor: new Phaser.Display.Color(255, 0, 255, 255)
        // })
    }

    update(time, dTime){
       super.update()
    }
}

