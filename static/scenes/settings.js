export default class settings extends Phaser.Scene{
    constructor(){
        super('settings')
    }

    create(){
        var keybinds = []
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
        console.log(keybinds)

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

        console.log(keybinds)

        this.r = this.add.rectangle(250, 200, 700, 500, 0x301934)
        this.r.setStrokeStyle(4,0xefc53f)

        //Displays each function and the current key assigned to it.
        let backpackText = this.add.text(0, 100, "Backpack: ", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(2)
        let backpackKey = this.add.text(175, 100, "" + keybinds[0], { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(2)
        let interactText = this.add.text(0, 150, "Interact: ", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(2)
        let interactKey = this.add.text(175, 150, "" + keybinds[1], { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(2)
        let upText = this.add.text(0, 200, "Up: ", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(2)
        let upKey = this.add.text(175, 200, "" + keybinds[2], { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(2)
        let downText = this.add.text(0, 250, "Down: ", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(2)
        let downKey = this.add.text(175, 250, "" + keybinds[3], { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(2)
        let leftText = this.add.text(0, 300, "Left: ", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(2)
        let leftKey = this.add.text(175, 300, "" + keybinds[4], { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(2)
        let rightText = this.add.text(0, 350, "Right: ", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(2)    
        let rightKey = this.add.text(175, 350, "" + keybinds[5], { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(2)
    }
}