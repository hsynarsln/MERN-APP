import * as api from '../api';
import { AUTH } from './actionTypes';

export const signinAction = data => ({ type: AUTH, payload: data });

export const signupAction = data => ({ type: AUTH, payload: data });

export const signin = (values, navigate) => {
  return async dispatch => {
    try {
      const { data } = await api.signIn(values);

      dispatch(signinAction(data));

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
};

export const signup = (values, navigate) => {
  console.log(values);
  return async dispatch => {
    try {
      const { data } = await api.signUp(values);

      dispatch(signupAction(data));

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
};
