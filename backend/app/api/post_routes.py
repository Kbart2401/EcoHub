from flask import Blueprint, request
from flask_login import login_required, current_user


post_routes = Blueprint('posts', __name__)


@post_routes.route('/', methods=['POST'])
@login_required
def add_post():
    user_id = current_user.id
    category = request.get_json('category')
    content = request.get_json('content')
    post = Post(
        user_id=user_id,
        category=category,
        content=content
    )
    db.session.add(post)
    db.session.commit()
    return post.to_dict()
