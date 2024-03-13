# CMSC447 Bombay Group Project
## Run the following commands to setup your development environment

### Create a virtual environment to contain and isolate any library installations.

`python -m venv venv`

### Run the virtual environment. Make sure to execute any commands while the virtual environment is active. This can be verified if there is a `(venv)` at the beginning of the shell prompt.

The command for Windows and MacOS differ slightly:

Windows: `venv\Scripts\activate`

MacOS: `source venv/bin/activate`

If you are getting an error from trying to activate your virtual environment for Windows, try the following steps:

Run Powershell as administrator and enter the following command:

`Set-ExecutionPolicy Unrestricted -Scope Process`

Close Powershell and restart your terminal.

### Install the required packages.

`pip install -r requirements.txt`

### Setup project database

`python init_db.py`

### Whenever finished developing or running the program, stop the virtual environment.

Windows: `deactivate`

MacOS: `deactivate` or `source deactivate`

## Running the game

### Start the server. Open another terminal for this.

`python server.py`

You can stop running the server with `Ctrl + C`
