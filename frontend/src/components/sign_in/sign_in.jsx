import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { login } from '../../actions/session_actions';

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSignIn = (e) => {
    e.preventDefault();
    login({ username, password })(dispatch)
  }

  return (
    <div>
      <form onSubmit={e => handleSignIn(e)}>
        <input type="text" placeholder="Enter Username" value={username} onChange={e => setUsername(e.currentTarget.value)} />
        <input type="text" placeholder="Enter Password" value={password} onChange={e => setPassword(e.currentTarget.value)} />
        <button type="submit" onClick={e => handleSignIn(e)}>Login</button>
      </form>
    </div>
  )
}

export default withRouter(SignIn);