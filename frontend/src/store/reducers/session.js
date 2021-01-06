import { SET_USER, REMOVE_USER } from '../actions/session'

const inititalState = { user: null };
const sessionReducer = (state = inititalState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({...state}, {user: action.payload})
      return newState;
    case REMOVE_USER:
      newState = Object.assign({...state}, {user: null})
      return newState;
    default:
      return state;
  }
}

export default sessionReducer