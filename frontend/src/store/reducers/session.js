import {
  SET_USER, REMOVE_USER, SET_FEED,
  SET_COMMENT, SET_POST, REMOVE_COMMENT, SET_FRIEND,
  SET_FRIENDREQS, REMOVE_FRIENDREQ
} from '../actions/session'

const inititalState = { user: {}, posts: [] };
const sessionReducer = (state = inititalState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({ ...state }, { user: action.payload })
      return newState;

    case REMOVE_USER:
      newState = Object.assign({ ...state }, { user: { friends: [] }, posts: [] })
      return newState;

    case SET_FEED:
      newState = Object.assign({ ...state }, { ...action.payload })
      return newState;

    case SET_POST:
      newState = Object.assign({ ...state }, { posts: [action.payload, ...state.posts] })
      return newState;

    case SET_COMMENT:
      newState = { ...state }
      for (let i = 0; i < state.posts.length; i++) {
        if (state.posts[i].id === action.payload.post_id) {
          newState.posts[i].comments = [...newState.posts[i].comments, action.payload]
        }
      }
      return newState;

    case REMOVE_COMMENT:
      newState = { ...state }
      for (let i = 0; i < state.posts.length; i++) {
        if (state.posts[i].id === action.postId) {
          for (let j = 0; j < state.posts[i].comments.length; j++) {
            let comment = state.posts[i].comments[j]
            if (comment.id === action.payload.id) {
              newState.posts[i].comments.splice(j, 1)
            }
          }
        }
      }
      return newState;

    case SET_FRIEND:
      newState = { ...state }
      newState.user.friends = [...newState.user.friends, action.payload]
      return newState;

    case SET_FRIENDREQS:
      newState = Object.assign({ ...state }, { ...action.payload })
      return newState;

    case REMOVE_FRIENDREQ:
      newState = { ...state }
      for (let i = 0; i < newState.friendsWaiting.length; i++) {
        if (newState.friendsWaiting[i][0].id === action.id) {
          newState.friendsWaiting.splice(i, 1)
        }
      }
      return newState;

    default:
      return state;
  }
}

export default sessionReducer