import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { VStack, StackDivider, Flex, Image } from '@chakra-ui/react';
import '../../stylesheets/userSearch.css';
import '../../stylesheets/friendList.css';


const FriendList = ({ setHeight }) => {
  const user = useSelector(state => state.session.user)
  const history = useHistory()

  useEffect(() => {
    if (user) {
      if (user.friends.length < 3) {
        setHeight('100vh')
      }
      else setHeight('')
    }
  })

  const handleClick = (id) => async (e) => {
    const res = await fetch(`api/users/${id}`)
    const data = await res.json()
    return history.push('/profile', {'user': data})
}

  return (
    <>
      <VStack divider={<StackDivider borderColor='gray.200' />}>
        <div className='feed-caps'>{user?.username}'s Friend List</div>
        {user?.friends.map((user, idx) => {
          return (
            <Link key={idx} to='' className='friendList-link' onClick={handleClick(user.id)}>
              <Flex className='friendList-user-container' bg='tomato' fontWeight='700'
                alignItems='center'>
                <div>
                  <Image src={user.image} objectFit='cover' />
                </div>
                <div className='friendList-user-details-left'>
                  <div className='friendList-username'>{user.username}</div>
                  <div>{user.city}, {user.state}
                  </div>
                </div>
                <div className='friendList-user-details-right'>
                  <span>XP</span> &nbsp; &nbsp; {user.xp}
                </div>
              </Flex>
            </Link>

          )
        })
        }
      </VStack>
    </>
  )
}

export default FriendList;