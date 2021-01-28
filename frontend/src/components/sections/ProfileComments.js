import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Box, Button, Flex } from '@chakra-ui/react';
import * as sessionActions from '../../store/actions/session';
import '../../stylesheets/comments.css';


const ProfileComments = ({ post, user }) => {
  const dispatch = useDispatch()
  //even though comments isn't used, needed for component re-render, the comments in post are nested too deep
  const reduxComments = useSelector(state => state.session.posts.map(post => post.comments))
  const currentUser = useSelector(state => state.session.user)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])


  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(`api/comments/${post.id}`)
      const data = await res.json()
      setComments([...data.comments])
    }
    getComments()
  }, [])


  const handleCommentSubmit = (postId) => (e) => {
    e.preventDefault();
    dispatch(sessionActions.addComment(comment, postId))
    setComment('')
  }

  const handleClick = (comment) => (e) => {
    dispatch(sessionActions.deleteComment(comment, post.id))
  }

  function postComments() {
    if (comments) {
      return (
        comments.map((comment, idx) => {
          return (
            <>
              <Box className='comment-container' borderRadius='5px' marginTop='10px' key={idx} bg='#E2E8F0'>
                <div className='comment-text'>{comment.content}
                  {currentUser?.id === comment.user_id &&
                    <Button alignSelf='flex-end' size='xs' type='button' onClick={handleClick(comment)}>Delete</Button>
                  }
                </div>
                <div className='comment-username'>{user.username}</div>
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

export default ProfileComments