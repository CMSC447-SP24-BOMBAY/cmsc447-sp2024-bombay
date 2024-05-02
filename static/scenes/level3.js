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
            },
            "cola": ()=>{
                if(!this.interactCola){
                    this.message = [["Its a Coca Cola Machine ™", "But it looks like there is some clear stone stuck in there..."], ["I might need that. But how can I knock it out?", "..."], ["The floor looks pretty dusty around here...", "Maybe if I sweep around, I might find some spare change!"]]
                    this.dialog()
                    this.interactCola = true
                }
                else if(this.interactCola && !this.obtainedQuarter){
                    this.message = [["I still need to find a quarter around here..."],["HOLD ON A MINUTE!","THEY ALSO GOT A SPONGEBOB POPSICLE IN THERE TOO!"]]
                    this.dialog()
                }
                else if(this.niko.inventory.includes("Refined Clear Stone")){
                    this.message = [["I cleaned the area but I couldnt find a spare quarter..."], ["*sobs*", "My Spongebob Popsicle..."]]
                    this.dialog()
                }
                else if(this.interactCola && this.obtainedQuarter){
                    this.message = [["Alrighty, lemme just pop this quarter in rq!", "..."], ["..."], ["its uh, not giving me the stone... It got stuck", "Are you serious!", "*Kicks machine*"], ["Oh hey it popped out!"]]
                    this.dialog()
                    this.niko.inventory.push("Refined Light Green Stone")
                    const index = this.niko.inventory.indexOf("Quarter")
                    this.niko.inventory.splice(index, 1)
                }
            },
            "mopAway": ()=>{
                if(!this.interactCola){
                    this.message = [["This place is hella dusty...", "I could mop this but..."], ["That ain't my job so... XD"]]
                    this.dialog()
                }
                else if(this.floorTile.x == 69 && this.floorTile.y == 46){
                    this.message = [["Poggers! There was a quarter here!"]]
                    this.dialog()
                    this.obtainedQuarter = true
                    this.niko.inventory.push("Quarter")
                    this.floorInteractLayer.removeTileAt(this.floorTile.x, this.floorTile.y, true, true, this.floorInteractLayer)
                }
                else{
                    this.floorInteractLayer.removeTileAt(this.floorTile.x, this.floorTile.y, true, true, this.floorInteractLayer)
                }
            },
            "bustedSafe": () =>{
                if(this.roomPower >=2){
                    this.message = [["There is some really shiny stone at the back of this safe.", "Lemme see if I can-", "*reaches into safe*"], ["*Bzzt Bzzt*", "- High_Power_Security_Gate_Active -"], ["A security gate? How do I lower the power here?"]]
                    this.dialog()
                }
                else if(!this.niko.inventory.includes("Refined Light Blue Stone") && this.roomPower < 2){
                    this.message = [["Oh neat, the security system here seems to be powered off!"], ["Prolly cuz of how much power these rooms have.", "But hey! Would ya look at that", "Another one of em shiny looking stones!"]]
                    this.dialog()
                    this.niko.inventory.push("Refined Light Blue Stone")
                }
                else{
                    this.message = [["I already got the stone from here...", "I wonder what is in the rest of the safes?"]]
                    this.dialog()
                }
            },
            "safe": ()=>{
                this.message = [["Its a big safe.", "Lemme try to open this..."], ["*HNGGGG HNGGGGGGG*"], ["Nope! It aint budging"]]
                this.dialog()
            },
            "miniTV": ()=>{
                if(!this.interactMiniTV){
                    this.message = [["Its a tiny TV!", "Lemme turn it on!"], ["*Bzzt* *Bzzt*"], ["Its... Its just repeating the same sequence of Sun and Moon over and over."]]
                    this.dialog()
                    this.interactMiniTV = true
                }
                else if(!this.niko.inventory.includes("Refined Orange Stone")){
                    if(this.paused){
                        return ;
                    }
                    else{
                        this.paused = true
                        const pos1 = () =>{
                            this.starTV = this.physics.add.image(this.niko.x-100, this.niko.y-100, 'star').setScale(0.3).setVisible(1)
                            this.moonTV = this.physics.add.image(this.niko.x, this.niko.y, 'moon').setScale(0.3).setVisible(0)
                            setTimeout(pos2, 1000)
                        }
                        const pos2 = () =>{
                            this.starTV.setX(this.niko.x+100)
                            setTimeout(pos3, 1000)
                        }
                        const pos3 = () =>{
                            this.starTV.setVisible(0)
                            this.moonTV.setX(this.niko.x + 200).setVisible(1)
                            this.moonTV.setY(this.niko.y)
                            setTimeout(pos4, 1000)
                        }
                        const pos4 = () =>{
                            this.moonTV.setX(this.niko.x - 200)
                            setTimeout(pos5, 1000)
                        }
                        const pos5 = () =>{
                            this.moonTV.setVisible(0)
                            this.starTV.setVisible(1)
                            this.starTV.setX(this.niko.x+100)
                            this.starTV.setY(this.niko.y + 100)
                            setTimeout(pos6, 1000)
                        }
                        const pos6 = () =>{
                            this.starTV.setX(this.niko.x - 100)
                            setTimeout(end, 1000)
                        }
                        const end = () =>{
                            this.paused = false
                            this.starTV.destroy()
                            this.moonTV.destroy()
                        }
                        pos1()
                    }
                }
                else{
                    this.message = [["I already got the Orange Refined Stone..."], ["Does this TV have Netflix?"]]
                    this.dialog()
                }
            },
            "star": ()=>{
                if(!this.interactStar){
                    this.message = [["It looks like an arcade machine with a star on the side.", "It only has one button though"]]
                    this.dialog()
                    this.interactStar = true
                }
                else{
                    this.message = [["Lemme just push this button.", "Neat, it seems to have add a star to some sequence"]]
                    this.dialog()
                    this.miniTVCombination.push(0)
                }
            },
            "moon": ()=>{
                if(!this.interactStar){
                    this.message = [["It looks like an arcade machine with a moon on the side.", "It only has one button though"]]
                    this.dialog()
                    this.interactStar = true
                }
                else{
                    this.message = [["Lemme just push this button.", "Neat, it seems to have add a moon to some sequence"]]
                    this.dialog()
                    this.miniTVCombination.push(1)
                }
            },
            "brokenTimeMachine": ()=>{
                const code = [0,0,1,1,0,0]
                if(!this.interactBrokenTimeMachine){
                    this.message = [["It looks like a busted version of the time machine I used to get here!"], ["Oh neat! There is a Refined Orange Stone inside...", "But its locked behind some combination"], ["There aren't even any inputs here on this machine.", "How do I even open it? All that is here is a confimation button."]]
                    this.dialog()
                    this.interactBrokenTimeMachine = true
                }
                else if(this.niko.inventory.includes("Refined Orange Stone")){
                    this.message = [["I already got the Refined Orange Stone", "Still I wonder..."], ["Who was it that used this time machine then?"]]
                    this.dialog()
                }
                else if(JSON.stringify(this.miniTVCombination) != JSON.stringify(code)){
                    this.message = [["It doesn't seem that whatever I did got the right combination..."], ["Lemme just hit the reset."]]
                    this.dialog()
                    this.miniTVCombination = []
                }
                else{
                    this.message = [["Nice! It seems that I got the combination correct!"], ["The busted time machine is open now!", "Lemme just take that refined Orange Stone rq"]]
                    this.dialog()
                    this.niko.inventory.push("Refined Orange Stone")
                }
            },
            "repositories": ()=>{
                this.message = [["Just a bunch of organized chemicals"]]
                this.dialog()
            },
            "fishTank": ()=>{
                this.message = [["FISHIES :)"], ["wait."], ["If no one else is here...", "WHO IS FEEDING THE FISHIES?! (⚆ᗝ⚆)"]]
                this.dialog()
            },
            "elementHint": ()=>{
                this.message = [["There is a note here on where to find all the refined stones!"], ["All it says is that the location of these refined stones", "correlate to the paintings under each raw component,", "and the room where the painting is."], ["Not particularly helpful but sure!"]]
                this.dialog()
            },
            "blueTable": ()=>{
                this.message = [["Its just a table full of lab components..."], ["I have no idea what these are for..."]]
                this.dialog()
            },
            "redTable": ()=>{
                this.message = [["Its a table full of lunchables..."], ["WAIT LUNCHABLES! (ﾉ◕ヮ◕)ﾉ*:・ﾟ✧"]]
                this.dialog()
            },
            "bigPurpleThing": ()=>{
                this.message = [["I at first thought this was some big cool structure..."], ["But on closer inspection, its made out of plastic..."]]
                this.dialog()
            },
            "hiddenHint": ()=>{
                this.message = [["There is another out of place book!", "But it seems to be in another cipher.", "Is it the same one as last time?"], ['It reads "[5] -> Ymj bfqq yt ymj wnlmy nx kfpj."']]
                this.dialog()
            },
            "rgbHint": ()=>{
                this.message = [["Its another cipher puzzle.", "You'd think that the future people would come up with better puzzles"], ['This tablet reads "[4] <- Pda knzan eo Naz, Cnaaj, Cnaaj, Naz, Xhqa.', 'Pdaj dep pda fqgaxkt pk ykjbeni."']]
                this.dialog()
                this.interactRGB = true
            },
            "jukebox": ()=>{
                const code = [1,2,2,1,3]
                if(!this.interactRGB){
                    this.message = [["Just a regular jukebox...", "I wonder why its here?"]]
                    this.dialog()
                }
                else if(this.interactRGB && this.RBGcombination.length == 0){
                    this.message = [["I probably need to interact with the totems to attempt a combination"]]
                    this.dialog()
                }
                else if(this.niko.inventory.includes("Refined Green Stone")){
                    this.message = [["I already got the Refined Green Stone", "Still I wonder..."], ["Why are there a bunch of primative things in the future?"]]
                    this.dialog()
                }
                else if(JSON.stringify(this.RBGcombination) != JSON.stringify(code)){
                    this.message = [["It doesn't seem that whatever I did got the right combination..."], ["Let me just try this again."]]
                    this.dialog()
                    this.RBGcombination = []
                }
                else{
                    this.message = [["Neato! I got the combination of totems correct!"], ["The jukebox just dispensed a Refined Green Stone!"]]
                    this.dialog()
                    this.niko.inventory.push("Refined Green Stone")
                }
            },
            "redTotem": ()=>{
                if(!this.interactRGB){
                    this.message = [["Its an ugly little totem with a red scarf.", "The red is not doing any favors for it."]]
                    this.dialog()
                }
                else{
                    this.message = [["There was a button on the nose.", "It looked at me wierd, imma punch it "]]
                    this.dialog()
                    this.RBGcombination.push(1)
                }
            },
            "greenTotem": ()=>{
                if(!this.interactRGB){
                    this.message = [["Its a cute little totem with a green scarf.", "Thats kinda cute."]]
                    this.dialog()
                }
                else{
                    this.message = [["There was a little button under the scarf.", "Let me hit it rq."]]
                    this.dialog()
                    this.RBGcombination.push(2)
                }
            },
            "blueTotem": ()=>{
                if(!this.interactRGB){
                    this.message = [["Its a little totem with a blue scarf.", "Just a totem."]]
                    this.dialog()
                }
                else{
                    this.message = [["There was a button hidden on the head.", "Imma smack it."]]
                    this.dialog()
                    this.RBGcombination.push(3)
                }
            },
            "greenBin": ()=>{
                if(this.binInHand == false){
                    this.niko.inventory.push("green rock")
                    this.binInHand = true
                    this.message = [["Oh what a nice green rock.. its pretty heavy"]]
                    this.dialog()
                }
                else{
                    this.message = [["Hmm... these are kinda heavy", "I can only hold one of these at a time"]]
                    this.dialog()
                }
            },
            "orangeBin": ()=>{
                if(this.binInHand == false){
                    this.niko.inventory.push("orange rock")
                    this.binInHand = true
                    this.message = [["Oh what a nice orange rock.. its pretty heavy"]]
                    this.dialog()
                }
                else{
                    this.message = [["Hmm... these are kinda heavy", "I can only hold one of these at a time"]]
                    this.dialog()
                }
            },
            "redBin": ()=>{
                if(this.binInHand == false){
                    this.niko.inventory.push("red rock")
                    this.binInHand = true
                    this.message = [["Oh what a nice red rock.. its pretty heavy"]]
                    this.dialog()
                }
                else{
                    this.message = [["Hmm... these are kinda heavy", "I can only hold one of these at a time"]]
                    this.dialog()
                }
            },
            "purpleBin": ()=>{
                if(this.binInHand == false){
                    this.niko.inventory.push("purple rock")
                    this.binInHand = true
                    this.message = [["Oh what a nice purple rock.. its pretty heavy"]]
                    this.dialog()
                }
                else{
                    this.message = [["Hmm... these are kinda heavy", "I can only hold one of these at a time"]]
                    this.dialog()
                }
            },
            "elemPlace":() =>{
                if(this.niko.inventory.includes("Refine purple stone")){
                    this.message = [["There's nothing else to do here"]]
                    this.dialog()
                }
                else if(this.binInHand == true){
                    if (this.niko.inventory.includes("green rock")){
                        if (this.floorTile.x == 8 && this.floorTile.y == 13){
                            if(this.leftElemPlace.length == 0) {
                                this.niko.inventory.splice(this.niko.inventory.indexOf("green rock"), 1)
                                this.leftElemPlace.push("green rock")
                                this.binInHand = false
                                this.message = [["Im gonna put this green rock here"]]
                                this.dialog()
                            } else {
                                this.message = [["There's already a " + this.leftElemPlace[0] + " here."]]
                                this.dialog()
                            }
                        }
                        else if (this.floorTile.x == 14 && this.floorTile.y == 13){
                            if(this.rightElemPlace.length == 0) {
                                this.niko.inventory.splice(this.niko.inventory.indexOf("green rock"), 1)
                                this.rightElemPlace.push("green rock")
                                this.binInHand = false
                                this.message = [["Im gonna put this green rock here"]]
                                this.dialog()
                            } else {
                                this.message = [["There's already a " + this.rightElemPlace[0] + " here."]]
                                this.dialog()
                            }
                        }
                    } 
                    else if (this.niko.inventory.includes("red rock")){
                        if (this.floorTile.x == 8 && this.floorTile.y == 13){
                            if(this.leftElemPlace.length == 0) {
                                this.niko.inventory.splice(this.niko.inventory.indexOf("red rock"), 1)
                                this.leftElemPlace.push("red rock")
                                this.binInHand = false
                                this.message = [["Im gonna put this red rock here"]]
                                this.dialog()
                            } else {
                                this.message = [["There's already a " + this.leftElemPlace[0] + " here."]]
                                this.dialog()
                            }
                        }
                        else if (this.floorTile.x == 14 && this.floorTile.y == 13){
                            if(this.rightElemPlace.length == 0) {
                                this.niko.inventory.splice(this.niko.inventory.indexOf("red rock"), 1)
                                this.rightElemPlace.push("red rock")
                                this.binInHand = false
                                this.message = [["Im gonna put this red rock here"]]
                                this.dialog()
                            } else {
                                this.message = [["There's already a " + this.rightElemPlace[0] + " here."]]
                                this.dialog()
                            }
                        }
                    } 
                    else if (this.niko.inventory.includes("orange rock")){
                        if (this.floorTile.x == 8 && this.floorTile.y == 13){
                            if(this.leftElemPlace.length == 0) {
                                this.niko.inventory.splice(this.niko.inventory.indexOf("orange rock"), 1)
                                this.leftElemPlace.push("orange rock")
                                this.binInHand = false
                                this.message = [["Im gonna put this orange rock here"]]
                                this.dialog()
                            } else {
                                this.message = [["There's already a " + this.leftElemPlace[0] + " here."]]
                                this.dialog()
                            }
                        }
                        else if (this.floorTile.x == 14 && this.floorTile.y == 13){
                            if(this.rightElemPlace.length == 0) {
                                this.niko.inventory.splice(this.niko.inventory.indexOf("orange rock"), 1)
                                this.rightElemPlace.push("orange rock")
                                this.binInHand = false
                                this.message = [["Im gonna put this orange rock here"]]
                                this.dialog()
                            } else {
                                this.message = [["There's already a " + this.rightElemPlace[0] + " here."]]
                                this.dialog()
                            }
                        }
                    } 
                    else if (this.niko.inventory.includes("purple rock")){
                        if (this.floorTile.x == 8 && this.floorTile.y == 13){
                            if(this.leftElemPlace.length == 0) {
                                this.niko.inventory.splice(this.niko.inventory.indexOf("purple rock"), 1)
                                this.leftElemPlace.push("purple rock")
                                this.binInHand = false
                                this.message = [["Im gonna put this purple rock here"]]
                                this.dialog()
                            } else {
                                this.message = [["There's already a " + this.leftElemPlace[0] + " here."]]
                                this.dialog()
                            }
                        }
                        else if (this.floorTile.x == 14 && this.floorTile.y == 13){
                            if(this.rightElemPlace.length == 0) {
                                this.niko.inventory.splice(this.niko.inventory.indexOf("purple rock"), 1)
                                this.rightElemPlace.push("purple rock")
                                this.binInHand = false
                                this.message = [["Im gonna put this purple rock here"]]
                                this.dialog()
                            } else {
                                this.message = [["There's already a " + this.rightElemPlace[0] + " here."]]
                                this.dialog()
                            }
                        }
                    }
                    else if (this.niko.inventory.includes("bright red rock")){
                        if (this.floorTile.x == 8 && this.floorTile.y == 13){
                            if(this.leftElemPlace.length == 0) {
                                this.niko.inventory.splice(this.niko.inventory.indexOf("bright red rock"), 1)
                                this.leftElemPlace.push("bright red rock")
                                this.binInHand = false
                                this.message = [["Im gonna put this bright red rock here"]]
                                this.dialog()
                            } else {
                                this.message = [["There's already a " + this.leftElemPlace[0] + " here."]]
                                this.dialog()
                            }
                        }
                        else if (this.floorTile.x == 14 && this.floorTile.y == 13){
                            if(this.rightElemPlace.length == 0) {
                                this.niko.inventory.splice(this.niko.inventory.indexOf("bright red rock"), 1)
                                this.rightElemPlace.push("bright red rock")
                                this.binInHand = false
                                this.message = [["Im gonna put this bright red rock here"]]
                                this.dialog()
                            } else {
                                this.message = [["There's already a " + this.rightElemPlace[0] + " here."]]
                                this.dialog()
                            }
                        }
                    }
                    else if (this.niko.inventory.includes("magenta rock")){
                        if (this.floorTile.x == 8 && this.floorTile.y == 13){
                            if(this.leftElemPlace.length == 0) {
                                this.niko.inventory.splice(this.niko.inventory.indexOf("magenta rock"), 1)
                                this.leftElemPlace.push("magenta rock")
                                this.binInHand = false
                                this.message = [["Im gonna put this magenta rock here"]]
                                this.dialog()
                            } else {
                                this.message = [["There's already a " + this.leftElemPlace[0] + " here."]]
                                this.dialog()
                            }
                        }
                        else if (this.floorTile.x == 14 && this.floorTile.y == 13){
                            if(this.rightElemPlace.length == 0) {
                                this.niko.inventory.splice(this.niko.inventory.indexOf("magenta rock"), 1)
                                this.rightElemPlace.push("magenta rock")
                                this.binInHand = false
                                this.message = [["Im gonna put this magenta rock here"]]
                                this.dialog()
                            } else {
                                this.message = [["There's already a " + this.rightElemPlace[0] + " here."]]
                                this.dialog()
                            }
                        }
                    }
                    else if (this.niko.inventory.includes("fire rock")){
                        if (this.floorTile.x == 8 && this.floorTile.y == 13){
                            if(this.leftElemPlace.length == 0) {
                                this.niko.inventory.splice(this.niko.inventory.indexOf("fire rock"), 1)
                                this.leftElemPlace.push("fire rock")
                                this.binInHand = false
                                this.message = [["Im gonna put this fire rock here"]]
                                this.dialog()
                            } else {
                                this.message = [["There's already a " + this.leftElemPlace[0] + " here."]]
                                this.dialog()
                            }
                        }
                        else if (this.floorTile.x == 14 && this.floorTile.y == 13){
                            if(this.rightElemPlace.length == 0) {
                                this.niko.inventory.splice(this.niko.inventory.indexOf("fire rock"), 1)
                                this.rightElemPlace.push("fire rock")
                                this.binInHand = false
                                this.message = [["Im gonna put this fire rock here"]]
                                this.dialog()
                            } else {
                                this.message = [["There's already a " + this.rightElemPlace[0] + " here."]]
                                this.dialog()
                            }
                        }
                    }
                    else if (this.niko.inventory.includes("refined rock")){
                        if (this.floorTile.x == 8 && this.floorTile.y == 13){
                            if(this.leftElemPlace.length == 0) {
                                this.niko.inventory.splice(this.niko.inventory.indexOf("refined rock"), 1)
                                this.leftElemPlace.push("refined rock")
                                this.binInHand = false
                                this.message = [["Im gonna put this refined rock here"]]
                                this.dialog()
                            } else {
                                this.message = [["There's already a " + this.leftElemPlace[0] + " here."]]
                                this.dialog()
                            }
                        }
                        else if (this.floorTile.x == 14 && this.floorTile.y == 13){
                            if(this.rightElemPlace.length == 0) {
                                this.niko.inventory.splice(this.niko.inventory.indexOf("refined rock"), 1)
                                this.rightElemPlace.push("refined rock")
                                this.binInHand = false
                                this.message = [["Im gonna put this refined rock here"]]
                                this.dialog()
                            } else {
                                this.message = [["There's already a " + this.rightElemPlace[0] + " here."]]
                                this.dialog()
                            }
                        }
                    }
                }
                else{
                    this.message = [["I dont think I have anything to put here...", "In this rock shaped hole"]]
                    this.dialog()
                }
            },
            "shrine":() =>{
                //when making a bright red rock
                if(this.niko.inventory.includes("Refined purple stone")){
                    this.message = [["Nothing else for me to combine here"]]
                    this.dialog()
                }
                else if (this.leftElemPlace.includes("red rock") && this.rightElemPlace.includes("red rock")){
                    if(this.binInHand == true){
                        this.message = [["I should probably get all other rocks out of my inventory"]]
                        this.dialog()
                    }
                    else{
                        this.leftElemPlace = this.leftElemPlace.filter(rock => rock !== "red rock")
                        this.rightElemPlace = this.rightElemPlace.filter(rock => rock !== "red rock")
                        this.niko.inventory.push("bright red rock")
                        this.binInHand = true
                        this.message = [["Woah looks like combining two red rocks gets me a bright red rock"]]
                        this.dialog()
                    }
                } 
                else if ((this.leftElemPlace.includes("bright red rock") && this.rightElemPlace.includes("purple rock")) || (this.leftElemPlace.includes("purple rock") && this.rightElemPlace.includes("bright red rock"))) {
                    if(this.binInHand == true){
                        this.message = [["I should probably get all other rocks out of my inventory"]]
                        this.dialog()
                    }
                    else{
                        if (this.leftElemPlace.includes("bright red rock")){
                            this.leftElemPlace = this.leftElemPlace.filter(rock => rock !== "bright red rock")
                            this.rightElemPlace = this.rightElemPlace.filter(rock => rock !== "purple rock")
                        }
                        else{
                            this.leftElemPlace = this.leftElemPlace.filter(rock => rock !== "purple rock")
                            this.rightElemPlace = this.rightElemPlace.filter(rock => rock !== "bright red rock") 
                        }
                        this.niko.inventory.push("magenta rock")
                        this.binInHand = true
                        this.message = [["Combining the bright red rock with a purple rock gave me a magenta rock"]]
                        this.dialog()
                    }
                } 
                else if ((this.leftElemPlace.includes("magenta rock") && this.rightElemPlace.includes("orange rock")) || (this.leftElemPlace.includes("orange rock") && this.rightElemPlace.includes("magenta rock"))) {
                    if(this.binInHand == true){
                        this.message = [["I should probably get all other rocks out of my inventory"]]
                        this.dialog()
                    }
                    else{
                        if (this.leftElemPlace.includes("magenta rock")){
                            this.leftElemPlace = this.leftElemPlace.filter(rock => rock !== "magenta rock")
                            this.rightElemPlace = this.rightElemPlace.filter(rock => rock !== "orange rock")
                        }
                        else{
                            this.leftElemPlace = this.leftElemPlace.filter(rock => rock !== "orange rock")
                            this.rightElemPlace = this.rightElemPlace.filter(rock => rock !== "magenta rock")
                        }                   
                        this.niko.inventory.push("fire rock")
                        this.binInHand = true
                        this.message = [["Combining the magenta rock with an orange rock gave me a fire rock"]]
                        this.dialog()
                    }
                } 
                else if ((this.leftElemPlace.includes("fire rock") && this.rightElemPlace.includes("green rock")) || (this.leftElemPlace.includes("green rock") && this.rightElemPlace.includes("fire rock"))) {
                    if(this.binInHand == true){
                        this.message = [["I should probably get all other rocks out of my inventory"]]
                        this.dialog()
                    }
                    else{
                        if (this.leftElemPlace.includes("fire rock")){
                            this.leftElemPlace = this.leftElemPlace.filter(rock => rock !== "fire rock")
                            this.rightElemPlace = this.rightElemPlace.filter(rock => rock !== "green rock")
                        }
                        else{
                            this.leftElemPlace = this.leftElemPlace.filter(rock => rock !== "green rock")
                            this.rightElemPlace = this.rightElemPlace.filter(rock => rock !== "fire rock") 
                        }
                        this.niko.inventory.push("refined rock")
                        this.binInHand = true
                        this.message = [["Combining the fire rock with a green rock gave me a refined rock"]]
                        this.dialog()
                    }
                } 
                else if ((this.leftElemPlace.includes("refined rock") && this.rightElemPlace.includes("purple rock")) || (this.leftElemPlace.includes("purple rock") && this.rightElemPlace.includes("refined rock"))) {
                    if(this.binInHand == true){
                        this.message = [["I should probably get all other rocks out of my inventory"]]
                        this.dialog()
                    }
                    else{
                        if (this.leftElemPlace.includes("refined rock")){
                            this.leftElemPlace = this.leftElemPlace.filter(rock => rock !== "refined rock")
                            this.rightElemPlace = this.rightElemPlace.filter(rock => rock !== "purple rock")
                        }
                        else{
                            this.leftElemPlace = this.leftElemPlace.filter(rock => rock !== "purple rock")
                            this.rightElemPlace = this.rightElemPlace.filter(rock => rock !== "refined rock") 
                        }
                        this.niko.inventory.push("Refined Purple Stone")
                        this.message = [["Combining the refined rock with a purple rock gave me a refined purple rock"]]
                        this.dialog()
                    }
                } 
                else if(this.leftElemPlace.length == 0 || this.rightElemPlace.length == 0){
                    this.message = [["Nothing happened... looks like I need to have a rock on each side"]]
                    this.dialog()
                }
                else {
                    this.leftElemPlace.splice(0, this.leftElemPlace.length)
                    this.rightElemPlace.splice(0, this.rightElemPlace.length)
                    this.message = [["Nothing happened... I just got a black rock", "I might as well throw this away since it can't do anything"]]
                    this.dialog()
                }    
            },
            "shrineCabinet":() =>{
                this.message = [["I wonder what this button does", "*BOOP*"], ["This shrine is used to combine rocks and upgrade their quality and refine them", "You can combine any two rocks but only certain combinations", "will actually provide useful items"], ["To gain the Purple Refined Stone you must combine different rocks in the", "shrine above"], ["First you must make a bright red rock", "Next you must use that to make a magenta rock", "Then use that to make a fire rock", "Then a refined rock and then finally a Refined Purple Stone"]]
                this.dialog()
            },
            "tempBin":() =>{
                if (this.binInHand == true) {
                    if (this.niko.inventory.includes("red rock")) {
                        const index = this.niko.inventory.indexOf("red rock")
                        this.niko.inventory.splice(index, 1)
                        this.binInHand = false
                        this.message = [["Lets throw away that rock"]]
                        this.dialog()
                    } 
                    else if (this.niko.inventory.includes("green rock")) {
                        const index = this.niko.inventory.indexOf("green rock")
                        this.niko.inventory.splice(index, 1)
                        this.binInHand = false
                        this.message = [["Lets throw away that rock"]]
                        this.dialog()                       
                    } 
                    else if (this.niko.inventory.includes("orange rock")) {
                        const index = this.niko.inventory.indexOf("orange rock")
                        this.niko.inventory.splice(index, 1)
                        this.binInHand = false
                        this.message = [["Lets throw away that rock"]]
                        this.dialog()
                    } 
                    else if (this.niko.inventory.includes("purple rock")) {
                        const index = this.niko.inventory.indexOf("purple rock")
                        this.niko.inventory.splice(index, 1)
                        this.binInHand = false
                        this.message = [["Lets throw away that rock"]]
                        this.dialog()
                    } 
                    else if (this.niko.inventory.includes("bright red rock")) {
                        const index = this.niko.inventory.indexOf("bright red rock")
                        this.niko.inventory.splice(index, 1)
                        this.binInHand = false
                        this.message = [["Lets throw away that rock"]]
                        this.dialog()
                    } 
                    else if (this.niko.inventory.includes("magenta rock")) {
                        const index = this.niko.inventory.indexOf("magenta rock")
                        this.niko.inventory.splice(index, 1)
                        this.binInHand = false
                        this.message = [["Lets throw away that rock"]]
                        this.dialog()
                    } 
                    else if (this.niko.inventory.includes("fire rock")) {
                        const index = this.niko.inventory.indexOf("fire rock")
                        this.niko.inventory.splice(index, 1)
                        this.binInHand = false
                        this.message = [["Lets throw away that rock"]]
                        this.dialog()
                    } 
                    else if (this.niko.inventory.includes("refined rock")) {
                        const index = this.niko.inventory.indexOf("refined rock")
                        this.niko.inventory.splice(index, 1)
                        this.binInHand = false
                        this.message = [["Lets throw away that rock"]]
                        this.dialog()
                    }
                }
                else{
                    this.message = [["I dont have any rocks to throw away"]]
                    this.dialog()
                }
            },
            "pipes":() =>{
                if(this.freezersChecked == false){
                    this.message = [["Looks like these pipes are connected to the freezer..."]]
                    this.dialog()
                }
                else{
                    if(this.pipesBroken == true){
                        this.message = [["Too bad I had to break these...", "I better hurry up and get out of here before someone sees what I did"]]
                        this.dialog()
                    }
                    else{
                        this.pipesBroken = true
                        this.message = [["Maybe if I break these the freezer will unlock...", "Im just gonna hit this with my mop until it breaks!"],["*BANG* *BANG *BANG*"],["Oh... is that an off switch..."], ["Well its too late for that now"]]
                        this.dialog()
                    }
                }
            },
            "marketFreezers":() =>{
                if(this.freezersChecked == false){
                    this.message = [["Oh it looks like theres a stone here!","Of course the door is locked..."],["Maybe if I just cut the power to this somehow..."]]
                    this.dialog()
                    this.freezersChecked = true
                }
                else{
                    if (this.pipesBroken == true && !this.niko.inventory.includes("Frozen Stone") && !this.niko.inventory.includes("Refined Blue Stone")){
                        this.niko.inventory.push("Frozen Stone")
                        this.message = [["Well this stone looks like its been freeze dried", "I dont know if it'll work"],["I should probably find a way to rehydrate this"]]
                        this.dialog()
                    }
                    else if(this.pipesBroken == false){
                        this.message = [["I need to figure out how to open this..."]]
                        this.dialog()
                    }
                    else{
                        this.message = [["Well looks like all of this is going to go bad..."]]
                        this.dialog()
                    }
                }
            },
            "bath":() =>{
                if(this.niko.inventory.includes("Frozen Stone")){
                    this.niko.inventory.push("Refined Blue Stone")
                    this.niko.inventory.splice(this.niko.inventory.indexOf("Frozen Stone"), 1)
                    this.message = [["Maybe I'll just soak the frozen stone in here for a bit..."],["It looks like its working!", "Guess thats another stone down"]]
                    this.dialog()
                }
                else if(this.niko.inventory.includes("Refined Blue Stone")){
                    this.message = [["Im kinda thirsty..."],["Ehh this just tastes like rocks"]]
                    this.dialog()
                }
                else{
                    this.message = [["The water here looks warm"]]
                    this.dialog()
                }
            },
            "hintMachine":() =>{
                if(!this.hintBookInteracted){
                    this.message = [["There is a wierd machine here!", "It has a label on it saying 'hint machine'", "There are instructions attached that says to interact when stuck"], ["Huh, I guess the hint machine got an upgrade"], ["[Gameplay Notice: You can use hints as many times as you want.", "However, sometimes the notes won't change.", "And using a hint, will cost you more of your overall score"]]
                    this.dialog()
                    this.hintBookInteracted = true
                }
                else if(!this.niko.inventory.includes("Refined Light Blue Stone")){
                    this.hints += 1
                    this.message = [["Hmm Im not really sure where to find the next stone...", "Lets see what the machine has to say", "*BOOP*"],["*Machine Whirring*","'The Refined Light Blue Stone: ","It can be found in one of the vaults","You must make sure the power is at the right level inorder to get it","To edit the power level you should interact with the computer or fireplace"], ['hints used:'+this.hints]]
                    this.dialog()    
                }
                else if(!this.niko.inventory.includes("Refined Red Stone")){
                    this.hints += 1
                    this.message = [["Hmm Im not really sure where to find the next stone...", "Lets see what the machine has to say", "*BOOP*"],["*Machine Whirring*","'The Refined Red Stone: ","Remember that a refined stone can be found where the corresponding", "painting is found"],["Next to the Dolphin Painting is a list of steps", "that will tell you how to turn a red powder into a Refined", "Red Stone"],["The fireplace can help you increase the power to what it needs to be"] ['hints used:'+this.hints]]
                    this.dialog()    
                }
                else if(!this.niko.inventory.includes("Refined Light Green Stone")){
                    this.hints += 1
                    this.message = [["Hmm Im not really sure where to find the next stone...", "Lets see what the machine has to say", "*BOOP*"],["*Machine Whirring*","'The Refined Light Green Stone: ","Remember that a refined stone can be found where the corresponding", "painting is found"],["Next to the painting are vending machines...", "There is a Refined Light Green Stone in them", "There should also be a quarter around the area to help you","get it out"], ['hints used:'+this.hints]]
                    this.dialog()    
                }
                else if(!this.niko.inventory.includes("Refined Blue Stone")){
                    this.hints += 1
                    this.message = [["Hmm Im not really sure where to find the next stone...", "Lets see what the machine has to say", "*BOOP*"],["*Machine Whirring*","'The Refined Blue Stone: ","Remember that a refined stone can be found where the corresponding", "painting is found"],["Next to the Houses Painting is a freezer", "There are a few things around the freezer that can help you get and","fix up the stone"], ['hints used:'+this.hints]]
                    this.dialog()    
                }
                else if(!this.niko.inventory.includes("Refined Orange Stone")){
                    this.hints += 1
                    this.message = [["Hmm Im not really sure where to find the next stone...", "Lets see what the machine has to say", "*BOOP*"],["*Machine Whirring*","'The Refined Orange Stone: ","Remember that a refined stone can be found where the corresponding", "painting is found"],["Next to the Desert Painting is a broken time machine", "To get the stone inside of it you must interact with the", "star and moon machines in the right number and order", "and then you should be able to retrieve the stone"], ['hints used:'+this.hints]]
                    this.dialog()    
                }
                else if(!this.niko.inventory.includes("Refined Green Stone")){
                    this.hints += 1
                    this.message = [["Hmm Im not really sure where to find the next stone...", "Lets see what the machine has to say", "*BOOP*"],["*Machine Whirring*","'The Refined Green Stone: ","Remember that a refined stone can be found where the corresponding", "painting is found"],["The White Pillar Painting is in a room with no entrances... seemingly", "To figure out how to enter the room there is an encoded message","in a nearby bookshelf"],["Once you are in the room there is another encoded message","This will tell you the order in which you should interact","with the statues to get a stone out of the jukebox"], ['hints used:'+this.hints]]
                    this.dialog()    
                }
                else if(!this.niko.inventory.includes("Refined Purple Stone")){
                    this.hints += 1
                    this.message = [["Hmm Im not really sure where to find the next stone...", "Lets see what the machine has to say", "*BOOP*"],["*Machine Whirring*","'The Refined Blue Stone: ","Remember that a refined stone can be found where the corresponding", "painting is found"],["Next to the Moon Painting is a set of altars", "There is an instruction guide outside of the room on how to make the stone"],["The recipes for creating the necesarry stones are :","red rock + red rock = bright red rock", "bright red rock + purple rock = magenta rock", "magenta rock + orange rock = fire rock"], ["fire rock + green rock = refined rock"], ['hints used:'+this.hints]]
                    this.dialog()    
                }
                else{
                    this.message = [["The time machine should be ready to activate"]]
                    this.dialog()
                }
            },
            "timeMachine":() =>{
                if (this.niko.inventory.includes("Refined Light Blue Stone") && this.niko.inventory.includes("Refined Blue Stone") && this.niko.inventory.includes("Refined Light Green Stone") && this.niko.inventory.includes("Refined Green Stone") && this.niko.inventory.includes("Refined Purple Stone") && this.niko.inventory.includes("Refined Orange Stone")&&this.niko.inventory.includes("Refined Red Stone")){
                    this.scene.stop("level3")
                    this.scene.start('completed3', {time: this.endTime, hints: this.hints})
                }
                else{
                    this.message = [["To reactivate time machine please put in the 7 refined stones :", "Light Blue, Red, Light Green, Blue, Orange, Green and Purple"]]
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
        this.load.image('moon', '/static/Assets/Map Sprites/moon.png')
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

        this.interactCola = false
        this.obtainedQuarter = false

        this.interactMiniTV = false
        this.miniTVCombination = []
        this.interactStar = false
        this.interactMoon = false
        this.interactBrokenTimeMachine = false

        this.interactRGB = false
        this.RBGcombination = []

        this.binInHand = false
        this.leftElemPlace = []
        this.rightElemPlace = []
        this.hintBookInteracted = false
        this.freezersChecked = false
        this.pipesBroken = false
        this.hints = 0
    }

    update(time, dTime){
       super.update()
    }
}

