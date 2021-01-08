from .db import db


class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'))
    user = db.relationship('User', back_populates='likes')

    def to_dict(self):
        return {
          "id": self.id,
          "user_id": self.user_id,
          "post_id": self.post_id,
          "comment_id": self.comment_id
        }