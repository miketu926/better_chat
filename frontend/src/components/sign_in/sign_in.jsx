import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { login } from '../../actions/session_actions';
import './sign_in_styles.css'

const SignIn = () => {
  const dispatch = useDispatch();

  const handleSignIn = (e) => {
    e.preventDefault();
    login(
      {
        username: "better",
        password: "better"
      }
    )(dispatch);
  };

  return (
    <div className='background'>
      <form onSubmit={e => handleSignIn(e)} className='sign-in-form'>
        <strong className='form-title'>BETTER CHAT</strong>
        <div className='center-box'>
          <button type="submit"
            onClick={e => handleSignIn(e)}
            className='login-button'>continue</button>
        </div>
      </form>
    </div>
  )
}

export default withRouter(SignIn);