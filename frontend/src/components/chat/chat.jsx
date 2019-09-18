import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages, clearMessages } from '../../actions/message_actions';
import { getUsers, clearUsers } from '../../actions/user_actions';
import { withRouter } from 'react-router';
import { logout } from '../../actions/session_actions';

import MessageItem from '../message/message_item';

const Chat = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    getUsers()(dispatch);
    getMessages()(dispatch);

    return () => {
      dispatch(clearMessages());
      dispatch(clearUsers());
    }
  }, []);

  const allMessages = useSelector(({ messages }) => {
    return messages.all;
  });

  const allUsers = useSelector(({ users }) => {
    return users.all;
  });

  if (allMessages.length === 0 || allUsers.length === 0) {
    return (
      <div>loading...</div>
    )
  }

  const getChat = (allUsers, allMessages) => {
    const usersHashMap = {}

    allUsers.forEach(user => {
      usersHashMap[user._id] = {
        username: user.username,
        real_name: user.real_name
      }
    })

    return allMessages.map(message => {
      let username = usersHashMap[message.user].username;
      let real_name = usersHashMap[message.user].real_name;

      return <MessageItem
        key={message._id}
        message={message.message}
        username={username}
        real_name={real_name}
        date={message.date}
      />
    })
  }

  const chats = getChat(allUsers, allMessages);

  return (
    <div>
      <div>
        {chats}
      </div>
      <form onSubmit={e => handleSubmit(e)}>
        <input type='text'
          value={message}
          onChange={e => setMessage(e.currentTarget.value)}>
        </input>
        <button type="submit" onClick={e => handleSubmit(e)}>Send Arrow -></button>
      </form>
      <button onClick={() => logout()(dispatch)}>Logout</button>
    </div>
  )
}




export default withRouter(Chat);