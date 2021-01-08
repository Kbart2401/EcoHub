import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Feed from '../sections/Feed';
import HomeDrawer from '../modals/HomeDrawer';
import WeatherBar from '../sections/WeatherBar';
import '../../stylesheets/homePage.css';

const Home = () => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const history = useHistory()

  // function hello(pos) {
  //   console.log('HELLO KITTY', pos.coords)
  // }
  // function error(err) {
  //   console.log(`ERROR(${err.code}): ${err.message}`);
  // };
  function success(pos) {
    const crd = pos.coords;
   console.log('HELLO WORKD', crd)
  };

  function error(err) {
    alert(`ERROR(${err.code}): ${err.message}`);
  };

  useEffect(() => {
    // debugger
    navigator.geolocation.getCurrentPosition(success, error, {
      timeout: 10000, maximumAge: 1000*60*60
    });
  }, [])



  useEffect(() => {
    if (!user || user.errors) {
      return history.push('/')
    }
    // console.log(navigator.geolocation)
    // debugger
    // navigator.geolocation.getCurrentPosition(hello, error)
    
  }, [dispatch])

  // async function getWeather(location) {
  //   debugger
  //   const res = await fetch('/api/api/weather', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       lat: location.coords.latitude, lon: location.coords.longitude
  //     })
  //   })
  //   const data = await res.json()
  //   console.log('DATA', data)
  // }

  return (
    <>
    <div className='home-outer'>
    <div className='home-container'>
      <WeatherBar />
      <HomeDrawer />
      <Feed />
      </div>
      </div>
    </>
  )
}

export default Home;
