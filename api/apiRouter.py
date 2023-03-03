from flask_restful import Resource, abort
import sqlite3

################# CONSTANTS #################

givenData = [
    {"name_first": "Steve", "name_last": "Smith", "user_id": 211, "points": 80},
    {"name_first": "Jian", "name_last": "Wong", "user_id": 122, "points": 92},
    {"name_first": "Chris", "name_last": "Peterson", "user_id": 213, "points": 91},
    {"name_first": "Sai", "name_last": "Patel", "user_id": 524, "points": 94},
    {"name_first": "Andrew", "name_last": "Whitehead", "user_id": 425, "points": 99},
    {"name_first": "Lynn", "name_last": "Roberts", "user_id": 626, "points": 90},
    {"name_first": "Robert", "name_last": "Sanders", "user_id": 287, "points": 75},
]

################# HELPER FXNS #################

def db_connect():
    ret = sqlite3.connect("users.db")
    return ret

def init_db_table():
    try:
        db = db_connect()
        db.execute("DROP TABLE users")
        db.execute("CREATE TABLE users (user_id INTEGER PRIMARY KEY NOT NULL, name_first TEXT NOT NULL, name_last TEXT NOT NULL, points INTEGER NOT NULL);")
        db.commit()
        print("table initialized")
    except:
        print("something went wrong with table init")
    finally:
        db.close()

def db_addUser(user):
    try:
        db = db_connect()
        curr = db.cursor()
        curr.execute("INSERT INTO users (user_id, name_first, name_last, points) VALUES (?,?,?,?)", (user['user_id'],user['name_first'],user['name_last'],user['points']))
        db.commit()
        print("User Added: ", user)
    except:
        print("something went wrong adding ", user)
    finally:
        db.close()

def getAllUsers():
    users = []
    try:
        db = db_connect()
        db.row_factory = sqlite3.Row
        curr = db.cursor()
        curr.execute("SELECT * FROM users")
        rows = curr.fetchall()

        for user in rows:
            userCopy = {}
            userCopy['name_first'] = user['name_first']
            userCopy['name_last'] = user['name_last']
            userCopy['points'] = user['points']
            userCopy['user_id'] = user['user_id']
            users.append(userCopy)
    except:
        users = []
    finally:
        return users



def abort_on_invalid_user(user):
    print("abort")

class userAction(Resource):
    def create(self, user):
        print("create")
    def search(self, user):
        print("create")
    def delete(self, user):
        print("create")

################# SETUP #################
    
init_db_table()

for user in givenData:
    db_addUser(user)
