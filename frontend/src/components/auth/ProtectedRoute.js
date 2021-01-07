import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useSelector} from 'react-redux';

const ProtectedRoute = (props) => {
  const authenticated = useSelector(state => state.session.user);
  if (!authenticated) {
    return <Redirect to="/"/>
  }
  return (
    <Route {...props}/>
  );
};

export default ProtectedRoute;