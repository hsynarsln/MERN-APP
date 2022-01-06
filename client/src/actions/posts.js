import * as api from '../api';
import * as actionTypes from './actionTypes';

//! post çağırma
export const getPostsSuccess = payload => {
  return {
    type: actionTypes.FETCH_ALL_POSTS,
    payload: payload
  };
};

//! post EKLEME
export const createPostSuccess = post => ({
  type: actionTypes.CREATE_POST,
  payload: post
});

//! update
export const updatePostSuccess = post => ({
  type: actionTypes.UPDATE_POST,
  payload: post
});

//! like
export const likePostSuccess = id => ({
  type: actionTypes.LIKE_POST,
  payload: id
});

//! delete
export const deletePostSuccess = id => ({
  type: actionTypes.DELETE_POST,
  payload: id
});

export const getPosts = () => {
  return async dispatch => {
    try {
      const { data } = await api.fetchPosts();

      dispatch(getPostsSuccess(data));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const createPost = post => {
  return async dispatch => {
    try {
      const { data } = await api.createPost(post);

      dispatch(createPostSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updatePost = (id, post) => {
  return async dispatch => {
    try {
      const { data } = await api.updatePost(id, post);

      dispatch(updatePostSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deletePost = id => {
  return async dispatch => {
    try {
      await api.deletePost(id);

      dispatch(deletePostSuccess(id));
    } catch (error) {
      console.log(error);
    }
  };
};

export const likePost = id => {
  return async dispatch => {
    try {
      const { data } = await api.likePost(id);

      dispatch(likePostSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };
};
