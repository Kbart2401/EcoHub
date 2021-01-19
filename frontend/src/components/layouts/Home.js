import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Feed from '../sections/Feed';
import HomeDrawer from '../modals/HomeDrawer';
import WeatherBar from '../sections/WeatherBar';
import TaskModal from '../modals/TaskModal';
import '../../stylesheets/homePage.css';
import IssueModal from '../modals/IssueModal';

const Home = () => {
  const user = useSelector(state => state.session.user)
  const history = useHistory()

  useEffect(() => {
    if (!user || user.errors) {
      return history.push('/')
    }
  })


  return (
    <>
      <div className='home-outer'>
        <div className='home-left-container'>
          <div className='slide-out-panel'>
            <HomeDrawer />
          </div>
        </div>
        <div className='home-center-container'>
          <WeatherBar />
          <div className='post-buttons'>
            <TaskModal />
            <IssueModal />
          </div>
          <Feed />
        </div>
        <div className='home-right-container'>
          <div>Top Contributors</div>
        </div>
      </div>
    </>
  )
}

export default Home;
