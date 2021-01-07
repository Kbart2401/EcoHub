import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/actions/session'
import {Button, Input} from '@chakra-ui/react';

const LoginForm = () => {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(state => state.session.user)

  const onLogin = async (e) => {
    // debugger
    e.preventDefault();
    dispatch(sessionActions.logUserIn(username, password))
      .catch(res => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      })
  }

  if (user && !user.errors) {
    return <Redirect to="/home" />;
  }

  return (
    <form onSubmit={onLogin}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div>
        <label htmlFor="username">Username</label>
        <Input
          name="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button type='submit'>Submit</Button>
      </div>
    </form>
  );
};

export default LoginForm;
