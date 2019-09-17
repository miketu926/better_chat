import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGNIN = "RECEIVE_USER_SIGNIN";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";

const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

const receiveUserSignIn = () => ({
  type: RECEIVE_USER_SIGNIN
})

const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
})

const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
})

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken')
  APIUtil.setAuthToken(false)
  dispatch(logoutUser())
};

export const login = (user) => dispatch => {
  return APIUtil.login(user)
    .then(() => dispatch(receiveUserSignIn()))
    .catch((err) => dispatch(receiveErrors(err.response.data)))
}