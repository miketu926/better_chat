import * as APIUtil from '../util/messages_util';

export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";
export const CLEAR_MESSAGES = "CLEAR_MESSAGES";
export const SEND_MESSAGE = "SEND_MESSAGE";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

const receiveMessages = (messages) => ({
  type: RECEIVE_MESSAGES,
  messages
})

const sendMessage = (message) => ({
  type: SEND_MESSAGE,
  message
})

const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
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

export const postMessage = (message) => dispatch => {
  return APIUtil.postMessage(message)
    .then(res => {
      dispatch(sendMessage(res.data))
    }).catch(err => {
      dispatch(receiveErrors(err.response.data));
    })
}