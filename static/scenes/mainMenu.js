export default class mainMenu extends Phaser.Scene{
    constructor(){
        super('mainMenu')
    }
    
    preload(){
        //loads html elements
        this.load.html("leaderboard", '/templates/leaderboard.html')

        //Loads images + Other Assets
        this.load.image("background", "/static/Assets/Menu Assets/Transparent/water.png")
        
        this.load.image("title", '/static/Assets/Menu Assets/Transparent/Title_Transparent.png')

        this.load.image("play", '/static/Assets/Menu Assets/Transparent/Play_Transparent.png')

        this.load.image("quit", '/static/Assets/Menu Assets/Transparent/Quit_Transparent.png')

        this.load.image("leaderboard", '/static/Assets/Menu Assets/Transparent/leaderboard_Transparent.png')

        this.load.image("settings", '/static/Assets/Menu Assets/Transparent/settings_transparent.png')

        this.load.atlas('Main Niko', '/static/Assets/Character_Sprites/Blue Niko/idle_spritesheet.png', '/static/Assets/Character_Sprites/Blue Niko/idle_spritesheet.json')

        this.load.audio("CaveStory01_music", "/static/Assets/Menu Assets/music/CaveStory-01.mp3")

        //Creates the Loading Bar
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        })

        this.load.on("progress", (percent)=>{
            loadingBar.fillRect(0, this.game.renderer.height/2, this.game.renderer.width * percent, 50);
            console.log(percent);
        })

        this.load.on("complete", ()=>{
            console.log("Completeed Load")
        })
        console.log(this.registry.get('username'))
    }

    create(){
        //Creates all the images
        this.add.image(this.game.renderer.width/1.25 ,this.game.renderer.height/1.5 , "background").setScale(0.75,0.75)
        this.add.image(this.game.renderer.width/2 ,this.game.renderer.height/6, "title").setScale(0.60,0.60)
        let playButton = this.add.image(this.game.renderer.width/4 ,this.game.renderer.height/3, "play").setScale(0.60,0.60)
        let leadButton = this.add.image(this.game.renderer.width/4 ,this.game.renderer.height/1.7, "leaderboard").setScale(0.30,0.30)
        let quit = this.add.image(this.game.renderer.width/5.8 ,this.game.renderer.height/1.4, "quit").setScale(0.35,0.35)
        let settings = this.add.image(this.game.renderer.width/4, this.game.renderer.height/2.1, "settings").setScale(0.47, 0.47)

        //Music - From Cave Story (Im a nerd)
        this.sound.play("CaveStory01_music", {
            loop: true
        })

        //Settings for our Hover Sprite
        let hoverSp = this.add.sprite(0, 0, "Main Niko")
        hoverSp.setVisible(false)

        this.anims.create({
            key: "idle",
            frameRate: 6,
            repeat: -1,
            frames: this.anims.generateFrameNames("Main Niko", {start: 1, end: 3, prefix: "Blue_Niko (", suffix: ").png"})
        })

        //Sets Animations for Hovering and onClick events
        //  PlayButton Events
        playButton.setInteractive();
        playButton.on("pointerover", ()=>{
            hoverSp.setVisible(true)
            hoverSp.play("idle")
            hoverSp.x = 25
            hoverSp.y = playButton.y
        })
        playButton.on("pointerout", ()=>{
            hoverSp.setVisible(false)
        })
        playButton.on("pointerup", ()=>{
            this.scene.start('levelSelect')
            this.game.sound.stopAll();
            this.scene.stop('mainMenu')
        })

        //  Leaderboard Button Events
        leadButton.setInteractive();
        leadButton.on("pointerover", ()=>{
            hoverSp.setVisible(true)
            hoverSp.play("idle")
            hoverSp.x = 25
            hoverSp.y = leadButton.y
        })
        leadButton.on("pointerout", ()=>{
            hoverSp.setVisible(false)
        })
        leadButton.on("pointerup", ()=>{
            this.onLeaderboardPressed()
        })

        //  Quit Button Events
        quit.setInteractive()
        quit.on("pointerover", ()=>{
            hoverSp.setVisible(true)
            hoverSp.play("idle")
            hoverSp.x = 25
            hoverSp.y = quit.y
        })
        quit.on("pointerout", ()=>{
            hoverSp.setVisible(false)
        })
        quit.on("pointerup", ()=>{
            window.location.reload();
        })

        //Settings Button Events
        settings.setInteractive()
        settings.on("pointerover", ()=>{
            hoverSp.setVisible(true)
            hoverSp.play("idle")
            hoverSp.x = 25
            hoverSp.y = settings.y
        })
        settings.on("pointerout", ()=>{
            hoverSp.setVisible(false)
        })
        settings.on("pointerup", ()=>{
            console.log("Settings Clicked")
            this.scene.start('settings')
            this.game.sound.stopAll();
            this.scene.stop('mainMenu')
        })
    }

    onLeaderboardPressed(){
        let leaderboard = this.add.dom(this.game.renderer.width/2, this.game.renderer.height/2).createFromCache("leaderboard")
        fetch('/api/leaderboard', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(typeof data);
            const leaderboardTable = document.createElement('table');
            leaderboardTable.className = 'table table-striped';

            //create table header
            const lhead = document.createElement('thead');
            const lheadRow = document.createElement('tr');
            const rankCol = document.createElement('th');
            const userCol = document.createElement('th');
            const scoreCol = document.createElement('th');
            rankCol.textContent = 'Rank';
            lheadRow.appendChild(rankCol);
            userCol.textContent = 'User';
            lheadRow.appendChild(userCol);
            scoreCol.textContent = 'Score';
            lheadRow.appendChild(scoreCol);
            lhead.appendChild(lheadRow);
            leaderboardTable.appendChild(lhead);

            //create table body
            const lbody = document.createElement('tbody');
            if(data.error === 'Empty leaderboard'){
                console.log("NO LEADERBOARD LOL")
                const lbodyRow = document.createElement('tr');
                const noLeaderboard = document.createElement('td');
                noLeaderboard.colSpan = 3;
                noLeaderboard.textContent = 'No leaderboard yet';
                lbodyRow.appendChild(noLeaderboard);
                lbody.appendChild(lbodyRow);
                leaderboardTable.appendChild(lbody);

            }else{
                data.forEach((entry) => {
                    const lbodyRow = document.createElement('tr');
                    const rank = document.createElement('td');
                    const user = document.createElement('td');
                    const score = document.createElement('td');
                
                    // Set the text content of each cell to the corresponding property of the entry
                    rank.textContent = entry.rank;
                    user.textContent = entry.user;
                    score.textContent = entry.score;
                
                    // Append each cell to the row
                    lbodyRow.appendChild(rank);
                    lbodyRow.appendChild(user);
                    lbodyRow.appendChild(score);
                
                    // Append the row to the table body
                    lbody.appendChild(lbodyRow);
                    leaderboardTable.appendChild(lbody);
                });                
            }
            const leaderboardDiv = document.getElementById('leaderboardContainer');
            leaderboardDiv.appendChild(leaderboardTable);

        })
        leaderboard.addListener('click');
        var self = this;
        leaderboard.on('click', function (event)
        {
            if (event.target.name === 'close-button')
            {
                console.log("close button clicked")
                leaderboard.destroy();
            }
        })
    }
}