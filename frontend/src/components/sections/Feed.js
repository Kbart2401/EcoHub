import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, GridItem, VStack, StackDivider, Box, Flex } from '@chakra-ui/react';
import { GoComment } from 'react-icons/go'


const Feed = () => {
  const posts = useSelector(state => state.session.posts)

  const comments = post => {
    if (post.comments) {
      return (
        post.comments.map((comment, idx) => {
          return <Box key={idx} bg='#E2E8F0'>{comment.content}
            &nbsp; {comment.user.username}</Box>
        }))
    }
  }

  return (
    <>
      <VStack divider={<StackDivider borderColor='gray.200' />}>
        <div>Recent Activity</div>
        {posts && posts.map((post, idx) => {
          return (
            <>
              <Grid key={idx} maxH='120px' templateRows='repeat(2, 1fr)'
                templateColumns='repeat(3, 1fr)' gap={4}>
                <GridItem border='2px solid black' rowSpan={2} colSpan={1} bg='tomato' fontWeight='700'>{post.user.username} <br />{post.created_date} </GridItem>
                <GridItem colSpan={2} bg='papayawhip'>Category: {post.category}</GridItem>
                <GridItem colSpan={2} bg='tomato'>{post.content}</GridItem>
              </Grid>
              <Flex>
                <Box>{comments(post)}</Box>
                <Box><GoComment /></Box>
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