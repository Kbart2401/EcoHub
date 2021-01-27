import React, { useState, useEffect } from 'react';
import { Image } from '@chakra-ui/react';
import Feed from '../sections/Feed';
import '../../stylesheets/profilePage.css';


const ProfilePage = (props) => {
  const [user, setUser] = useState()

  useEffect(() => {
    setUser(props.history.location.state.user)
    console.log('PARAMS', props.match)
  }, [])

  return (
    <>
      {user &&
      <>
        <div className='profile-header-container'>
          <Image src={user.image} objectFit='cover' />
          <div className='profile-username'>{user.username}</div>
        </div>
        <div>
          
        </div>
        </>
      }
    </>
  )
}

export default ProfilePage