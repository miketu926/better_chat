import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import SignIn from './sign_in/sign_in';
import Chat from './chat/chat';

const App = () => {
  return (
    <div>
      <Switch>
        <AuthRoute exact path="/signin" component={SignIn} />
        <ProtectedRoute exact path="/chat" component={Chat} />
        <Redirect from="" to="/signin" />
        <Redirect from="/" to="/signin" />
      </Switch>
    </div>
  );
}

export default App;
