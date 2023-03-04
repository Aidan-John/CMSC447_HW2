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

class DB:
    def __init__(self):
        try:
            db = db_connect()
            db.execute("DROP TABLE users")
            db.execute("CREATE TABLE users (user_id INTEGER PRIMARY KEY NOT NULL, name_first TEXT NOT NULL, name_last TEXT NOT NULL, points INTEGER NOT NULL);")
            db.commit()
            print("Table initialized.")
        except:
            print("Something went wrong with table init.")
        finally:
            db.close()
    
    def addUser(self, user):
        retString = f"User Added {user}"
        try:
            db = db_connect()
            curr = db.cursor()
            curr.execute("INSERT INTO users (user_id, name_first, name_last, points) VALUES (?,?,?,?)", (user['user_id'],user['name_first'],user['name_last'],user['points']))
            db.commit()
            
        except:
            retString = f"something went wrong adding {user}"
        finally:
            db.close()
            return retString
    
    def getAllUsers(self):
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
            db.close()
            return users
    
    def search(self, user_id):
        returnUser = {}
        try:
            db = db_connect()
            db.row_factory = sqlite3.Row
            curr = db.cursor()
            curr.execute(f"SELECT * FROM users WHERE user_id='{user_id}'")
            user = curr.fetchone()   
            returnUser['name_first'] = user['name_first']
            returnUser['name_last'] = user['name_last']
            returnUser['points'] = user['points']
            returnUser['user_id'] = user['user_id']
        except:
            returnUser = {}
        finally:
            db.close()
            return returnUser
        
    def delete(self, user_id):
        retString = f"user #{user_id} has been deleted."
        try:
            db = db_connect()
            curr = db.cursor()
            curr.execute(f"DELETE FROM users WHERE user_id='{user_id}'")
            db.commit()
            
        except:
            retString = f"Something went wrong deleting user #{user_id}"
        finally:
            db.close()
            return retString
        

    def getPoints(self, first, last):
        points = -1
        try:
            db = db_connect()
            db.row_factory = sqlite3.Row
            curr = db.cursor()
            curr.execute(f"SELECT points FROM users WHERE name_first='{first}' AND name_last='{last}'")
            user = curr.fetchone()
            points = int(user['points'])
            
        except:
            points = -1
        finally:
            db.close()
            return points



################# SETUP #################
    
database = DB()

for user in givenData:
    database.addUser(user)


################# TESTING #################

if __name__ == "__main__":
    def prettyPrint(list):
        for user in list:
            print(user)

    prettyPrint(database.getAllUsers())

    newUser = {"name_first": "John", "name_last": "Doe", "user_id": 99, "points": 100}

    print(database.addUser(newUser))

    prettyPrint(database.getAllUsers())

    print(database.search(newUser['user_id']))

    print(database.getPoints("John", "Doe"))

    print(database.delete(99))

    prettyPrint(database.getAllUsers())

