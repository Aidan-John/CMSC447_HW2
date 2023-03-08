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
    newUser["name_first"] = request.args.get('name_first', None)
    newUser["name_last"] = request.args.get('name_last', None)
    newUser["user_id"] = request.args.get('user_id', None)
    newUser["points"] = request.args.get('points', None)
    return(jsonify(database.addUser(newUser)))


@app.route('/api/points', methods=['POST'])
def api_getPoints():
    fName = request.args.get('first', None)
    lName = request.args.get('last', None)
    return(jsonify(database.getPoints(fName,lName)))


if __name__ == "__main__":
    app.run(debug=True)