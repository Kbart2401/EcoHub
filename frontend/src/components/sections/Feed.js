import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, GridItem, VStack, StackDivider, Box, Flex, Input } from '@chakra-ui/react';
import Comments from './Comments';
import '../../stylesheets/feed.css';

const Feed = () => {
  const posts = useSelector(state => state.session.posts)

  const postCreated = (createdDate) => {
    return createdDate.slice(4, 16)
  }

  return (
    <>
      <VStack divider={<StackDivider borderColor='gray.200' />}>
        <div>Recent Activity</div>
        {posts && posts.map((post, idx) => {
          return (
            <>
              <Grid key={idx} minH='120px' width='75%' templateRows='repeat(2, 1fr)'
                templateColumns='repeat(3, 1fr)' gap={4}>
                <GridItem border='2px solid black' rowSpan={2} colSpan={1} bg='tomato' fontWeight='700'>
                  <img src={post.user.image} /> {post.user.username} <br />{postCreated(post.created_date)} </GridItem>
                <GridItem colSpan={2} bg='papayawhip'>Category: {post.category}</GridItem>
                <GridItem colSpan={2} bg='tomato'>{post.content}</GridItem>
              </Grid>
              <Flex>
                <Comments post={post} />
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