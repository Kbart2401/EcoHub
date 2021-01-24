import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Grid, GridItem, VStack, StackDivider,
  Image, Flex, AspectRatio
} from '@chakra-ui/react';
import Comments from './Comments';
import '../../stylesheets/feed.css';

const Feed = ({ setHeight }) => {
  const posts = useSelector(state => state.session.posts)

  useEffect(() => {
    if (posts) {
      if (posts.length < 3) {
        setHeight('100vh')
      }
      else setHeight('')
    }
  })

  const postCreated = (createdDate) => {
    return createdDate.slice(4, 16)
  }

  return (
    <>
      <VStack className='feed-outer' divider={<StackDivider borderColor='gray.200' />}>
        <div className='feed-caps'>Recent Activity</div>
        {posts?.length === 0 &&
          <div className='empty-feed'>No posts to show</div>}
        {posts?.map((post, idx) => {
          return (
            <>
              <Grid key={idx} minH='120px' width='75%' templateRows='repeat(2, 1fr)'
                templateColumns='repeat(3, 1fr)' gap={4}>
                <GridItem className='feed-username-container' borderRadius='10px'
                  rowSpan={2} colSpan={1} bg='tomato' fontWeight='700' >
                  <AspectRatio>
                    <Image borderRadius='10px' src={post.user.image} />
                  </AspectRatio>
                  <Flex justifyContent='space-between' alignItems='center'>
                    <div className='feed-username'>{post.user.username}</div>
                    <br /><span>{postCreated(post.created_date)}</span>
                  </Flex>
                </GridItem>
                <GridItem className='post-text-container' borderRadius='10px' colSpan={2} bg='papayawhip'>
                  <div className='post-text-header'>{post.user.username} completed a task!</div>
                  <div className='post-task'>{post.category}</div>
                </GridItem>
                <GridItem className='post-text-container' borderRadius='10px' colSpan={2} bg='tomato'>
                  <div className='post-text-header'>Here's what they did:</div>
                  <div className='post-text'>{post.content}</div></GridItem>
              </Grid>
              <Flex width='40%' >
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