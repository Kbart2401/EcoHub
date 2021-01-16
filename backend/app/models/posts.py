from .db import db
import datetime


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text)
    created_date = db.Column(db.Date, default=datetime.datetime.now())
    user = db.relationship('User', back_populates='posts')
    comments = db.relationship('Comment', back_populates='post')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "category": self.category,
            "content": self.content,
            "created_date": self.created_date
        }

    def to_dict_full(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "category": self.category,
            "content": self.content,
            "created_date": self.created_date,
            "user": self.user.to_dict(),
            "comments": [comment.to_dict_full() for comment in self.comments]
        }
