from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Friend, db
from sqlalchemy import func, or_

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<user>')
@login_required
def user(user):
    search_user = f'%{user.lower()}%'
    users = User.query.filter(or_(func.lower(User.username).like(
        search_user), (func.lower(User.city)).like(search_user),
        (func.lower(User.state)).like(search_user))).all()
    # users = filter(lambda user: user['id'] != current_user.id, users)
    print('CURRENT USER', current_user)
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/add', methods=['POST'])
@login_required
def add_friend():
    user_id = current_user.id
    friend_id = request.get_json().get('id')
    friend = User.query.get(friend_id)
    message = request.get_json().get('message')
    friendship = Friend(
        user_id=user_id,
        friend_id=friend_id,
        message=message
    )
    db.session.add(friendship)
    db.session.commit()
    return friend.to_dict()


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


# Check if user has any friend requests waiting
@user_routes.route('/friend-requests')
@login_required
def friend_requests():
    # check if user id = a friend id
    friends_added_user = Friend.query.filter_by(
        friend_id=current_user.id).all()
    friends_requested = [friendship.to_dict()
                         for friendship in friends_added_user]
    friends_waiting = list(filter(
        lambda f: (f['message'] is not None), friends_requested))
    requests = [(User.query.filter_by(id=friendship['user_id']).one(),
                 # check this to make sure you don't get the same user with each query
                 friendship['message'])
                for friendship in friends_waiting]

    return {'friends_waiting': [(friend[0].to_dict(), {'message': friend[1]}) for friend in requests]}
