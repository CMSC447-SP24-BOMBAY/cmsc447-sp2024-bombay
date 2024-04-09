import sqlite3

conn = sqlite3.connect("game.db")
cur = conn.cursor()

table_scripts = [
    """
    CREATE TABLE IF NOT EXISTS player (
        name        TEXT    PRIMARY KEY,
        level_id    INTEGER DEFAULT 1,
        level1_time TEXT    DEFAULT NULL,
        level2_time TEXT    DEFAULT NULL,
        level3_time TEXT    DEFAULT NULL
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS leaderboard (
        player_name     TEXT,
        player_score    INTEGER     DEFAULT 0,

        FOREIGN KEY(player_name) REFERENCES player(name)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS keybinds (
        player_name TEXT,
        up          INTEGER     DEFAULT 38,
        down        INTEGER     DEFAULT 40,
        left        INTEGER     DEFAULT 37,
        right       INTEGER     DEFAULT 39,
        interact    INTEGER     DEFAULT 69,
        backpack    INTEGER     DEFAULT 66,
        menu        INTEGER     DEFAULT 27,

        FOREIGN KEY(player_name) REFERENCES player(name)
    );
    """
]

for script in table_scripts:
    try:
        cur.executescript(script)
    except sqlite3.Error as err:
        print(f"Error running script: {str(err)}")

cur.close()
conn.close()