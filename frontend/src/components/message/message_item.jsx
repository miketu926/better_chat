import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import mary from '../../images/marymeeker.jpg'
import conan from '../../images/ConanOBrien.jpg'
import bara from '../../images/baratunde.jpg'
import { ReactComponent as Better } from '../../images/better-icon.svg';
import './message_item_styles.css'

const MessageItem = ({ message, userId, username, real_name, date }) => {
  const [showDate, setShowDate] = useState(false);
  const [avatar, setAvatar] = useState()

  useEffect(() => {
    if (username === 'marymeeker') {
      setAvatar(<img src={mary} className='avatar' />)
    } else if (username === 'ConanOBrien') {
      setAvatar(<img src={conan} className='avatar' />)
    } else if (username === 'baratunde') {
      setAvatar(<img src={bara} className='avatar' />)
    } else if (username === 'better') {
      setAvatar(<Better viewBox='-85 -85 350 350' className='avatar better-avatar' />)
    }
  }, [])

  const currentUser = useSelector(({ session }) => {
    return session.user.id
  })

  const isCurrentUser = userId === currentUser;

  if (isCurrentUser) {
    return (
      <div className='parent-message-box-R'>
        <div className='message-box-R'>
          <div className='message-details-R'>
            <div className='user-details-time'>time ago</div>
          </div>
          {
            showDate ?
              <div onClick={() => setShowDate(!showDate)}
                className='user-date-R'>{date}
              </div>
              :
              <div onClick={() => setShowDate(!showDate)}
                className='user-message-R'>{message}
              </div>
          }
        </div>
        <div>
          <div>{avatar}</div>
        </div>
      </div>
    )
  } else {
    return (
      <div className='parent-message-box-L'>
        <div>
          <div>{avatar}</div>
        </div>
        <div className='message-box-L'>
          <div className='message-details-L'>
            <div className='user-details'>{real_name + ` - @` + username}</div>
            <div className='user-details-time'>time ago</div>
          </div>
          {
            showDate ?
              <div onClick={() => setShowDate(!showDate)}
                className='user-date-L'>{date}
              </div>
              :
              <div onClick={() => setShowDate(!showDate)}
                className='user-message-L'>{message}
              </div>
          }
        </div>
      </div>
    )
  }
}

export default MessageItem