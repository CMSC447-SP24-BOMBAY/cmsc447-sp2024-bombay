from flask import Flask, jsonify, request, render_template, g
from flask_cors import CORS, cross_origin
from http import HTTPStatus
import sqlite3

LEADERBOARD_TOP = 5

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

# test endpoint
@app.route("/api/test", methods=["GET"])
@cross_origin()
def test():
    return jsonify({"test":"Hello World!"}), HTTPStatus.OK.value

# login endpoint
@app.route("/api/login", methods=["POST"])
@cross_origin()
def login():
    try:
        # insert user and add default keybinds to db
        if request.method == "POST":
            conn = sqlite3.connect("game.db")
            cur = conn.cursor()

            # execute db
            cur.execute("""
                        INSERT INTO player (name)
                        VALUES (?)
                        """, [request.form.get("username")])
            conn.commit()
            # validate query result
            if cur.rowcount == 0:
                cur.close()
                conn.close()
                raise Exception("Player already exists")
            
            cur.close()
            cur = conn.cursor()

            # execute db
            cur.execute("""
                        INSERT INTO keybinds (player_name)
                        VALUES (?)
                        """, [request.form.get("username")])
            conn.commit()
            # validate query result
            if cur.rowcount == 0:
                cur.close()
                conn.close()
                raise Exception("Player already exists")

            cur.close()
            conn.close()
            return ("", HTTPStatus.NO_CONTENT.value)
    except sqlite3.Error as e:
        return jsonify({'error':str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR.value
    except Exception as e:
        return jsonify({'error':str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR.value
    
# player endpoint
@app.route("/api/player/<name>", methods=["GET"])
@cross_origin()
def player(name):
    try:
        # check if player exists
        if request.method == "GET":
            conn = sqlite3.connect("game.db")
            cur = conn.cursor()

            # execute query
            res = cur.execute("""
                              SELECT player.name, player.level_id, player.level1_time, player.level2_time, player.level3_time
                              FROM player
                              WHERE player.name = ?
                              """, [name])
            res = res.fetchone()
            print(res)
            # validate query result:
            if res:
                # format player name response
                response = {}
                for col, row in zip([column[0] for column in cur.description], res):
                    response[col] = row

                cur.close()
                conn.close()
                return jsonify(response), HTTPStatus.OK.value
            else:
                # no player found
                cur.close()
                conn.close()
                return ("", HTTPStatus.NO_CONTENT.value)
            
    except sqlite3.Error as e:
        return jsonify({'error':str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR.value
    except Exception as e:
        return jsonify({'error':str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR.value


# settings endpoint
@app.route("/api/settings/<name>", methods=["GET", "PUT"])
@cross_origin()
def settings(name):
    try:
        # get current keybinds for player
        if request.method == "GET":
            conn = sqlite3.connect("game.db")
            cur = conn.cursor()

            # execute query
            res = cur.execute("""
                              SELECT keybinds.up, keybinds.down, keybinds.left, keybinds.right, keybinds.interact, keybinds.backpack, keybinds.menu
                              FROM keybinds
                              WHERE keybinds.player_name = ?
                              """, [name])
            res = res.fetchone()
            # validate query result
            if res:
                # format keybinds response
                response = {}
                for col, row in zip([column[0] for column in cur.description], res):
                    response[col] = row
            # error executing query
            else:
                cur.close()
                conn.close()
                raise Exception("Name does not exist")

            cur.close()
            conn.close()
            return jsonify(response), HTTPStatus.OK.value
        # update keybinds
        elif request.method == "PUT":
            conn = sqlite3.connect("game.db")
            cur = conn.cursor()

            # execute query
            cur.execute("""
                        UPDATE keybinds
                        SET
                            up = ?,
                            down= ?,
                            left = ?,
                            right = ?,
                            interact = ?,
                            backpack = ?,
                            menu = ?
                        WHERE keybinds.player_name = ?
                        """, [request.form.get("up"), request.form.get("down"), request.form.get("left"), request.form.get("right"), request.form.get("interact"), request.form.get("backpack"), request.form.get("menu"), name])
            conn.commit()
            # error executing query
            if cur.rowcount == 0:
                cur.close()
                conn.close()
                raise Exception("Error updating keybinds")

            cur.close()
            conn.close()
            return jsonify({str(HTTPStatus.OK.value):"Keybinds updated"})
    except sqlite3.Error as e:
        return jsonify({'error':str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR.value
    except Exception as e:
        return jsonify({'error':str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR.value
    
# leaderboard settings
@app.route("/api/leaderboard", methods=["GET"])
@cross_origin()
def leaderboard():
    try:
        # get top 5 players in leaderboard
        if request.method == "GET":
            conn = sqlite3.connect("game.db")
            cur = conn.cursor()

            # execute query
            res = cur.execute("""
                              SELECT player.name, leaderboard.player_score
                              FROM leaderboard
                              LEFT JOIN player
                              ON leaderboard.player_name = player.name
                              ORDER BY leaderboard.player_score DESC LIMIT ?
                              """, [LEADERBOARD_TOP])
            res = res.fetchall()
            # validate query result
            if res:
                # format leaderboard response
                response = {}
                for row, n in zip(res, range(LEADERBOARD_TOP)):
                    response[n + 1] = f"{row[0]}: {row[1]}"
            # error executing query
            else:
                cur.close()
                conn.close()
                raise Exception("Empty leaderboard")

            cur.close()
            conn.close()
            return jsonify(response), HTTPStatus.OK.value
    except sqlite3.Error as e:
        return jsonify({'error':str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR.value
    except Exception as e:
        return jsonify({'error':str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR.value

if __name__ == "__main__":
    app.run()