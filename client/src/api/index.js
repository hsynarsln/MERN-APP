import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

//! interceptor olmadığı sürece auth middleware çalışmaz.
API.interceptors.request.use(req => {
  //! we have to send our token back to our backend so that our backend middleware can verify that we are actually logged in
  //? we are taking or we're manipulating an incoming request and we're adding our token an authorization
  //! token --> i want to store it somehow so that i can use attach it to future requests. we can add interceptors which are simply functions that will run on any outgoing HTTP requests and manipulate these outgoing requests, for example to attach our token
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPosts = () => API.get('/posts');

export const createPost = newPost => API.post('/posts', newPost);

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

export const deletePost = id => API.delete(`/posts/${id}`);

export const likePost = id => API.put(`/posts/${id}/likePost`);

export const signIn = values => API.post('/user/signin', values);

export const signUp = values => API.post('/user/signup', values);
