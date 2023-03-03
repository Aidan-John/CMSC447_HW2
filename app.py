from flask import Flask
from flask_restful import Api, reqparse, Resource, abort
from api.apiRouter import userAction, abort_on_invalid_user

app = Flask(__name__)
api = Api(app)

@app.route("/")
def index():
    return 'Index Page'

api.add_resource(userAction, "/")

if __name__ == "__main__":
    app.run(debug=True)