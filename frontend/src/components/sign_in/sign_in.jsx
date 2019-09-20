import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { login } from '../../actions/session_actions';
import './sign_in_styles.css'

const SignIn = () => {
  const dispatch = useDispatch();

  const handleSignIn = (e, defaultUser = true) => {
    e.preventDefault();
    defaultUser ?
      login(
        {
          username: "better",
          password: "better"
        }
      )(dispatch)
      :
      login(
        {
          username: "ConanOBrien",
          password: "better"
        }
      )(dispatch)
  };

  return (
    <div className='background'>
      <form onSubmit={e => handleSignIn(e)} className='sign-in-form'>
        <strong className='form-title'>WELCOME!</strong>
        <div className='center-box'>
          <button type="submit"
            onClick={e => handleSignIn(e)}
            className='login-button'>continue</button>

          <button type="submit"
            onClick={e => handleSignIn(e, false)}
            className='login-button'>Conan</button>
        </div>
      </form>
    </div>
  )
}

export default withRouter(SignIn);