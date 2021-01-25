import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoComment } from 'react-icons/go';
import { Input, Box, Button, Flex } from '@chakra-ui/react';
import * as sessionActions from '../../store/actions/session';
import '../../stylesheets/comments.css';


const Comments = ({ post }) => {
  const dispatch = useDispatch()
  //even though comments isn't used, needed for component re-render, the comments in post are nested too deep
  const comments = useSelector(state => state.session.posts.map(post => post.comments))
  const user = useSelector(state => state.session.user)
  const [comment, setComment] = useState('')


  const handleCommentSubmit = (postId) => (e) => {
    e.preventDefault();
    dispatch(sessionActions.addComment(comment, postId))
    setComment('')
  }

  const handleClick = (comment) => (e) => {
    dispatch(sessionActions.deleteComment(comment, post.id))
  }

  function postComments() {
    if (post.comments) {
      return (
        post.comments.map((comment, idx) => {
          return (
            <>
              <Box className='comment-container' borderRadius='5px' marginTop='10px' key={idx} bg='#E2E8F0'><div className='comment-text'>{comment.content}
                {user?.id === comment.user.id &&
                  <Button alignSelf='flex-end' size='xs' type='button' onClick={handleClick(comment)}>Delete</Button>
                }
              </div>
                <div className='comment-username'>{comment.user.username}</div>
              </Box>

            </>)
        })
      )
    }
  }

  return (
    <>
      <Flex flexDirection='column' width='100%'>
        <Box>{postComments()}</Box>
        <Box>
          <form onSubmit={handleCommentSubmit(post.id)}>
            <Input marginTop='10px' type='text' name='comment' placeholder='Leave a comment!'
              value={comment} onChange={e => setComment(e.target.value)} />
          </form>
        </Box>
      </Flex>
    </>
  )
}

export default Comments