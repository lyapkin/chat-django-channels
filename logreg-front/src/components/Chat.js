import React from 'react'

import LeftWindow from './LeftWindow';
import RightWindow from './RightWindow';

import { LastClickedConnectionProvider } from '../context/LastClickedConnectionContext';

import '../styles/Chat.css'

const Chat = () => {
    
    return (
        <div className='chat'>
            <LastClickedConnectionProvider >
                <LeftWindow />
                <RightWindow />
            </LastClickedConnectionProvider>
        </div>
    )
}

export default Chat