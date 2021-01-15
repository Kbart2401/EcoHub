import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GoComment } from 'react-icons/go';
import { Input, Box } from '@chakra-ui/react';
import * as sessionActions from '../../store/actions/session';


const Comments = ({ post }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  // const comments = useSelector(state.session.)

  // let generateComments
  // useEffect(() => {
  //   generateComments = postComments(post)
  // },[])

  const handleCommentSubmit = (postId) => (e) => {
    e.preventDefault();
    dispatch(sessionActions.addComment(comment, postId))
    // setComment('')
  }

  function postComments(post) {
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
      <Box>{postComments(post)}</Box>
      <Box>
        <form onSubmit={handleCommentSubmit(post.id)}>
          <Input type='text' name='comment' placeholder='Enter a comment'
            onChange={e => setComment(e.target.value)} />
        </form>
        <GoComment /></Box>
    </>
  )
}

export default Comments