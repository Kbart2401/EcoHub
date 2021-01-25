import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, GridItem, VStack, StackDivider, Flex, Button } from '@chakra-ui/react';
import AddFriendModal from '../modals/AddFriendModal';
import * as sessionActions from '../../store/actions/session';
import '../../stylesheets/feed.css';


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
      <VStack divider={<StackDivider borderColor='gray.200' />}>
        <div className='feed-caps'>Search Results</div>
        {users.map((user, idx) => {
          return (
            <>
              <Grid key={idx} minH='120px' width='75%' templateRows='repeat(2, 1fr)'
                templateColumns='repeat(3, 1fr)' gap={4}>
                <GridItem border='2px solid black' rowSpan={2} colSpan={1} bg='tomato' fontWeight='700'>
                  <Flex><img src={user.image} /> {user.username}</Flex>
                  <div>{user.city}, {user.state}
                    {currentUser && checkIfNotFriends(user) &&
                      currentUser.id != user.id &&
                      <AddFriendModal user={user}/>}</div>
                </GridItem>
                <GridItem colSpan={2} bg='papayawhip'>Category: </GridItem>
                <GridItem colSpan={2} bg='tomato'></GridItem>
              </Grid>
            </>
          )
        })
        }
      </VStack>
    </>
  )

}

export default UserSearch