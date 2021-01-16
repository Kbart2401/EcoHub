import {
  SET_USER, REMOVE_USER, SET_FEED,
  SET_COMMENT, SET_POST, REMOVE_COMMENT
} from '../actions/session'

const inititalState = { user: null };
const sessionReducer = (state = inititalState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({ ...state }, { user: action.payload })
      return newState;
    case REMOVE_USER:
      newState = Object.assign({ ...state }, { user: null })
      return newState;
    case SET_FEED:
      newState = Object.assign({ ...state }, { ...action.payload })
      return newState;
    case SET_POST:
      newState = Object.assign({...state}, {posts: [action.payload, ...state.posts]})
      return newState;
    case SET_COMMENT:
      for (let i = 0; i < state.posts.length; i++) {
        if (state.posts[i].id === action.payload.post_id) {
          newState = {...state}
          newState.posts[i].comments = [...newState.posts[i].comments, action.payload]
        }
      }
      return newState;
    case REMOVE_COMMENT:
      debugger
      for (let i = 0; i < state.posts.length; i++) {
          if (state.posts[i].id === action.postId) {
            for (let j = 0; j < state.posts[i].comments.length; j++) {
              let comment = state.posts[i].comments[j]
              if (comment.id === action.payload.id) {
                newState = {...state}
                newState.posts[i].comments.splice(j, 1)
              }
            }
          }
      }
      return newState;
    default:
      return state;
  }
}

export default sessionReducer