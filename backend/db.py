import psycopg2
from sqlalchemy.engine.url import URL
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship


def get_db_conn():
    return psycopg2.connect(
        host="localhost",
        database="directory",
        port=5432,
        user="colby-snow",
        password="admin"
    )


db = SQLAlchemy()
