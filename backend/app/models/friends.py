# from .db import db


# class Friend(db.Model):
#     __tablename__ = 'friends'

#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
#     friend_id = db.Column(db.Integer, db.ForeignKey('friends.id'), primary_key=True)
#     message = db.Column(db.String(255))

#     def to_dict():
#         return {
#           "user_id": self.user_id,
#           "friend_id": self.friend_id,
#           "message": self.message
#         }
