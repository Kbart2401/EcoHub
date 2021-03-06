import React from 'react';
import Feed from '../sections/Feed';
import WeatherBar from '../sections/WeatherBar';
import TaskModal from '../modals/TaskModal';
import '../../stylesheets/homePage.css';
import IssueModal from '../modals/IssueModal';


const Home = ({ userEmail }) => {


  return (
    <>
      <WeatherBar userEmail={userEmail}/>
      <div className='post-buttons'>
        <TaskModal />
        <IssueModal />
      </div>
      <Feed />
    </>
  )
}

export default Home;
