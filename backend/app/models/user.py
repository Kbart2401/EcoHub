from .db import db
from .friends import Friend
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    city = db.Column(db.String(255))
    state = db.Column(db.String(255))
    country = db.Column(db.String(100))
    xp = db.Column(db.Integer, nullable=False)
    img_url = db.Column(db.String(255))
    hashed_password = db.Column(db.String(255), nullable=False)
    posts = db.relationship('Post', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')
    likes = db.relationship('Like', back_populates='user')
    friends = db.relationship('User', secondary='friends', primaryjoin=id ==
                              Friend.user_id, secondaryjoin=id ==
                              Friend.friend_id)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "city": self.city,
            "state": self.state,
            "country": self.country,
            "xp": self.xp,
            "image": self.img_url
        }

    def to_dict_full(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "city": self.city,
            "state": self.state,
            "country": self.country,
            "xp": self.xp,
            "image": self.img_url,
            "posts": [post.to_dict() for post in self.posts],
            "friends": [friend.to_dict() for friend in self.friends]
        }
