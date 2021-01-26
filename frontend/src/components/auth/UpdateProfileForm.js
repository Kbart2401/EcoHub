import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/actions/session';
import { Button, Input } from '@chakra-ui/react';

const UpdateProfileForm = ({ setUsername, setEmail, setCity, setState, setCountry,
  setPassword, setRepeatPassword, setImage, onSignUp, errors }) => {
    const user = useSelector(state => state.session.user)

  return (
    <form onSubmit={onSignUp}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div>
        <label>User Name</label>
        <Input
          type="text"
          name="username"
          onChange={e => setUsername(e.target.value)}
        value={user.username}
        />
      </div>
      <div>
        <label>Email</label>
        <Input
          type="text"
          name="email"
          onChange={e => setEmail(e.target.value)}
        value={user.email}
        />
      </div>
      <div>
        <label>City</label>
        <Input
          type="text"
          name="city"
          onChange={e => setCity(e.target.value)}
        value={user.city}
        />
      </div>
      <div>
        <label>State</label>
        <Input
          type="text"
          name="state"
          onChange={e => setState(e.target.value)}
        value={user.state}
        />
      </div>
      <div>
        <label>Country</label>
        <Input
          type="text"
          name="country"
          onChange={e => setCountry(e.target.value)}
        value={user.country}
        />
      </div>
      <div>
        <label>Password</label>
        <Input
          type="password"
          name="password"
          onChange={e => setPassword(e.target.value)}
        // value={password}
        />
      </div>
      <div>
        <label>Confirm Password</label>
        <Input
          type="password"
          name="repeat_password"
          onChange={e => setRepeatPassword(e.target.value)}
          // value={repeatPassword}
          required={true}
        />
      </div>
      <label>Upload Image</label>
      <Input name='image' type='file' onChange={e => setImage(e.target.files[0])} />
      {/* <progress max='100' value='0'></progress> */}
    </form>
  );
};

export default UpdateProfileForm;
