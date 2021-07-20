from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    file = open('backend/data.json', 'r')
    raw_data = json.loads(file.read())

    file.close()
    return jsonify(raw_data)
