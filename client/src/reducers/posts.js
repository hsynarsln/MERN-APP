import { CREATE_POST, DELETE_POST, FETCH_ALL_POSTS, LIKE_POST, UPDATE_POST } from '../actions/actionTypes';

const initialState = {
  posts: []
};

const postReducer = (state = initialState.posts, action) => {
  switch (action.type) {
    case CREATE_POST:
      return [...state, action.payload];
    case FETCH_ALL_POSTS:
      return action.payload;
    case UPDATE_POST:
      return state.map(post => (post._id === action.payload._id ? action.payload : post));
    case LIKE_POST:
      return state.map(post => (post._id === action.payload._id ? action.payload : post));
    case DELETE_POST:
      return state.filter(post => post._id !== action.payload);
    default:
      return state;
  }
};

export default postReducer;
