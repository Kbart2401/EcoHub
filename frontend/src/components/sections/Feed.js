import React from 'react';
import { useSelector } from 'react-redux';


const Feed = () => {
  const posts = useSelector(state => state.session.posts)

  return (
    <>
      <div>Feed</div>
      {posts && posts.map((post, idx) => {
        return <div key={idx}>{post.category} {post.content}</div>
      })
      }
    </>
  )
}

export default Feed