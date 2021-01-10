import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Feed from '../sections/Feed';
import HomeDrawer from '../modals/HomeDrawer';
import WeatherBar from '../sections/WeatherBar';
import TaskModal from '../modals/TaskModal';
import '../../stylesheets/homePage.css';

const Home = () => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (!user || user.errors) {
      return history.push('/')
    }
  }, [dispatch])


  return (
    <>
    <div className='home-outer'>
    <div className='home-container'>
      <WeatherBar />
      <HomeDrawer />
      <TaskModal />
      <Feed />
      </div>
      </div>
    </>
  )
}

export default Home;
