import sqlite3
#import random
from flask import Flask, session, render_template, request, g
app = Flask(__name__, static_folder='static', template_folder='templates')
app.secret_key = "dreaming_City"

@app.route("/", methods=['GET','POST'])
def home():
    return render_template('base.html')

@app.teardown_appcontext
def close_conn(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

if __name__ == '__main__':
    app.run()