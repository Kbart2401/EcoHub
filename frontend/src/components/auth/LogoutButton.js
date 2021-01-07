import React from "react";
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as sessionActions from '../../store/actions/session'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const onLogout = async (e) => {
    dispatch(sessionActions.logUserOut())
    return history.push()

  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
