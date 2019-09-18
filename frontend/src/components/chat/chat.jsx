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

  const chatsFromStore = useSelector(({ messages }) => {
    return messages.all;
  });

  if (chatsFromStore.length === 0) {
    return (
      <div>loading...</div>
    )
  }

  const chats = chatsFromStore.map(message => {
    return <MessageItem
      key={message._id}
      message={message.message}
      user={message.user}
      date={message.date}
    />
  })

  return (
    <div>
      <div>
        THIS IS WHERE ALL THE CHATS SHOW UP. THEN A FORM TO SUBMIT CHAT.
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