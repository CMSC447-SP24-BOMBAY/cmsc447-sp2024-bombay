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
        var self = this;
        loginForm.on('click', function (event)
        {
            const inputUsername = this.getChildByName('username');
            
            if (event.target.name === 'createUserButton')
            {

                //  Have they entered anything?
                if (inputUsername.value === '')
                {
                    const loginError = document.getElementById("login_error");
                    loginError.style.display = "block";
                    loginError.textContent = 'Enter a valid username'; // Display the error message
                } else{
                    const userData = {
                        username: inputUsername.value
                    };
    
                    // Send HTTP POST request
                    fetch('/api/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userData)
                    })
                    .then(response => response.json())
                    .then(data => {
                        // Handle response data
                        if (data.error && data.error === "Player already exists") {
                            // Assuming "login_error" is the ID for the element where you want to show the error message
                            const loginError = document.getElementById("login_error");
                            loginError.style.display = "block";
                            loginError.style.backgroundColor = "red";
                            loginError.textContent = 'User already exists'; // Display the error message
                        } else {
                            // Handle successful response
                            const loginError = document.getElementById("login_error");
                            loginError.style.display = "block";
                            loginError.style.backgroundColor = "green";
                            loginError.textContent = 'User succesfully created'; // Display the error message
                            console.log(data);
                        }
                    })
                    .catch(error => {
                        // Handle error
                        
                        console.error(error);
                    });
                }
            } else if(event.target.name === 'loginButton') {
                if (inputUsername.value === '')
                {
                    const loginError = document.getElementById("login_error");
                    loginError.style.display = "block";
                    loginError.textContent = 'Enter a valid username'; // Display the error message
                } else{
                    const url = '/api/player/' + inputUsername.value;
                    fetch(url, {
                        method: 'get',
                    })
                    .then(response => {
                        if(response.status === 204){
                            // If the response is 204, directly handle the "user does not exist" scenario
                            console.log("User does not exist");
                            const loginError = document.getElementById("login_error");
                            loginError.style.display = "block";
                            loginError.style.backgroundColor = "red";
                            loginError.textContent = 'User does not exist'; // Display the error message
                            return null; // Return null or a similar marker to indicate no further processing needed
                        } else {
                            // For other responses, proceed to parse the response as JSON
                            self.registry.set('username', inputUsername.value);
                            return response.json();
                        }
                    })
                    .then(data => {
                        console.log(data);
                    })
                    .catch(error => {
                        console.error(error);
                    })
                }
                if (self.registry.get('username') !== undefined){
                    self.scene.start('mainMenu');
                    self.scene.stop('login');
                }
            }
        });
    }
}