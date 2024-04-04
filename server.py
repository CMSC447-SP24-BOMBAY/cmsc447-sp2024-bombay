from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from http import HTTPStatus
import sqlite3

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
PORT = 8080

@app.route("/")
@cross_origin()
def root():
    return jsonify({"response":"Hello World!"}), HTTPStatus.OK.value

@app.route("/api/users/login", methods=["POST"])
@cross_origin()
def login():
    if request.method == "POST":
        body = request.get_json()
        conn = sqlite3.connect("game.db")
        cur = conn.cursor()
        cur.execute("SELECT player.level_id, keybinds.up, keybinds.down, keybinds.left, keybinds.right, keybinds.interact, keybinds.backpack, keybinds.menu FROM player LEFT JOIN keybinds ON player.id = keybinds.player_id WHERE player.id = ?", [body["username"]])
        
        res = {}
        if (cur.fetchall()):
            pass

@app.route("/api/settings/<id>", methods=["GET", "POST"])
@cross_origin()
def settings(id):
    if request.method == "GET":
        pass
    elif request.method == "POST":
        pass

app.run(port=PORT)