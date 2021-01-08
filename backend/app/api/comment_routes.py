from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Comment, User, db

comment_routes = Blueprint('comments', __name__)



