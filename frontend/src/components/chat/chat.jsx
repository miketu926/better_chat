import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { logout } from '../../actions/session_actions';

const Chat = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

  }

  return (
    <div>
      <div>
        THIS IS WHERE ALL THE CHATS SHOW UP. THEN A FORM TO SUBMIT CHAT.
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