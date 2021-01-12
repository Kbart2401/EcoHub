import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import '../../stylesheets/weatherLoad.css';
import '../../stylesheets/weatherBar.css';


const WeatherBar = () => {
  const [weather, setWeather] = useState([])
  const [region, setRegion] = useState({})
  const [air, setAir] = useState('')
  const [airQuality, setAirQuality] = useState('')
  const [image, setImage] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getWeather, (err => {
      console.error(`ERROR(${err.code}): ${err.message}`);
    }), {
      timeout: 5000, maximumAge: 1000 * 60 * 60
    });
  }, [])

  useEffect(() => {
    if (air) {
      switch (air) {
        case 1:
          setAirQuality('Good')
          break;
        case 2:
          setAirQuality('Fair')
          break;
        case 3:
          setAirQuality('Moderate')
          break;
        case 4:
          setAirQuality('Poor')
          break;
        case 5:
          setAirQuality('Very Poor')
          break;
        default:
          setAirQuality('')
      }
    }
  })

  async function getWeather(location) {
    debugger
    const res = await fetch('/api/api/weather', {
      method: 'POST',
      headers: {
        "Content-type": 'application/json'
      },
      body: JSON.stringify({
        lat: location.coords.latitude, lon: location.coords.longitude
      })
    })
    const data = await res.json()
    const img = `http://openweathermap.org/img/wn/${data.weather.weather[0].icon}@2x.png`
    setImage(img)
    setRegion(data.weather)
    setWeather(data.weather.weather)
    setAir(data.air.list[0].main.aqi)
  }

  return (
    <Box  className="weather-container" align='center'>
      {!air &&
        <div class="lds-roller"><div></div><div></div><div></div><div></div>
          <div></div><div></div><div></div><div></div></div>
      }
      {air &&
        <h2>Current Location: {region.name}</h2>}
      {weather.map((weather, idx) => {
        return <div key={idx}>Weather: {weather.description} <img src={image} /> </div>
      })}
      {air &&
        <div>Air Quality: {airQuality}</div>}

    </Box>
  )
}

export default WeatherBar;