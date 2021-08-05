from sqlalchemy.orm import relationship

from backend.db import db
from sqlalchemy import Column


class Users(db.Model):
    __tablename__ = 'users'

    username = Column(db.Text)
    password = Column(db.Text)
    id = Column(db.Integer, primary_key=True)
    deleted = Column(db.Boolean)
    items = db.relationship('Items', lazy=False)

    def to_json(self):
        return dict(
            username=self.username,
            id=self.id,
            password=self.password,
            deleted=self.deleted
        )
