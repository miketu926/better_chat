import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import mary from '../../images/marymeeker.jpg'
import conan from '../../images/ConanOBrien.jpg'
import bara from '../../images/baratunde.jpg'
import { ReactComponent as Better } from '../../images/better-icon.svg';
import { ReactComponent as Calendar } from '../../images/calendar-icon.svg';
import { parseDate, parseElapsedTime } from '../../util/parse'
import './message_item_styles.css'

const MessageItem = ({ message, userId, username, real_name, date }) => {
  const [avatar, setAvatar] = useState()
  const currentUser = useSelector(({ session }) => {
    return session.user.id
  })
  const isCurrentUser = userId === currentUser
  const messageDiv = useRef(null);
  const dateDiv = useRef(null);
  const parentDiv = useRef(null);

  useEffect(() => {
    parseElapsedTime(date);

    if (username === 'marymeeker') {
      setAvatar(<img alt='' src={mary} className='avatar' />)
    } else if (username === 'ConanOBrien') {
      setAvatar(<img alt='' src={conan} className='avatar' />)
    } else if (username === 'baratunde') {
      setAvatar(<img alt='' src={bara} className='avatar' />)
    } else if (username === 'better') {
      setAvatar(<Better viewBox='-85 -85 350 350' className='avatar better-avatar' />)
    }

    if (messageDiv.current) {
      let height = isCurrentUser ?
        messageDiv.current.offsetHeight - 40 : messageDiv.current.offsetHeight - 25
      parentDiv.current.style.marginBottom = `${height}px`
      dateDiv.current.style.height = `${messageDiv.current.offsetHeight}px`;
    }

  }, [messageDiv.current, dateDiv.current])

  return !isCurrentUser ?
    <div className='parent-message-box-L' ref={parentDiv}>
      <div>{avatar}</div>
      <div className='message-box-L'>
        <div className='message-details-L'>
          <div className='user-details'>{real_name + ` - @` + username}</div>
          <div className='user-details'>{parseElapsedTime(date)}</div>
        </div>
        <div className='flip-container'>
          <div className='card'>
            <div className='front-L' ref={messageDiv}>
              <div className='user-message-L'>{message}</div>
            </div>
            <div className='back'>
              <div className='user-date-L' ref={dateDiv}>
                <Calendar className='calendar' />
                {`active since ` + parseDate(date)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    :
    <div className='parent-message-box-R' ref={parentDiv}>
      <div className='message-box-R'>
        <div className='user-details'>{parseElapsedTime(date)}</div>
        <div className='flip-container'>
          <div className='card' ref={messageDiv}>
            <div className='front-R'>
              <div className='user-message-R'>{message}</div>
            </div>
            <div className='back'>
              <div className='user-date-R' ref={dateDiv}>
                <Calendar className='calendar' />
                {`active since ` + parseDate(date)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>{avatar}</div>
    </div>
}

export default MessageItem