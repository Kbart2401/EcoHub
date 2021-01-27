from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Friend, db
from sqlalchemy import func, or_

user_routes = Blueprint('users', __name__)


@user_routes.route('/search/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict_full() for user in users]}

@user_routes.route('/<id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict_full()


@user_routes.route('/search/<user>')
@login_required
def search(user):
    search_user = f'%{user.lower()}%'
    if not search_user:
        return {"users": []}
    users = User.query.filter(or_(func.lower(User.username).like(
        search_user), (func.lower(User.city)).like(search_user),
        (func.lower(User.state)).like(search_user))).all()
    return {"users": [user.to_dict_full() for user in users]}


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
    friend_id = request.get_json().get('id')
    friend = User.query.get(friend_id)
    current_user.friends.append(friend)
    # change friendship message to None
    friendship = Friend.query.filter_by(
        friend_id=current_user.id, user_id=friend_id).first()
    friendship.message = None
    db.session.add(current_user)
    db.session.add(friendship)
    db.session.commit()
    return friend.to_dict()


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
    return {'friendsWaiting': [(friend[0].to_dict(), {'message': friend[1]}) for friend in requests]}
