from flask import Flask # pipenv install flask
from flask_sqlalchemy import SQLAlchemy # pipenv install flask-alchemy psycopg2-binary
from flask_marshmallow import Marshmallow # pipenv install flask-marshmallow marshmallow-sqlalchemy
from flask_bcrypt import Bcrypt

# create .env file
app = Flask(__name__) #starts flask app
# get basic home route working. returning hello world.

# connecting up the db. createdb first in terminal
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://localhost:5432/planets'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # speeds things up a bit.

# connecting alchemy and marshmallow to out app. Like a bug hug.
db = SQLAlchemy(app)
ma = Marshmallow(app)
bcrypt = Bcrypt(app)

# pylint: disable=C0413, W0611
from config import routes
