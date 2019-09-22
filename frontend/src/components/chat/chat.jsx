import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMessages,
  clearMessages,
  postMessage,
  clearErrors
} from '../../actions/message_actions';
import { getUsers, clearUsers } from '../../actions/user_actions';
import { withRouter } from 'react-router';
import { logout } from '../../actions/session_actions';
import MessageItem from '../message/message_item';
import Swal from 'sweetalert2';
import './chat_styles2.css';

const Chat = () => {
  const [message, setMessage] = useState("");
  const [length, setLength] = useState(140);

  const dispatch = useDispatch();
  const chatBox = useRef(null);

  const updateScroll = (chatBox) => {
    if (chatBox.current) {
      chatBox.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    getUsers()(dispatch);
    getMessages()(dispatch).then(res => {
      updateScroll(chatBox);
    })

    return () => {
      dispatch(clearMessages());
      dispatch(clearUsers());
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    postMessage(message)(dispatch).then(res => {
      updateScroll(chatBox)
    })
    setMessage("");
    setLength(140);
  }

  const handleTyping = (e) => {
    e.preventDefault();
    setMessage(e.currentTarget.value);
    setLength(140 - e.currentTarget.value.length)
  }

  const allMessages = useSelector(({ messages }) => {
    return messages.all;
  });

  const allUsers = useSelector(({ users }) => {
    return users.all;
  });

  const errorMessage = useSelector(({ messages }) => {
    return messages.errors;
  })

  if (allMessages.length === 0 || allUsers.length === 0) {
    return (
      <div className='bg'></div>
    )
  }

  if (errorMessage.length > 0) {
    Swal.fire({
      type: 'error',
      title: 'Chat',
      text: 'Please enter a message!'
    });

    dispatch(clearErrors());
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
      if (!message) return;
      let username = usersHashMap[message.user].username;
      let real_name = usersHashMap[message.user].real_name;

      return <MessageItem
        key={message._id}
        userId={message.user}
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
      <div className='chat-box' id='scroll'>
        {chats}
        <div ref={chatBox}></div>
      </div>
      <form onSubmit={e => handleSubmit(e)}
        className='message-form'
      >
        <div>{length}</div>
        <input type='text'
          value={message}
          maxLength='140'
          placeholder="what's happening?"
          onChange={e => handleTyping(e)}
          className='input-box'
        />
        <i onClick={e => handleSubmit(e)}
          className="material-icons">send</i>
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