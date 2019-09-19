import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './message_item_styles.css'

const MessageItem = ({ message, userId, username, real_name, date }) => {
  const [showDate, setShowDate] = useState(false);

  const currentUser = useSelector(({ session }) => {
    return session.user.id
  })

  const isCurrentUser = userId === currentUser;

  if (isCurrentUser) {
    return (showDate ?
      <div className='parent-messsage-box-R'>
        <div className='message-box-R'>
          <div className='message-details-R'>
            <div className='user-details-time'>time ago</div>
          </div>
          <div onClick={() => setShowDate(!showDate)}
            className='user-date-R'>{date}
          </div>
        </div>
        <div>
          <div>picture</div>
        </div>
      </div>
      :
      <div className='parent-messsage-box-R'>
        <div className='message-box-R'>
          <div className='message-details-R'>
            <div className='user-details-time'>time ago</div>
          </div>
          <div onClick={() => setShowDate(!showDate)}
            className='user-message-R'>{message}
          </div>
        </div>
        <div>
          <div>picture</div>
        </div>
      </div>
    )
  } else {
    return (showDate ?
      <div className='parent-messsage-box-L'>
        <div>
          <div>picture</div>
        </div>
        <div className='message-box-L'>
          <div className='message-details-L'>
            <div className='user-details'>{real_name + ` - @` + username}</div>
            <div className='user-details-time'>time ago</div>
          </div>
          <div onClick={() => setShowDate(!showDate)}
            className='user-date-L'>{date}
          </div>
        </div>
      </div>
      :
      <div className='parent-messsage-box-L'>
        <div>
          <div>picture</div>
        </div>
        <div className='message-box-L'>
          <div className='message-details-L'>
            <div className='user-details'>{real_name + ` - @` + username}</div>
            <div className='user-details-time'>time ago</div>
          </div>
          <div onClick={() => setShowDate(!showDate)}
            className='user-message-L'>{message}
          </div>
        </div>
      </div>
    )
  }
}

export default MessageItem