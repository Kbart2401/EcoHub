import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Feed from '../sections/Feed';
import HomeDrawer from '../modals/HomeDrawer';

const Home = () => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()

  useEffect(() => {
    debugger
    if (!user || user.errors) {
      return <Redirect to="/" />;
    }
  }, [dispatch])

  return (
    <>
      <HomeDrawer />
      <h1>Home </h1>
      <Feed />
    </>
  )
}

export default Home;
