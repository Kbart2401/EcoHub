from flask_wtf import FlaskForm
from wtforms import StringField, FileField
from wtforms.validators import DataRequired, Email, ValidationError, Optional
from flask_wtf.file import FileAllowed
from app.models import User


class UpdateUserForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired()])
    city = StringField('city', validators=[Optional()])
    state = StringField('state', validators=[Optional()])
    country = StringField('country', validators=[Optional()])
    password = StringField('password', validators=[DataRequired()])
    image = FileField('image', validators=[
                      FileAllowed(['jpg', 'jpeg', 'png'])])
