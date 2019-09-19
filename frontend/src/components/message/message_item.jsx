import React, { useState } from 'react';

const MessageItem = ({ message, username, real_name, date }) => {
  const [showDate, setShowDate] = useState(false);

  return (showDate ?
    <div>
      {date}
    </div>
    :
    <div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      {real_name}
      {username}
      {message}
    </div>
  )
}

export default MessageItem