import React from 'react';
import { useSelector } from 'react-redux';
import Landing from './Landing';
import Home from './Home';

const Base = () => {
  const user = useSelector(state => state.session.user)

  return (
    <>
      {!user &&
        <Landing />
      }
      {user &&
      <Home />}
    </>
  )
}

export default Base