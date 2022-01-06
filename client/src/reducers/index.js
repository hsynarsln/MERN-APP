import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postReducer from './posts';

const rootReducer = combineReducers({
  postReducer,
  authReducer
});

export default rootReducer;
