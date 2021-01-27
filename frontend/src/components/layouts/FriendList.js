import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VStack, StackDivider, Flex, Image } from '@chakra-ui/react';
import AddFriendModal from '../modals/AddFriendModal';
import '../../stylesheets/userSearch.css';


const FriendList = ({ setHeight }) => {
  const currentUser = useSelector(state => state.session.user)
  const [users, setUsers] = useState([])

  useEffect(() => {
    setHeight('100vh')
  })

  return (
    <>
      <VStack divider={<StackDivider borderColor='gray.200' />}>
        <div className='feed-caps'>Friends List</div>
        {users.map((user, idx) => {
          return (
            <Flex key={idx} className='usersearch-user-container' bg='tomato' fontWeight='700'>
              <div>
                <Image src={user.image} objectFit='cover' />
              </div>
              <div className='usersearch-user-details-left'>
                <div className='usersearch-username'>{user.username}</div>
                <div>{user.city}, {user.state}
                </div>
              </div>
              <div className='usersearch-user-details-right'>
                <span>XP</span> &nbsp; &nbsp; {user.xp} <br /><br />
                <span>Friends</span> &nbsp; &nbsp; {user.friends ? user.friends.length : 0}
              </div>
            </Flex>
          )
        })
        }
      </VStack>
    </>
  )
}

export default FriendList;