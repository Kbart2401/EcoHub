import React, { useState, useEffect } from 'react';
import { Grid, GridItem, VStack, StackDivider, Box, Flex, Input } from '@chakra-ui/react';


const UserSearch = (props) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    setUsers(props.history.location.state.users.users)
  }, [])

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
                  <div>{user.city}, {user.state}</div> </GridItem>
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