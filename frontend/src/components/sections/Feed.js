import React from 'react';
import { useSelector } from 'react-redux';
import { Box, VStack, StackDivider } from '@chakra-ui/react';


const Feed = () => {
  const posts = useSelector(state => state.session.posts)

  const comments = post => {
    if (post.comments) {
      return (
        post.comments.map((comment, idx) => {
          return <div key={idx}>{comment.content}
            &nbsp; {comment.user.username}</div>
        }))
    }
  }

  return (
    <>
      <VStack divider={<StackDivider borderColor='gray.200' />}>
        <div>Feed</div>
        {posts && posts.map((post, idx) => {
          return (
            <Box minHeight='40px' w='60%' align='center'>
              <div key={idx}>{post.user.username} <br /> {post.created_date} <br />
              Category: {post.category} {post.content}  </div>
              <div>{comments(post)}</div>
            </Box>
          )
        })
        }
      </VStack>
    </>
  )
}

export default Feed