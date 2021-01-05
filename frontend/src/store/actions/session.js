// Action Types
export const SET_USER = 'SET_USER';



// Action Creators
const setUser = user => ({type: SET_USER, payload: user});

//Thunks
export const restoreUser = () => async (dispatch) => {
  try {
    const res = await fetch('/api/auth/')
    const user = await res.json();
    dispatch(setUser(user))
    return user
  } catch (e) {
    console.error(e)
  }

}