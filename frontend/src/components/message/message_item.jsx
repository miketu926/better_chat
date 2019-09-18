import React, { useState } from 'react';

const MessageItem = ({ message, user }) => {

  return (
    <div>
      {user}
      {message}
    </div>
  )

}

export default MessageItem