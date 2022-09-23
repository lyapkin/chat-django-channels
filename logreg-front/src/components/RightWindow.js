import React from 'react'
import {Routes, Route} from 'react-router-dom'

import Messages from './Messages'
import MessageInput from './MessageInput'

import '../styles/RightWindow.css'

const RightWindow = () => {
    
    return (
        <div className='right-window'>
            <Routes>
                <Route index element={<div>pick a chat</div>} />
                <Route path=':chatId/:connectionId' element={
                    <>
                        <Messages />
                        <MessageInput />
                    </>
                } />
            </Routes>
        </div>
    )
}

export default RightWindow