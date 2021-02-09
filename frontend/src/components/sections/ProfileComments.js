import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Box, Button, Flex } from '@chakra-ui/react';
import * as sessionActions from '../../store/actions/session';
import '../../stylesheets/comments.css';


const ProfileComments = ({ post, user }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.user)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [commentSubmit, setCommentSubmit] = useState(false)


  useEffect(() => {
    fetch(`api/comments/${post.id}`)
      .then(res => res.json())
      .then(data => setComments([...data.comments])
      )
}, [commentSubmit])

const handleCommentSubmit = (postId) => (e) => {
  e.preventDefault();
  dispatch(sessionActions.addComment(comment, postId))
    .then(() => setCommentSubmit(!commentSubmit))
  setComment('')
}

const handleClick = (comment) => (e) => {
  dispatch(sessionActions.deleteComment(comment, post.id))
    .then(() => setCommentSubmit(!commentSubmit))
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

export default ProfileComments