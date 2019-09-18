import axios from 'axios';

export const fetchMessages = () => {
  let messages = axios.get('/api/chat/messages');
  return messages;
}