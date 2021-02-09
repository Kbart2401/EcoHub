import os
import boto3
from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from app.forms import UpdateUserForm
from flask_login import current_user, login_user, logout_user, login_required
from werkzeug.utils import secure_filename

s3 = boto3.client('s3', aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
                  aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'))
BUCKET_NAME = 'ecohub-bucket'

auth_routes = Blueprint('auth', __name__)


def upload_file_to_s3(file, bucket_name, acl='public-read'):
    s3.upload_fileobj(
        file, bucket_name, file.filename, ExtraArgs={
            'ACL': acl,
            "ContentType": file.content_type
        }
    )
    filename = file.filename.replace(' ', '+')
    return f'https://{bucket_name}.s3.us-east-2.amazonaws.com/{filename}'


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(error)
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        user = current_user
        return user.to_dict_full()
    return {'errors': ['Unauthorized']}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(
            User.username == form.data['username']).first()
        login_user(user)
        return user.to_dict_full()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {"message": "user has been logged out"}


@auth_routes.route('/signup', methods=['POST', 'PATCH'])
def sign_up():
    """Creates a new user and logs them in"""
    if request.method == 'POST':
        form = SignUpForm()
    else:
        form = UpdateUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if request.files:
            image_url = upload_file_to_s3(request.files['image'], BUCKET_NAME)
        elif request.method == 'POST':
            image_url = 'https://ecohub-bucket.s3.us-east-2.amazonaws.com/tree-736885_1280.jpg'
        else:
            image_url = current_user.img_url
        # POST: Create new user
        if request.method == 'POST':
            user = User(
                username=form.data['username'],
                email=form.data['email'],
                city=form.data['city'],
                state=form.data['state'],
                country=form.data['country'],
                xp=0,
                img_url=image_url,
                password=form.data['password']
            )
            db.session.add(user)
            db.session.commit()
            login_user(user)
        else:
            user = current_user
            user.username = form.data['username'],
            user.email = form.data['email'],
            user.city = form.data['city'],
            user.state = form.data['state'],
            user.country = form.data['country'],
            user.img_url = image_url,
            user.password = form.data['password']
            db.session.add(user)
            db.session.commit()
        return user.to_dict_full()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
