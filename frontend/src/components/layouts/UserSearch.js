import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { VStack, StackDivider, Flex, Image } from '@chakra-ui/react';
import AddFriendModal from '../modals/AddFriendModal';
import '../../stylesheets/userSearch.css';


const UserSearch = (props) => {
  //session is just to check the redux store and see that user has updated
  //I think if you're on the actual object that's changing it may not update, 
  //need to be one object up
  // const session = useSelector(state => state.session)
  const currentUser = useSelector(state => state.session.user)
  const [users, setUsers] = useState([])

  useEffect(() => {
    setUsers(props.users.users)
  }, [])

  const checkIfNotFriends = (user) => {
    if (currentUser.friends.length !== 0) {
      const check = currentUser.friends.some(friend => friend.id === user.id)
      return check === true ? false : true
    }
    return true
  }

  return (
    <>
      <VStack divider={<StackDivider borderColor='gray.200' />}>
        <div className='feed-caps'>Search Results</div>
        {users.length === 0 && <div>No Search Results</div>}
        {users.map((user, idx) => {
          return (
            <Flex key={idx} className='usersearch-user-container' bg='tomato' fontWeight='700'>
              <div>
                <Image src={user.image} objectFit='cover' />
              </div>
              <div className='usersearch-user-details-left'>
                <div className='usersearch-username'>{user.username}</div>
                <div>{user.city}, {user.state}
                  {currentUser && checkIfNotFriends(user) &&
                    currentUser.id != user.id &&
                    <AddFriendModal user={user} />}
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

export default UserSearch