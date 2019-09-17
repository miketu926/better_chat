import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/session_actions';

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSignIn = (e) => {
    e.preventDefault();
    login({ username, password })(dispatch);
  }

  return (
    <form onSubmit={e => handleSignIn(e)}>
      <input type="text" placeholder="Enter Username" value={username} onChange={e => setUsername(e.currentTarget.value)} />
      <input type="text" placeholder="Enter Password" value={password} onChange={e => setPassword(e.currentTarget.value)} />
      <button type="submit">Login</button>
    </form>
  )

}

export default SignIn