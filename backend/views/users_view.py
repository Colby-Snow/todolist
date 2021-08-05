import json

from flask import request, jsonify
from flask.views import MethodView
from marshmallow import ValidationError

from backend.db import db
from backend.models.users import Users
from backend.validations.user_schema import UserSchema
import bcrypt


class UserView(MethodView):

    def get(self, user_id):
        if user_id is None:
            user = db.session.query(Users)
            resp = [i.to_json() for i in user]
            return jsonify(resp)
        else:
            schema = UserSchema(only=['username'])
            this_user = db.session.query(Users)\
                .filter(Users.id == user_id)\
                .first()
            user_json = schema.dump(this_user)
            items_json = [item.to_json() for item in this_user.items]
            return jsonify(dict(user=user_json, items=items_json))

    def post(self):
        user_schema = UserSchema()
        try:
            new_data = user_schema.load(request.json)
            new_user = Users(username=new_data['username'], password=new_data['password'])
            new_user.password = bcrypt.hashpw(new_user.password.encode(), bcrypt.gensalt()).decode()
            db.session.add(new_user)
            db.session.commit()
        except ValidationError as e:
            return jsonify(e.messages), 400
        return jsonify({'success': True})

    def delete(self, user_id):
        if user_id is None:
            return jsonify({'error': 'No user id provided.'})
        else:
            db.session.query(Users).filter(Users.deleted == False, Users.id == user_id).update({'deleted': True})
            db.session.commit()
            not_deleted_users = db.session.query(Users).filter(Users.deleted == False)
            resp = [i.to_json() for i in not_deleted_users]
            return jsonify(resp)

    def put(self, user_id):
        if user_id is None:
            pass
        else:
            try:
                user_schema = UserSchema()
                new_data = user_schema.load(request.json)
                db.session.query(Users)\
                    .filter(Users.deleted == False, Users.id == user_id)\
                    .update({'password': new_data['password']})
                db.session.commit()
                not_deleted_users = db.session.query(Users).filter(Users.deleted == False)
                resp = [i.to_json() for i in not_deleted_users]
                return jsonify(resp)
            except ValidationError as e:
                return jsonify(e.messages), 400

