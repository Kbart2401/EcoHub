import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Grid, GridItem, VStack, StackDivider,
  Image, Flex, AspectRatio
} from '@chakra-ui/react';
import ProfileComments from './ProfileComments';
import '../../stylesheets/feed.css';

const ProfileFeed = ({ user, posts }) => {

  const postCreated = (createdDate) => {
    return createdDate.slice(4, 16)
  }

  return (
    <>
      <VStack className='feed-outer' divider={<StackDivider borderColor='gray.200' />}>
        <div className='feed-caps'>Recent Activity</div>
        {!posts?.length &&
          <div className='empty-feed'>Nothing to show here....yet 😏</div>}
        {posts?.map((post, idx) => {
          return (
            <>
              <Grid key={idx} minH='120px' width='75%' templateRows='repeat(2, 1fr)'
                templateColumns='repeat(3, 1fr)' gap={4}>
                <GridItem className='feed-username-container' borderRadius='10px'
                  rowSpan={2} colSpan={1} bg={post.category[post.category.length - 1] === '*' ? '#38A169' : 'tomato'} fontWeight='700' >
                  <AspectRatio>
                    <Image borderRadius='10px' src={user.image} />
                  </AspectRatio>
                  <Flex justifyContent='space-between' alignItems='center'>
                    <div className='feed-username'>{user.username}</div>
                    <br /><span>{postCreated(post.created_date)}</span>
                  </Flex>
                </GridItem>
                <GridItem className='post-text-container' borderRadius='10px' colSpan={2} bg='papayawhip'>
                  <div className='post-text-header'>{user.username}&nbsp;
                    {post.category[post.category.length - 1] === '*' ? 'reported an issue!' : 'completed a task!'}</div>
                  <div className='post-task'>{post.category}</div>
                </GridItem>
                <GridItem className='post-text-container' borderRadius='10px' colSpan={2}
                  bg={post.category[post.category.length - 1] === '*' ? '#38A169' : 'tomato'}>
                  <div className='post-text-header'>Here's what they said:</div>
                  <div className='post-text'>{post.content}</div></GridItem>
              </Grid>
              <Flex width='40%' >
                <ProfileComments post={post} user={user} />
              </Flex>
            </>
          )
        })
        }
      </VStack>
    </>
  )
}

export default ProfileFeed