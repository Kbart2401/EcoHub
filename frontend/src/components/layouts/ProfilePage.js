import React, { useState, useEffect } from 'react';
import { Image } from '@chakra-ui/react';
import ProfileFeed from '../sections/ProfileFeed';
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
            <div className='profile-username'>
              <div></div><div className='username-center'>{user.username}</div>
              <div className='username-right'>+{user.xp}</div>
            </div>
          </div>
          <div>
            <ProfileFeed posts={user.posts} user={user} />
          </div>
        </>
      }
    </>
  )
}

export default ProfilePage