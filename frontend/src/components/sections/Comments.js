import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoComment } from 'react-icons/go';
import { Input, Box } from '@chakra-ui/react';
import * as sessionActions from '../../store/actions/session';


const Comments = ({ post }) => {
  const dispatch = useDispatch()
  //even though comments isn't used, needed for component re-render, the comments in post are nested too deep
  const comments = useSelector(state => state.session.posts.map(post => post.comments))
  const [comment, setComment] = useState('')


  const handleCommentSubmit = (postId) => (e) => {
    e.preventDefault();
    dispatch(sessionActions.addComment(comment, postId))
    setComment('')
  }

  function postComments() {
    if (post.comments) {
      return (
        post.comments.map((comment, idx) => {
          return <Box key={idx} bg='#E2E8F0'>{comment.content}
            &nbsp; {comment.user.username}</Box>
        })
      )
    }
  }

  return (
    <>
      <Box>{postComments()}</Box>
      <Box>
        <form onSubmit={handleCommentSubmit(post.id)}>
          <Input type='text' name='comment' placeholder='Enter a comment'
            value={comment}onChange={e => setComment(e.target.value)} />
        </form>
        <GoComment /></Box>
    </>
  )
}

export default Comments