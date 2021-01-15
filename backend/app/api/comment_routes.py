from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Comment, User, db

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/', methods=['POST'])
@login_required
def create_comment():
    user_id = current_user.id
    post_id = request.get_json().get('post_id')
    content = request.get_json().get('content')
    comment = Comment(
        user_id=user_id,
        post_id=post_id,
        content=content
    )
    db.session.add(comment)
    db.session.commit()
    return comment.to_dict_full()


@comment_routes.route('/', methods=['DELETE'])
@login_required
def delete_comment():
    id = request.get_json().get('id')
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return comment.to_dict()


@comment_routes.route('/<int:id>')
@login_required
def get_comments(id):
    comments = Comment.query.filter_by(post_id=id).all()
    return {"comments": [comment.to_dict() for comment in comments]}
