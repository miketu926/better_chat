import * as APIUtil from '../util/users_util';

export const RECEIVE_USERS = "RECEIVE_USERS";
export const CLEAR_USERS = "CLEAR_USERS";

const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users
})

export const clearUsers = () => ({
  type: CLEAR_USERS
})

export const getUsers = () => dispatch => {
  return APIUtil.fetchUsers()
    .then(res => {
      dispatch(receiveUsers(res.data))
    })
}