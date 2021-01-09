import React, { useEffect, useState } from 'react';


const WeatherBar = () => {
const [weather, setWeather] = useState({})
const [air, setAir] = useState({})

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getWeather, (err => {
      console.error(`ERROR(${err.code}): ${err.message}`);
    }), {
      timeout: 5000, maximumAge: 1000 * 60 * 60
    });
  }, [])

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
    setWeather(data.weather)
    setAir(data.air)
  }

  return (
    <div className="weather-container">
      {weather && 
      <>
      <h2>{weather.name}</h2>
      <h2>{weather.weather.temp}</h2>
      </>}
    </div>
  )
}

export default WeatherBar;