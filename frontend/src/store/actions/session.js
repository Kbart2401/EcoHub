/*******Action Types*******/
export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';


/********Action Creators*******/
const setUser = user => ({ type: SET_USER, payload: user });
const removeUser = user => ({ type: REMOVE_USER, payload: user })


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
  try {
    const res = await fetch('/api/auth/')
    const user = await res.json();
    dispatch(setUser(user))
  } catch (e) {
    console.error(e)
  }
}

export const signUserUp = (username, email, city, state, country, password) =>
  async dispatch => {
    debugger
      let res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          city,
          state,
          country,
          password,
        }),
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
