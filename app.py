from flask import Flask, jsonify, request, render_template, g
from flask_cors import CORS, cross_origin
from http import HTTPStatus
import sqlite3

app = Flask(__name__, static_folder='static', template_folder='templates')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/", methods=['GET','POST'])
def home():
    return render_template('base.html')

@app.teardown_appcontext
def close_conn(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route("/api/test", methods=["GET"])
@cross_origin()
def test():
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

if __name__ == "__main__":
    app.run()