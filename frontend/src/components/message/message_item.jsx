import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import mary from '../../images/marymeeker.jpg'
import conan from '../../images/ConanOBrien.jpg'
import bara from '../../images/baratunde.jpg'
import { ReactComponent as Better } from '../../images/better-icon.svg';
import { ReactComponent as Calendar } from '../../images/calendar-icon.svg';
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

  const parseDate = (d) => {
    const split = d.split("T")[0].split("-");
    const [year, month, day] = split;
    const monthMap = {
      "01": "January", "02": "February", "03": "March",
      "04": "April", "05": "May", "06": "June",
      "07": "July", "08": "August", "09": "September",
      "10": "October", "11": "November", "12": "December",
    }

    return `${monthMap[month]} ${day}, ${year}`
  }

  const parseElapsedTime = (d) => {
    const split = d.split("T")[0].split("-");
    const [year, month, day] = split;

    let rightNow = new Date();


  }

  const isCurrentUser = userId === currentUser;

  return isCurrentUser ?
    <div className='parent-message-box-R'>
      <div className='message-box-R'>
        <div className='message-details-R'>
          <div className='user-details-time'>time ago</div>
        </div>
        {
          showDate ?
            <div onClick={() => setShowDate(!showDate)} className='date-main'>
              <div className='user-date-R'>
                {`active since ` + parseDate(date)}
              </div>
              <Calendar className='calendar' />
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
    :
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
            <div onClick={() => setShowDate(!showDate)} className='date-main'>
              <div className='user-date-L'>
                {`active since ` + parseDate(date)}
              </div>
              <Calendar className='calendar' />
            </div>
            :
            <div onClick={() => setShowDate(!showDate)}
              className='user-message-L'>{message}
            </div>
        }
      </div>
    </div>
}

export default MessageItem