from flask import Blueprint, request
from app.models import Like, db
from flask_login import login_required, current_user

like_routes = Blueprint('likes', __name__)

@like_routes.route('/', methods=['POST'])
@login_required
def create_like():
    user_id = current_user.id
    post_id = request.get_json().get('post_id')
    comment_id = request.get_json().get('comment_id')
    like = Like(
      user_id=user_id,
      post_id=post_id,
      comment_id=comment_id
    )
    db.session.add(like)
    db.session.commit()
    return like.to_dict()


@like_routes.route('/', methods=['DELETE'])
@login_required
def remove_like():
    id = request.get_json().get('id')
    like = Like.query.get(id)
    db.session.delete(like)
    db.session.commit()
    return like.to_dict()


@like_routes.route('/post/<int:id>')
@login_required
def get_post_likes(id):
    likes = Like.query.filter_by(post_id=id).all()
    return {"count": len(likes)}


@like_routes.route('/comment/<int:id>')
@login_required
def get_comment_likes(id):
    likes = Like.query.filter_by(comment_id=id).all()
    return {"count": len(likes)}
