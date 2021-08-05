import json

from flask import jsonify, request
from flask.views import MethodView

from backend.todo_database import TodoDatabase
from backend.db import db
from backend.models.items import Items
from flask_jwt import jwt_required, current_identity


def load_display_items():
    not_deleted_items = db.session.query(Items)\
                .filter(Items.deleted == False, Items.user_id == current_identity.id).all()
    return not_deleted_items


def generate_id(all_items):
    new_id = max(item["id"] for item in all_items) + 1
    return new_id


def write_items(all_items):
    with open('backend/data.json', 'w') as file:
        file.write(json.dumps(all_items))
        return all_items


def load_all_items():
    all_items = db.session.query(Items).all()
    return all_items


class ItemView(MethodView):

    @jwt_required()
    def get(self, item_id):
        if item_id is None:
            display_items = load_display_items()
            resp = [i.to_json() for i in display_items]
            return jsonify(resp)
        else:
            user_id = item_id
            this_user_items = db.session.query(Items).filter(Items.fk_user_id == user_id, Items.deleted == False)
            resp = [i.to_json() for i in this_user_items]
            print(resp)
            return jsonify(resp)

    @jwt_required()
    def post(self):
        new_item = json.loads(request.data)
        new_todo = Items(title=new_item['title'], completed=new_item['completed'],
                         deleted=False,
                         user_id=current_identity.id)
        db.session.add(new_todo)
        db.session.commit()
        display_items = load_display_items()
        resp = [i.to_json() for i in display_items]
        return jsonify(resp)

    @jwt_required()
    def delete(self, item_id):
        db.session.query(Items).filter(Items.id == item_id).update({"deleted": True});
        db.session.commit()
        display_items = load_display_items()
        resp = [i.to_json() for i in display_items]
        return jsonify(resp)

    @jwt_required()
    def put(self, item_id):
        status = db.session.query(Items).filter(Items.id == item_id)
        status = status[0].to_json()
        newstatus = not status['completed']
        db.session.query(Items).filter(Items.id == item_id).update({"completed": newstatus});
        db.session.commit()
        display_items = load_display_items()
        resp = [i.to_json() for i in display_items]
        return jsonify(resp)
