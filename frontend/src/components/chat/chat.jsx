import './chat_styles2.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages, clearMessages } from '../../actions/message_actions';
import { getUsers, clearUsers } from '../../actions/user_actions';
import { withRouter } from 'react-router';
import { logout } from '../../actions/session_actions';
import MessageItem from '../message/message_item';

const Chat = () => {
  const [message, setMessage] = useState("");
  const [length, setLength] = useState(140);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    //handle submission
  }

  useEffect(() => {
    getUsers()(dispatch);
    getMessages()(dispatch);

    if (message.length >= 0) {
      setLength(140 - message.length);
    }

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
      <div className='bg'></div>
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
    <div className='bg'>
      <div className='chat-box'>
        {chats}
      </div>
      <form onSubmit={e => handleSubmit(e)}
        className='message-form'
      >
        <div>{length}</div>
        <input type='text'
          value={message}
          placeholder="what's happening?"
          onChange={e => setMessage(e.currentTarget.value)}
          className='input-box'
        />
        <i onClick={e => handleSubmit(e)}
          class="material-icons">send</i>
      </form>

      <div className='button-placement'>
        <button onClick={() => logout()(dispatch)}
          className='logout-button'>
          leave chat
          </button>
      </div>
    </div>
  )
}




export default withRouter(Chat);