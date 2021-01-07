from flask import Blueprint
import requests

api_routes = Blueprint('api', __name__)

@api_routes.route('/weather')
def weather():
    url = "api.openweathermap.org/data/2.5/weather?q=London&appid=f6a539077b36ebc5792bae8d36ed4824"
    response = requests.request('GET', url, headers={}, data={})
    print(response.text)
