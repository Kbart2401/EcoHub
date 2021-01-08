from .db import db


class Friend(db.Model):
    __tablename__ = 'friends'

    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), primary_key=True)
    friend_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), primary_key=True)
    message = db.Column(db.String(255))

    @property
    def message_(self):
        return self.message
  
    @message_.setter
    def set_message(self, message):
        self.message = message
 
    def to_dict(self):
        return {
            "user_id": self.user_id,
            "friend_id": self.friend_id,
            "message": self.message
        }
