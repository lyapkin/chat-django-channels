import React from 'react'

import Messages from './Messages'
import MessageInput from './MessageInput'

import './styles/RightWindowBody.css'

const RightWindowBody = () => {
    return (
        <div className='right-window__body'>
            <Messages />
            <MessageInput />
        </div>
    )
}

export default RightWindowBody