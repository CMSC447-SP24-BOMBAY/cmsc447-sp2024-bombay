import sqlite3

conn = sqlite3.connect("game.db")
cur = conn.cursor()

table_scripts = [
    """
    CREATE TABLE IF NOT EXISTS level (
        id          INTEGER PRIMARY KEY,
        texturemap  BLOB
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS player (
        id          INTEGER PRIMARY KEY,
        player_name TEXT,
        level_id    INTEGER,
        level1_time TEXT,
        level2_time TEXT,
        level3_time TEXT,

        FOREIGN KEY(level_id) REFERENCES level(id)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS leaderboard (
        player_id   INTEGER,
        player_score INTEGER,

        FOREIGN KEY(player_id) REFERENCES player(id)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS keybinds (
        player_id INTEGER,
        up          TEXT,
        down        TEXT,
        left        TEXT,
        right       TEXT,
        interact    TEXT,
        backpack    TEXT,
        menu        TEXT,

        FOREIGN KEY(player_id) REFERENCES player(id)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS dialogue (
        id          INTEGER PRIMARY KEY,
        level_id    INTEGER,
        dialogue_text TEXT,

        FOREIGN KEY(level_id) REFERENCES level(id)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS level_object (
        id          INTEGER PRIMARY KEY,
        level_id    INTEGER,
        x_pos       INTEGER,
        y_pos       INTEGER,
        sprite_key  INTEGER,
        interaction_id  INTEGER,
        has_collision   INTEGER,

        FOREIGN KEY(level_id) REFERENCES level(id)
    );
    """
]

for script in table_scripts:
    try:
        cur.executescript(script)
    except sqlite3.Error as err:
        print(f"Error running script: {str(err)}")