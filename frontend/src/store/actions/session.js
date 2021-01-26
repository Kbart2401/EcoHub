/*******Action Types*******/
export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const SET_FEED = 'SET_FEED';
export const SET_COMMENT = 'SET_COMMENT';
export const SET_POST = 'SET_POST';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const SET_FRIEND = 'SET_FRIEND';
export const SET_FRIENDREQS = 'SET_FRIENDREQS';
export const REMOVE_FRIENDREQ = 'REMOVE_FRIENDREQ';


/********Action Creators*******/
const setUser = user => ({ type: SET_USER, payload: user });
const removeUser = user => ({ type: REMOVE_USER, payload: user })
const setFeed = posts => ({ type: SET_FEED, payload: posts })
const setComment = comment => ({ type: SET_COMMENT, payload: comment })
const setPost = post => ({ type: SET_POST, payload: post })
const removeComment = (comment, postId) => ({ type: REMOVE_COMMENT, payload: comment, postId })
const setFriend = (friend) => ({ type: SET_FRIEND, payload: friend })
const setFriendReqs = (reqs) => ({ type: SET_FRIENDREQS, payload: reqs })
const removeFriendReq = (friend, id) => ({ type: REMOVE_FRIENDREQ, payload: friend, id })

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
  if (res.ok) {
    const user = await res.json()
    const result = await fetch('/api/posts/')
    const posts = await result.json()
    const r = await fetch('api/users/friend-requests')
    const friendReqs = await r.json()
    dispatch(setUser(user))
    dispatch(setFeed(posts))
    dispatch(setFriendReqs(friendReqs))
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
  const r = await fetch('api/users/friend-requests')
  const friendReqs = await r.json()
  dispatch(setUser(user))
  dispatch(setFeed(posts))
  dispatch(setFriendReqs(friendReqs))
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

export const updateUser = (payload) =>
  async dispatch => {
    let res = await fetch("/api/auth/signup", {
      method: "PATCH",
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

export const addFriend = (id, message) => async (dispatch) => {
  const res = await fetch('api/users/add', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      id, message
    })
  })
  const data = await res.json()
  dispatch(setFriend(data))
}

export const confirmFriend = (id) => async (dispatch) => {
  const res = await fetch('api/users/confirm', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ id })
  })
  const data = await res.json()
  dispatch(setFriend(data))
  dispatch(removeFriendReq(data, data.id))
}



