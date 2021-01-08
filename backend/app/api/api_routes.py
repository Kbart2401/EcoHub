from flask import Blueprint
import os
import requests

api_routes = Blueprint('api', __name__)

API_KEY = os.environ.get('WEATHER_API_KEY')

@api_routes.route('/weather', methods=['POST'])
def weather(lat, lon):
    url = f'http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}'
    response = requests.get(url)
    data = response.json()
    print(data)
    return data


