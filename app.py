from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)


def load_display_items(all_items):
    not_deleted_items = []
    for item in all_items:
        if not item["deleted"]:
            not_deleted_items.append(item)
    return not_deleted_items


def generate_id(all_items):
    new_id = max(item["id"] for item in all_items) + 1
    return new_id


def write_items(all_items):
    with open('backend/data.json', 'w') as file:
        file.write(json.dumps(all_items))
        return all_items


def load_all_items():
    with open('backend/data.json', 'r') as file:
        items = json.loads(file.read())
        return items


@app.route('/api/items', methods=['GET'])
def get_items():
    display_items = load_display_items(load_all_items())
    return jsonify(display_items)


@app.route("/api/items/<int:item_id>", methods=['GET'])
def one_item(item_id):
    raw_data = load_all_items()
    requested_item = next((item for item in raw_data if item['id'] == item_id), None)
    if requested_item["deleted"]:
        # Put an item was deleted message or something similar
        return jsonify(requested_item)
    else:
        return jsonify(requested_item)


@app.route("/api/items/<int:item_id>", methods=['DELETE'])
def delete_item(item_id):
    all_items = load_all_items()
    for item in all_items:
        if item['id'] == item_id:
            item['deleted'] = True

    write_items(all_items)
    display_items = load_display_items(all_items)
    return jsonify(display_items)


@app.route("/api/items/<int:item_id>", methods=['PUT'])
def undelete_item(item_id):
    all_items = load_all_items()
    for item in all_items:
        if item['id'] == item_id:
            item['deleted'] = False
    pass


@app.route("/api/items", methods=['POST'])
def create_item():
    new_item = json.loads(request.data)
    all_items = load_all_items()
    new_item["id"] = generate_id(all_items)
    new_item["deleted"] = False
    all_items.append(new_item)
    write_items(all_items)
    display_items = load_display_items(all_items)
    return jsonify(display_items)
