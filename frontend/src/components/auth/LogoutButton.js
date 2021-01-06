import React from "react";
import {useDispatch} from 'react-redux';
import * as sessionActions from '../../store/actions/session'

const LogoutButton = () => {
  const dispatch = useDispatch()

  const onLogout = async (e) => {
    dispatch(sessionActions.logUserOut())
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
