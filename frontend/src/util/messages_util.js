import axios from 'axios';

export const fetchMessages = () => {
  return axios.get('/chat/messages');
}

export const postMessage = (message) => {
  return axios.post('/chat/sendMessage', message)
}