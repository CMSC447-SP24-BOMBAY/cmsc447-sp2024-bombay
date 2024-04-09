export default class login extends Phaser.Scene{
    constructor(){
        super('login')
    }
    
    preload(){
        this.load.html("login_form", '/templates/login_form.html')
    }

    create(){
        let loginForm = this.add.dom(this.game.renderer.width/2, this.game.renderer.height/2).createFromCache("login_form")
        loginForm.addListener('click');
        loginForm.on('click', function (event)
        {

            if (event.target.name === 'createUserButton')
            {
                const inputUsername = this.getChildByName('username');

                //  Have they entered anything?
                if (inputUsername.value !== '') {
                    const userData = {
                        username: inputUsername.value
                    };

                    // Send HTTP POST request
                    fetch('/api/users/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userData)
                    })
                    .then(response => response.json())
                    .then(data => {
                        // Handle response data
                        console.log(data);
                    })
                    .catch(error => {
                        // Handle error
                        console.error(error);
                    });
                }
            }

        });
    }
}