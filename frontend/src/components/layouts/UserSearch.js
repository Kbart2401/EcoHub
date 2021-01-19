import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, GridItem, VStack, StackDivider, Flex, Button } from '@chakra-ui/react';
import * as sessionActions from '../../store/actions/session';


const UserSearch = (props) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.user)
  // const currentFriends = useSelector(state => state.session.user.friends)
  const [users, setUsers] = useState([])

  useEffect(() => {
    setUsers(props.history.location.state.users.users)
  }, [])

  const handleClick = (id) => (e) => {
    e.preventDefault()
    dispatch(sessionActions.addFriend(id))
  }

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
        <div>Search Results</div>
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
                      <Button onClick={handleClick(user.id)}>Add Friend</Button>}</div>
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