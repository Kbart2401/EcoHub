/*******Action Types*******/
export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const SET_FEED = 'SET_FEED';
export const SET_COMMENT = 'SET_COMMENT';
export const SET_POST = 'SET_POST';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';


/********Action Creators*******/
const setUser = user => ({ type: SET_USER, payload: user });
const removeUser = user => ({ type: REMOVE_USER, payload: user })
const setFeed = posts => ({type: SET_FEED, payload: posts})
const setComment = comment => ({type: SET_COMMENT, payload: comment})
const setPost = post => ({type: SET_POST, payload: post})
const removeComment = (comment, postId) => ({type: REMOVE_COMMENT, payload: comment, postId})

/********Thunks*******/
export const logUserIn = (username, password) => async dispatch => {
    let res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    if(res.ok) {
    const user = await res.json()
    dispatch(setUser(user))
    }
    else {
      res = await res.json()
      throw res;
    }
  return res
}

export const logUserOut = () => async dispatch => {
  try {
    const res = await fetch("/api/auth/logout", {
      headers: {
        "Content-Type": "application/json",
      }
    });
    const user = await res.json()
    dispatch(removeUser(user))
  } catch (e) {
    console.error(e)
  }
};

export const restoreUser = () => async (dispatch) => {
    const res = await fetch('/api/auth/')
    const user = await res.json();
    if (user.errors) user = null;
    const result = await fetch('/api/posts/')
    const posts = await result.json()
    dispatch(setUser(user))
    dispatch(setFeed(posts))
}
  
export const signUserUp = (payload) =>
  async dispatch => {
      let res = await fetch("/api/auth/signup", {
        method: "POST",
        body: payload,
      });
    if (res.ok) {
      const user = await res.json()
      dispatch(setUser(user))
    }
    else {
      res = await res.json()
      throw res;
    }
    return res
  }

export const addPost = (category, content) => async (dispatch) => {
  const res = await fetch('api/posts/', {
    headers: {
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      category, content
    })
  })
  const data = await res.json()
  dispatch(setPost(data))
}

export const addComment = (content, post_id) => async (dispatch) => {
    let res = await fetch('/api/comments/', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        content, post_id
      })
    })
    if (res.ok) {
      const comment = await res.json()
      dispatch(setComment(comment))
    }
    else {
      res = await res.json()
      throw res;
    }
    return res
}

export const deleteComment = (comment, postId) => async (dispatch) => {
  const res = await fetch('api/comments/', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
    body: JSON.stringify({
      id: comment.id
    })
  })
  dispatch(removeComment(comment, postId))
}
