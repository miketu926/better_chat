import {
  RECEIVE_MESSAGES,
  CLEAR_MESSAGES,
  SEND_MESSAGE,
  RECEIVE_ERRORS
} from '../actions/message_actions'

export default function (prevState = { all: [], errors: [] }, action) {
  Object.freeze(prevState);
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    case RECEIVE_MESSAGES:
      newState.all = [...action.messages];
      return newState;
    case SEND_MESSAGE:
      newState.all = [...newState.all, action.message];
      return newState;
    case RECEIVE_ERRORS:
      newState.all = prevState.all;
      newState.errors = [action.errors.errors];
      return newState;
    case CLEAR_MESSAGES:
      newState.all = [];
      return newState;
    default:
      return prevState;
  }
}