import * as APIUtil from '../util/messages_util';

export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";
export const CLEAR_MESSAGES = "CLEAR_MESSAGES";

const receiveMessages = (messages) => ({
  type: RECEIVE_MESSAGES,
  messages
})

export const clearMessages = () => ({
  type: CLEAR_MESSAGES
})

export const getMessages = () => dispatch => {
  return APIUtil.fetchMessages()
    .then(res => {
      dispatch(receiveMessages(res.data))
    })
}