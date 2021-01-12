import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import AirModal from '../modals/AirModal';
import '../../stylesheets/weatherLoad.css';
import '../../stylesheets/weatherBar.css';


const WeatherBar = () => {
  const [weather, setWeather] = useState([]);
  const [region, setRegion] = useState({});
  const [air, setAir] = useState('');
  const [airQuality, setAirQuality] = useState('');
  const [image, setImage] = useState('');
  const [bgImage, setBgImage] = useState('');
  const [bgUrl, setBgUrl] = useState('');
  const [temp, setTemp] = useState('');
  const [particles, setParticles] = useState({});

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

  useEffect(() => {
    if (bgImage) {
      switch (bgImage) {
        case 'haze' || 'mist':
          setBgUrl("url(/images/fog.jpg)")
          break;
        default:
          setBgUrl("url('/images/clear-sky.jpg')")
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
    const img = `http://openweathermap.org/img/wn/${data.weather.weather[0].icon}@2x.png`
    setImage(img)
    setRegion(data.weather)
    setWeather(data.weather.weather)
    setAir(data.air.list[0].main.aqi)
    setParticles(data.air.list[0].components)
    setBgImage(data.weather.weather[0].description)
    convertFahreneit(data.weather.main.temp)
  }

  function convertFahreneit(k) {
    const f = k * (9 / 5) - 459.67;
    setTemp(Math.floor(f));
  }

  return (
    <Box className="weather-container" align='center' bgImage={bgUrl}>
      {!air &&
        <div class="lds-roller"><div></div><div></div><div></div><div></div>
          <div></div><div></div><div></div><div></div></div>
      }

      {air &&
        <h2>Current Location: {region.name}</h2>}
      {weather.map((weather, idx) => {
        return <div key={idx}>Weather: {weather.description} <img src={image} />
        Temp: {temp}°</div>
      })}
      {air &&
        <AirModal airQuality={airQuality} particles={particles} />}

    </Box>
  )
}

export default WeatherBar;