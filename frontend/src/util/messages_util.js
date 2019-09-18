import axios from 'axios';

export const fetchMessages = () => {
  let messages = axios.get('/chat/messages');
  return messages;
}