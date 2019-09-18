import { RECEIVE_MESSAGES } from '../actions/message_actions'
import { CLEAR_MESSAGES } from '../actions/message_actions'

export default function (prevState = { all: [] }, action) {
  Object.freeze(prevState);
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    case RECEIVE_MESSAGES:
      newState.all = [...action.messages];
      return newState;
    case CLEAR_MESSAGES:
      newState.all = [];
      return newState;
    default:
      return prevState;
  }
}