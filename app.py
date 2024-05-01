from flask import Flask, jsonify, request, render_template, g
from flask_cors import CORS, cross_origin
from http import HTTPStatus
import sqlite3

LEADERBOARD_TOP = 5

app = Flask(__name__, static_folder='static', template_folder='templates')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.json.sort_keys = False

@app.route("/", methods=['GET','POST'])
def home():
    return render_template('base.html')

@app.route("/templates/login_form.html", methods=['GET'])
def login_form():
    return render_template('login_form.html')

@app.route("/templates/leaderboard.html", methods=['GET'])
def leaderboard_html():
    return render_template('leaderboard.html')


@app.teardown_appcontext
def close_conn(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()
        
# login endpoint
@app.route("/api/login", methods=["POST"])
@cross_origin()
def login():
    try:
        # insert user and add default keybinds to db
        if request.method == "POST":
            data = request.get_json()
            conn = sqlite3.connect("game.db")
            cur = conn.cursor()
            cur.execute("""SELECT * FROM player WHERE player.name = ?""", [data["username"]])
            rows = cur.fetchall()
            if rows:
                # Code to execute if rows are returned
                # ...
                cur.close()
                conn.close()
                raise Exception("Player already exists")
            # execute db
            cur.execute("""
                        INSERT INTO player (name)
                        VALUES (?)
                        """, [data["username"]])
            conn.commit()
            
            cur.close()
            conn.close()
            conn = sqlite3.connect("game.db")
            cur = conn.cursor()

            # execute db
            cur.execute("""
                        INSERT INTO keybinds (player_name)
                        VALUES (?)
                        """, [data["username"]])
            conn.commit()
            # validate query result
            if cur.rowcount == 0:
                cur.close()
                conn.close()
                raise Exception("Player already exists")

            cur.close()
            conn.close()
            # set all level times to -1
            conn = sqlite3.connect("game.db")
            cur = conn.cursor()
            cur.execute("""
                        UPDATE player
                        SET level1_time = -1,
                            level2_time = -1,
                            level3_time = -1
                        WHERE player.name = ?
                        """, [data["username"]])
            conn.commit()
            cur.close()
            conn.close()
            conn = sqlite3.connect("game.db")
            cur = conn.cursor()
            # execute query
            res = cur.execute("""
                              SELECT player.name, player.level_id, player.level1_time, player.level2_time, player.level3_time
                              FROM player
                              WHERE player.name = ?
                              """, [data["username"]])
            res = res.fetchone()
            # format player name response
            response = {}
            for col, row in zip([column[0] for column in cur.description], res):
                response[col] = row

            cur.close()
            conn.close()
            return jsonify(response), HTTPStatus.OK.value

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


@app.route("/api/settings/<name>/<keybind>/<int:newbind>", methods=["PUT"])
@cross_origin()
def settings_update(name, keybind, newbind):
    try:
        if request.method == "PUT":
            conn = sqlite3.connect("game.db")
            cur = conn.cursor()

            # execute query
            cur.execute(f"""
                        UPDATE keybinds
                        SET
                            {keybind} = ?
                        WHERE keybinds.player_name = ?
                        """, [newbind, name])
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
            data = request.get_json()
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
                        """, [data["up"], data["down"], data["left"], data["right"], data["interact"], data["backpack"], data["menu"], name])
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
                              ORDER BY leaderboard.player_score ASC LIMIT ?
                              """, [LEADERBOARD_TOP])
            res = res.fetchall()
            # validate query result
            if res:
                # format leaderboard response
                response = []
                for rank, (username, score) in enumerate(res, start=1):
                    response.append({'rank': rank, 'user': username, 'score': score})
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

@app.route("/api/time/<name>/<int:level>", methods=["GET"])
@cross_origin()
def time_get(name, level):
    try:
        # get time for player at level
        if request.method == "GET":
            conn = sqlite3.connect("game.db")
            cur = conn.cursor()

            # execute query
            res = cur.execute(f"""
                              SELECT player.level{level}_time
                              FROM player
                              WHERE player.name = ?
                              """, [name])
            res = res.fetchone()
            # validate query result
            if res:
                # format time response
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
    except sqlite3.Error as e:
        return jsonify({'error':str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR.value
    except Exception as e:
        return jsonify({'error':str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR.value
@app.route("/api/time/<name>/<int:level>/<int:time>", methods=["POST"])
@cross_origin()
def time_post(name, level, time):
    try:
        if request.method == "POST":
            conn = sqlite3.connect("game.db")
            cur = conn.cursor()

            # execute query
            cur.execute("""
                        UPDATE player
                        SET
                            level_id = ?,
                            level1_time = CASE
                                WHEN ? = 1 THEN ?
                                ELSE level1_time
                            END,
                            level2_time = CASE
                                WHEN ? = 2 THEN ?
                                ELSE level2_time
                            END,
                            level3_time = CASE
                                WHEN ? = 3 THEN ?
                                ELSE level3_time
                            END
                        WHERE player.name = ?
                        """, [level, level, time, level, time, level, time, name])
            conn.commit()
            # error executing query
            if cur.rowcount == 0:
                cur.close()
                conn.close()
                raise Exception("Error updating time")
            cur.close()
            conn.close()
            if(level == 3):
                score = time_get(name, 1) + time_get(name, 2) + time_get(name, 3)
                leaderboard_post(name, score)
            return jsonify({str(HTTPStatus.OK.value):"Time updated"})
    except sqlite3.Error as e:
        return jsonify({'error':str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR.value
    except Exception as e:
        return jsonify({'error':str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR.value


@app.route("/api/leaderboard/<name>/<score>", methods=["POST"])
@cross_origin()
def leaderboard_post(name, score):
    try:
        # post player score to leaderboard
        if request.method == "POST":
            conn = sqlite3.connect("game.db")
            cur = conn.cursor()

            # execute query
            cur.execute("""
                        INSERT INTO leaderboard (player_name, player_score)
                        VALUES (?, ?)
                        """, [name, score])
            conn.commit()
            # error executing query
            if cur.rowcount == 0:
                cur.close()
                conn.close()
                raise Exception("Error updating leaderboard")

            cur.close()
            conn.close()
            return jsonify({str(HTTPStatus.OK.value):"Leaderboard updated"})
    except sqlite3.Error as e:
        return jsonify({'error':str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR.value
    except Exception as e:
        return jsonify({'error':str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR.value
    
@app.route("/api/bombay_leaderboard", methods=["GET"])
@cross_origin()
def bombay_leaderboard():
    try:
        if request.method == "GET":
            conn = sqlite3.connect("game.db")
            cur = conn.cursor()

            res = cur.execute(""" SELECT leaderboard.player_name, leaderboard.player_score
                            FROM leaderboard
                            ORDER BY leaderboard.player_score DESC LIMIT ? 
                        """, [LEADERBOARD_TOP])
            response = {"Group":"Bombay", "Title":f"Top {LEADERBOARD_TOP} Scores"}
            for rank, (name, score) in enumerate(res):
                response[name] = score

            cur.close()
            conn.close()

            print(jsonify({'data':response}))

            return jsonify({'data':[response]}), HTTPStatus.OK.value
    except sqlite3.Error as e:
        return jsonify({'error':str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR.value
    except Exception as e:
        return jsonify({'error':str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR.value

if __name__ == "__main__":
    app.run()