import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages } from '../../actions/message_actions';
import { getUsers } from '../../actions/user_actions';
import { withRouter } from 'react-router';

import Chat from '../../components/chat/chat'

const Loading = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers()(dispatch);
    getMessages()(dispatch);
  }, []);

  const chatsFromStore = useSelector(({ messages }) => {
    return messages.all;
  })

  if (loaded) {
    return <Chat chatsFromStore={chatsFromStore} />
  } else {
    return <div>Loading...</div>
  }

}

export default withRouter(Loading);