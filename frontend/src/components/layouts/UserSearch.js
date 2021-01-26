import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VStack, StackDivider, Flex, AspectRatio, Image } from '@chakra-ui/react';
import AddFriendModal from '../modals/AddFriendModal';
import HomeDrawer from '../modals/HomeDrawer';
import * as sessionActions from '../../store/actions/session';
import '../../stylesheets/userSearch.css';


const UserSearch = (props) => {
  const dispatch = useDispatch()
  //session is just to check the redux store ans see that user has updated
  //I think if you're on the actual object that's changing it may not update, 
  //need to be one object up
  const session = useSelector(state => state.session)
  const currentUser = useSelector(state => state.session.user)
  const [users, setUsers] = useState([])

  useEffect(() => {
    setUsers(props.history.location.state.users.users)
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
      <div className='home-outer' >
        <div className='home-left-container'>
          <div className='slide-out-panel'>
            <HomeDrawer />
          </div>
        </div>
        <div className='home-center-container'>
          <VStack divider={<StackDivider borderColor='gray.200' />}>
            <div className='feed-caps'>Search Results</div>
            {users.map((user, idx) => {
              return (
                <>
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
                      <span>XP</span> &nbsp; &nbsp; {user.xp}
                    </div>
                  </Flex>
                </>
              )
            })
            }
          </VStack>
        </div>
        <div className='home-right-container'>
        </div>
      </div>
    </>
  )

}

export default UserSearch