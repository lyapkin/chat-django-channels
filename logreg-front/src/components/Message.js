import React from 'react'

import useAuth from '../hooks/useAuth'

import '../styles/Message.css'

import {formatTime} from '../utils/dateTime'

const Message = ({ data }) => {
    const {auth} = useAuth()
    const messageTime = formatTime(new Date(Date.parse(data.sentTime)))
    
    return (
        <div className={`message ${auth.user.id === data.sentBy ? 'my-message' : 'other-message'}`}>
            <p className='message__content'>{data.content}</p>
            <p className='message__time'>{messageTime}</p>
        </div>
    )
}

export default Message