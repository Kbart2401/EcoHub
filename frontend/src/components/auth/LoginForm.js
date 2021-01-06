import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/actions/session'

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(state => state.session.user)

  const onLogin = async (e) => {
    e.preventDefault();
    dispatch(sessionActions.logUserIn(username, password))
      .catch(e => setErrors(e))
  }

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onLogin}>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
