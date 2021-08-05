from flask import Flask
from flask_cors import CORS

import bcrypt
from backend.models.users import Users
from backend.views.users_view import UserView
from backend.views.items_view import ItemView
from sqlalchemy.engine import URL
from backend.db import db
import os
from flask_jwt import JWT

app = Flask(__name__)
CORS(app)
config_file_name = os.environ['CONFIG']
app.config.from_json(config_file_name)

db.init_app(app)


def authentication(username, password):
    user = db.session.query(Users).filter(Users.username == username).one()
    if bcrypt.checkpw(password.encode(), user.password.encode()):
        return user


def identity(identity):
    user = db.session.query(Users).filter(Users.id == identity['identity']).one()
    return user


JWT(app, authentication, identity)


def register_api(view, endpoint, url, pk='id', pk_type='int'):
    view_func = view.as_view(endpoint)
    app.add_url_rule(url, defaults={pk: None},
                     view_func=view_func, methods=['GET',])
    app.add_url_rule(url, view_func=view_func, methods=['POST',])
    app.add_url_rule(f'{url}/<{pk_type}:{pk}>', view_func=view_func,
                     methods=['GET', 'PUT', 'DELETE'])


register_api(ItemView, 'items', '/api/items', 'item_id')
register_api(UserView, 'users', '/api/users', 'user_id')
