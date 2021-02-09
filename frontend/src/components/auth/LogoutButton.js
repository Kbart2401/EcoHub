import React from "react";
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as sessionActions from '../../store/actions/session'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const onLogout = () => {
    debugger
    dispatch(sessionActions.logUserOut()).then(() => history.push('/'))
  };

  return <button className='css-1bvdrhg' onClick={onLogout}>Log Out</button>;
};

export default LogoutButton;
