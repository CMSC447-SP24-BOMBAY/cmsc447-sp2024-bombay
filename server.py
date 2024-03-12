from flask import Flask, jsonify
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

app.run(port=PORT)