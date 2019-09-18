import { RECEIVE_USERS, CLEAR_USERS } from '../actions/user_actions'

export default function (prevState = { all: {} }, action) {
  Object.freeze(prevState);
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    case RECEIVE_USERS:
      newState.all = action.users;
      return newState;
    case CLEAR_USERS:
      newState.all = {}
      return newState;
    default:
      return prevState;
  }
}