import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Grid, GridItem, VStack, StackDivider, Box, Flex, Input } from '@chakra-ui/react';
import Comments from './Comments';
import * as sessionActions from '../../store/actions/session';


const Feed = () => {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.session.posts)
  



  

  return (
    <>
      <VStack divider={<StackDivider borderColor='gray.200' />}>
        <div>Recent Activity</div>
        {posts && posts.map((post, idx) => {
          return (
            <>
              <Grid key={idx} maxH='120px' templateRows='repeat(2, 1fr)'
                templateColumns='repeat(3, 1fr)' gap={4}>
                <GridItem border='2px solid black' rowSpan={2} colSpan={1} bg='tomato' fontWeight='700'>
                  {post.user.username} <br />{post.created_date} </GridItem>
                <GridItem colSpan={2} bg='papayawhip'>Category: {post.category}</GridItem>
                <GridItem colSpan={2} bg='tomato'>{post.content}</GridItem>
              </Grid>
              <Flex>
                <Comments post={post}/>
              </Flex>
            </>
          )
        })
        }
      </VStack>
    </>
  )
}

export default Feed