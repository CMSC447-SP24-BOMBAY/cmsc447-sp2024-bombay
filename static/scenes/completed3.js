export default class completed3 extends Phaser.Scene{
    constructor(){
        super('completed3')
    }
    
    preload(){
        this.load.image('winScreen', '/static/Assets/Character Sprites/nikoWinScreen.png')
    }

    init (data){
        this.timer = data.time
        this.hints = data.hints
    }

    create(){
        const final = this.timer + this.hints * 10
        const url = '/api/time/' + this.registry.get('username') + '/3/' + final
        fetch(url, {method: 'POST'})
        let totaltime = final
        fetch('/api/time/' + this.registry.get('username') + '/1', {method: 'GET'})
        .then((response) => {
            return response.json()
        })
        .then((data1) => {
            totaltime += data1.time
            fetch('/api/time/' + this.registry.get('username') + '/2', {method: 'GET'})
            .then((response) => {
                return response.json()
            })
            .then((data2) => {
                totaltime += data2.time
                fetch('/api/leaderboard/' + this.registry.get('username') + '/' + totaltime, {method: 'POST'})
            })
        })
        this.screen = this.physics.add.image(0, 0, 'winScreen').setScale(0.5)
        this.congrats = this.add.text(0, 100, ["Congratulations!", "Level 3 Completed"], { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(3)
        this.endTime = this.add.text(0, 300, "Time Taken:"+this.timer, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(3)
        this.score = this.add.text(0, 400, "Final Score:"+final, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(3)
        this.toContinue = this.add.text(0, 500, "Click any button to Continue!", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setScale(3)
        //Perform whatever database update needed here!

        const end = () =>{
            this.screen.destroy()
            this.congrats.destroy()
            this.score.destroy()
            this.endTime.destroy()
            this.toContinue.destroy()
            document.removeEventListener("keydown", end)
            this.scene.start("levelSelect")
            this.scene.stop("level3")
            this.scene.stop("completed3")
        }

        document.addEventListener("keydown", end)
    }
}