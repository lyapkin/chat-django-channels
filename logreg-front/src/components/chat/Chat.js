import React from 'react'

import LeftWindow from './leftWindow/LeftWindow';
import RightWindow from './rightWindow/RightWindow';

import { LastClickedConnectionProvider } from '../../context/LastClickedConnectionContext';

import './styles/Chat.css'
import '../buttons/styles/Button.css'

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