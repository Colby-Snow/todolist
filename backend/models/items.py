from sqlalchemy import Column

from backend.db import db


class Items(db.Model):
    __tablename__ = 'todo_items'

    title = Column(db.Text)
    id = Column(db.Integer, primary_key=True)
    completed = Column(db.Boolean)
    deleted = Column(db.Boolean)
    user_id = Column('fk_user_id',
                     db.Integer,
                     db.ForeignKey('users.id'),
                     )
    user = db.relationship('Users', lazy=False)

    def to_json(self):
        return dict(
            title=self.title,
            id=self.id,
            completed=self.completed,
            deleted=self.deleted
        )
