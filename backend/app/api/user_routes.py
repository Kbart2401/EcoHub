from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Friend, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/add', methods=['POST'])
@login_required
def add_friend():
    user_id = current_user.id
    friend_id = request.get_json().get('id')
    message = request.get_json().get('message')
    friendship = Friend(
        user_id=user_id,
        friend_id=friend_id,
        message=message
    )
    db.session.add(friendship)
    db.session.commit()
    return friendship.to_dict()


@user_routes.route('/confirm', methods=['POST'])
@login_required
def confirm_friend():
    user_id = current_user.id 
    friend_id = request.get_json().get('id')
    friend = User.query.get(friend_id)
    current_user.friends.append(friend)
    db.session.add(current_user)
    db.session.commit()
    return current_user.to_dict_full()
