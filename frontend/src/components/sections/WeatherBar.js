import React, { useEffect, useState } from 'react';


const WeatherBar = () => {
  const [weather, setWeather] = useState([])
  const [base, setBase] = useState({})
  const [air, setAir] = useState('')
  const [airQuality, setAirQuality] = useState('')

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
    setBase(data.weather)
    setWeather(data.weather.weather)
    setAir(data.air.list[0].main.aqi)
  }


  return (
    <div className="weather-container">
      <h2>{base.name}</h2>
      {weather.map((weather, idx) => {
        return <div key={idx}>{weather.description}</div>
      })}
      <div>{airQuality}</div>

    </div>
  )
}

export default WeatherBar;