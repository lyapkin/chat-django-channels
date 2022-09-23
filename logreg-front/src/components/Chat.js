import React from 'react'

import LeftWindow from './LeftWindow';
import RightWindow from './RightWindow';

import '../styles/Chat.css'

const Chat = () => {
    return (
        <div className='chat'>
            <LeftWindow />
            <RightWindow />
        </div>
    )
}

export default Chat