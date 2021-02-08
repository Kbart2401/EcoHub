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
  const user = useSelector(state => state.session.user)
  const [height, setHeight] = useState('')

  return (
    <>
      <div className='home-outer' style={{ height: `${height}` }}>
        <div className='home-left-container'>
          <div className='slide-out-panel'>
            <HomeDrawer />
          </div>
        </div>
        <div className='home-center-container'>
          <Switch>
            <Route path="/home" component={() => <Home setHeight={setHeight} />} />
            <Route path='/users' component={() => <UserSearch users={props.history.location.state.users}
              setHeight={setHeight} />} />
            <Route path="/friends" component={() => <FriendList setHeight={setHeight} />} />
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
