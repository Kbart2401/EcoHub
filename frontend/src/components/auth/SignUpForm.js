import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/actions/session';

const SignUpForm = ({ authenticated, setAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const dispatch = useDispatch()

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      dispatch(sessionActions.signUserUp(username, email, city, state, country, password));
        setAuthenticated(true);
      
    }
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        <label>User Name</label>
        <input
          type="text"
          name="username"
          onChange={e => setUsername(e.target.value)}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={e => setEmail(e.target.value)}
          value={email}
        ></input>
      </div>
      <div>
        <label>City</label>
        <input
          type="text"
          name="city"
          onChange={e => setCity(e.target.value)}
          value={city}
        ></input>
      </div>
      <div>
        <label>State</label>
        <input
          type="text"
          name="state"
          onChange={e => setState(e.target.value)}
          value={state}
        ></input>
      </div>
      <div>
        <label>Country</label>
        <input
          type="text"
          name="country"
          onChange={e => setCountry(e.target.value)}
          value={country}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        ></input>
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          name="repeat_password"
          onChange={e => setRepeatPassword(e.target.value)}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
