/*******Action Types*******/
export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const SET_FEED = 'SET_FEED';


/********Action Creators*******/
const setUser = user => ({ type: SET_USER, payload: user });
const removeUser = user => ({ type: REMOVE_USER, payload: user })
const setFeed = posts => ({type: SET_FEED, payload: posts})


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
  //Make a note of this, No content headers when doing a request with a file!
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
