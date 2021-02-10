import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Route, Switch } from "react-router-dom";
import { useSelector } from 'react-redux';
import Home from './Home';
import UserSearch from './UserSearch';
import FriendList from './FriendList';
import HomeDrawer from '../modals/HomeDrawer';
import '../../stylesheets/homePage.css';
import ProfilePage from './ProfilePage';


const Main = (props) => {
  const userEmail = useSelector(state => state.session.user.email)

  return (
    <>
      <div className='home-outer'>
        <div className='home-left-container'>
          <div className='slide-out-panel'>
            <HomeDrawer />
          </div>
        </div>
        <div className='home-center-container'>
          <Switch>
            <Route path="/home" component={() => <Home userEmail={userEmail}/>} />
            <Route path='/users' component={() => <UserSearch users={props.history.location.state.users}
               />} />
            <Route path="/friends" component={() => <FriendList />} />
            <Route path="/profile" component={ProfilePage} />
          </Switch>
        </div>
        <div className='home-right-container'>
          {/* <div className='feed-caps tomato'>Top Contributors</div> */}
        </div>
      </div>
    </>
  )
}

export default Main;
