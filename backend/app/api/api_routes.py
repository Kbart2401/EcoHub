from flask import Blueprint, request
import os
import requests

api_routes = Blueprint('api', __name__)

API_KEY = os.environ.get('WEATHER_API_KEY')

@api_routes.route('/weather', methods=['POST'])
def weather():
    lat = request.get_json().get('lat')
    lon = request.get_json().get('lon')
    weather_url = f'http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}'
    response = requests.get(weather_url)
    weather_data = response.json()
    # if weather_data:
        # response = requests.get('http://openweathermap.org/img/wn/10d@2x.png')
        # icon = response.json()
    air_url = f'http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API_KEY}'
    response = requests.get(air_url)
    air_data = response.json()
    return {"weather": weather_data, "air": air_data}
