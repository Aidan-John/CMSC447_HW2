from flask import Flask, jsonify, request
from flask_cors import CORS
from apiRouter import *

app = Flask(__name__)
CORS(app)

@app.route('/api/users')
def api_userList():
    return(jsonify(database.getAllUsers()))

@app.route('/api/users/<user_id>')
def api_searchUser(user_id):
    return(jsonify(database.search(user_id)))

@app.route('/api/users/delete/<user_id>')
def api_deleteUser(user_id):
    return(jsonify(database.delete(user_id)))

@app.route('/api/users/add', methods=['POST'])
def api_createUser():
    newUser = {}
    data = request.get_json(silent=True)

    newUser["name_first"] = data.get('name_first')
    newUser["name_last"] = data.get('name_last')
    newUser["user_id"] = data.get('user_id')
    newUser["points"] = data.get('points')

    
    return(jsonify(database.addUser(newUser)))


@app.route('/api/points', methods=['POST'])
def api_getPoints():
    data = request.get_json(silent=True)
    fName = data.get('first')
    lName = data.get('last')
    return(jsonify(database.getPoints(fName,lName)))


if __name__ == "__main__":
    app.run(debug=True)