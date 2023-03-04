from flask import Flask, jsonify, request

from apiRouter import *

app = Flask(__name__)


@app.route("/")
def index():
    return 'Index Page'

@app.route('/api/users')
def api_userList():
    return(jsonify(database.getAllUsers()))

@app.route('/api/users/<user_id>')
def api_searchUser(user_id):
    return(jsonify(database.search(user_id)))

@app.route('/api/users/delete/<user_id>', methods=['POST'])
def api_deleteUser(user_id):
    return(jsonify(database.delete(user_id)))

@app.route('/api/points', methods=['POST'])
def api_getPoints():
    fName = request.args.get('first', None)
    lName = request.args.get('last', None)
    return(jsonify(database.getPoints(fName,lName)))


if __name__ == "__main__":
    app.run(debug=True)