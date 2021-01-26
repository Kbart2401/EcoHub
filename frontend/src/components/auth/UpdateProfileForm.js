import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { Input } from '@chakra-ui/react';

const UpdateProfileForm = (props) => {
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    props.setUsername(user.username)
    props.setEmail(user.email)
    props.setCity(user.city)
    props.setState(user.state)
    props.setCountry(user.country)
  }, [])


  return (
    <form onSubmit={props.onUpdate}>
      <ul>
        {props.errors.map((error, idx) => <li className='form-errors' key={idx}>{error}</li>)}
      </ul>
      <div>
        <label>User Name</label>
        <Input
          type="text"
          name="username"
          onChange={e => props.setUsername(e.target.value)}
          value={props.username}
        />
      </div>
      <div>
        <label>Email</label>
        <Input
          type="text"
          name="email"
          onChange={e => props.setEmail(e.target.value)}
          value={props.email}
        />
      </div>
      <div>
        <label>City</label>
        <Input
          type="text"
          name="city"
          onChange={e => props.setCity(e.target.value)}
          value={props.city}
        />
      </div>
      <div>
        <label>State</label>
        <Input
          type="text"
          name="state"
          onChange={e => props.setState(e.target.value)}
          value={props.state}
        />
      </div>
      <div>
        <label>Country</label>
        <Input
          type="text"
          name="country"
          onChange={e => props.setCountry(e.target.value)}
          value={props.country}
        />
      </div>
      <div>
        <label>Password</label>
        <Input
          type="password"
          name="password"
          onChange={e => props.setPassword(e.target.value)}
          value={props.password}
          required={true}
        />
      </div>
      <div>
        <label>Confirm Password</label>
        <Input
          type="password"
          name="repeat_password"
          onChange={e => props.setRepeatPassword(e.target.value)}
          value={props.repeatPassword}
          required={true}
        />
      </div>
      <label>Upload Image</label>
      <Input name='image' type='file' onChange={e => props.setImage(e.target.files[0])} />
      {/* <progress max='100' value='0'></progress> */}
    </form>
  );
};

export default UpdateProfileForm;
