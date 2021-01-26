import React from "react";
import { Input } from '@chakra-ui/react';

const LoginForm = ({ errors, onLogin, setPassword, setUsername }) => {

  return (
    <form onSubmit={onLogin}>
      <ul>
        {errors.map((error, idx) => <li className='form-errors' key={idx}>{error}</li>)}
      </ul>
      <div>
        <label htmlFor="username">Username</label>
        <Input
          name="username"
          type="text"
          placeholder="Username"
          onChange={e => setUsername(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Input
          name="password"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)} />
      </div>
    </form>
  );
};

export default LoginForm;
