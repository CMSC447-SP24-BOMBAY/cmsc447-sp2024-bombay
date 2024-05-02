export default class settings extends Phaser.Scene{
    constructor(){
        super('settings')
    }

    preload(){
        this.load.image("quit", '/static/Assets/Menu Assets/Transparent/Quit_Transparent.png')
    }
    create(){
        var keybinds = []
        var backpackKey
        var interactKey
        var upKey
        var downKey
        var leftKey
        var rightKey
        var self = this
        var newKey
        var inUse

        //Get the current keybinds for the player
        const url = '/api/settings/' + this.registry.get('username')
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(result => {
            //The arrow keys are wierd as there are no ascii codes for arrow keys, but do take up 37-40
            keybinds.push(String.fromCharCode(result['backpack']))
            keybinds.push(String.fromCharCode(result['interact']))
            keybinds.push(String.fromCharCode(result['up']))
            keybinds.push(String.fromCharCode(result['down']))
            keybinds.push(String.fromCharCode(result['left']))
            keybinds.push(String.fromCharCode(result['right']))
            keybinds.push(String.fromCharCode(result['menu']))
        })
        .catch(error => {console.error('Error:', error)})

        const wait = () =>{
            //Wait to get all keys
            if (keybinds.length != 7){
                setTimeout(wait, 2)
            }
            else{
                //Change the visual representation so it shows arrow keys
                for(var i in keybinds){
                    if(keybinds[i] == '%'){
                        keybinds[i] = "Left Arrow"
                    }
                    else if(keybinds[i] == '&'){
                        keybinds[i] = "Up Arrow"
                    }
                    else if(keybinds[i] == "'"){
                        keybinds[i] = "Right Arrow"
                    }
                    else if(keybinds[i] == '('){
                        keybinds[i] = "Down Arrow"
                    }
                }

                this.r = this.add.rectangle(250, 200, 700, 500, 0x301934)
                this.r.setStrokeStyle(4,0xefc53f)

                //Displays each function and the current key assigned to it.
                let backpackText = this.add.text(0, 50, "Backpack: ", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(2)
                backpackKey = this.add.text(175, 50, "" + keybinds[0], { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(2)
                let interactText = this.add.text(0, 100, "Interact: ", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(2)
                interactKey = this.add.text(175, 100, "" + keybinds[1], { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(2)
                let upText = this.add.text(0, 150, "Up: ", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(2)
                upKey = this.add.text(175, 150, "" + keybinds[2], { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(2)
                let downText = this.add.text(0, 200, "Down: ", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(2)
                downKey = this.add.text(175, 200, "" + keybinds[3], { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(2)
                let leftText = this.add.text(0, 250, "Left: ", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(2)
                leftKey = this.add.text(175, 250, "" + keybinds[4], { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(2)
                let rightText = this.add.text(0, 300, "Right: ", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(2)    
                rightKey = this.add.text(175, 300, "" + keybinds[5], { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(2)
                let quit = this.add.image(this.game.renderer.width/5.8 ,this.game.renderer.height/1.5, "quit").setScale(0.35,0.35)

                //Set Backpack key
                backpackKey.setInteractive()
                backpackKey.on('pointerdown', function (pointer){
                    self.input.keyboard.once('keydown', function(input){
                        newKey = input.key.toUpperCase()
                        this.checkInput(keybinds, 'backpack', backpackKey, newKey)
                    }, self)
                    return
                })

                //Set interact key
                interactKey.setInteractive()
                interactKey.on('pointerdown', function (pointer){
                    self.input.keyboard.once('keydown', function(input){
                        newKey = input.key.toUpperCase()
                        this.checkInput(keybinds, 'interact', interactKey, newKey)
                    }, self)
                    return
                })

                //Set up key
                upKey.setInteractive()
                upKey.on('pointerdown', function (pointer){
                    self.input.keyboard.once('keydown', function(input){
                        console.log(input.code)
                        newKey = input.key.toUpperCase()
                        this.checkInput(keybinds, 'up', upKey, newKey)
                    }, self)
                    return
                })

                //Set down key
                downKey.setInteractive()
                downKey.on('pointerdown', function (pointer){
                    self.input.keyboard.once('keydown', function(input){
                        newKey = input.key.toUpperCase()
                        this.checkInput(keybinds, 'down', downKey, newKey)
                    }, self)
                    return
                })

                //Set left key
                leftKey.setInteractive()
                leftKey.on('pointerdown', function (pointer){
                    self.input.keyboard.once('keydown', function(input){
                        newKey = input.key.toUpperCase()
                        this.checkInput(keybinds, 'left', leftKey, newKey)
                    }, self)
                    return
                })

                //Set right key
                rightKey.setInteractive()
                rightKey.on('pointerdown', function (pointer){
                    self.input.keyboard.once('keydown', function(input){
                        newKey = input.key.toUpperCase()
                        this.checkInput(keybinds, 'right', rightKey, newKey)
                    }, self)
                    return
                })

                //Quit Button Events
                quit.setInteractive();
                quit.on("pointerover", ()=>{
                    hoverSp.setVisible(true)
                    hoverSp.play("idle")
                    hoverSp.x = 330
                    hoverSp.y = quit.y
                })
                quit.on("pointerout", ()=>{
                    hoverSp.setVisible(false)
                })
                quit.on("pointerup", ()=>{
                    this.scene.start('mainMenu')
                    this.game.sound.stopAll();
                    this.scene.stop('levelSelect')
                })
            }
        }
        wait()
    }

    checkInput(keybinds, functionality, functionKey, newKey){
        var inUse

        for (var key in keybinds){
            if (keybinds[key] == newKey){
                inUse = true
            }
            console.log(keybinds[key], newKey)
        }
        //Not a keybind for any other function
        if (!inUse){
            functionKey.text = newKey
            this.setNewKey(functionality, newKey)
            console.log(newKey)
        }

        return
    }

    setNewKey(functionality, assignment){
        //Update keybind for the user
        const url = '/api/settings/' + this.registry.get('username') + '/' + functionality + '/' + assignment.charCodeAt(0)
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {response.json()})
        .catch(error => {console.error('Error:', error)})
    }
}