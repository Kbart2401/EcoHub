from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Post, User, db


post_routes = Blueprint('posts', __name__)


@post_routes.route('/', methods=['POST'])
@login_required
def add_post():
    user_id = current_user.id
    category = request.get_json().get('category')
    content = request.get_json().get('content')
    post = Post(
        user_id=user_id,
        category=category,
        content=content
    )
    db.session.add(post)
    db.session.commit()
    return post.to_dict()


@post_routes.route('/', methods=['DELETE'])
@login_required
def remove_post():
    user_id = current_user.id
    id = request.get_json().get('id')
    post = Post.query.filter_by(id=id).first()
    db.session.delete(post)
    db.session.commit()
    return post.to_dict()


@post_routes.route('/<int:id>')
@login_required
def get_posts(id):
    user = User.query.get(id)
    posts = Post.query.filter_by(user_id=user.id).all()
    return {'posts': [post.to_dict() for post in posts]}