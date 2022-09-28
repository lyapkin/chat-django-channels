import React, { useState, useRef, useEffect } from 'react'
import {useParams} from 'react-router-dom'

import useAuth from '../hooks/useAuth'
import '../styles/MessageInput.css'

const MessageInput = () => {
    const [message, setMessage] = useState('')
    const textAreaElement = useRef(null)
    const {connectionUserId} = useParams()
    const {chatSocket} = useAuth()

    useEffect(() => {
        setMessage('')
    }, [connectionUserId])

    const handleChange = event => {
        setMessage(event.target.value)
        textAreaElement.current.style.height = 0
        textAreaElement.current.style.height = textAreaElement.current.scrollHeight - 20 + 'px'
    }

    const handleClick = event => {
        const data = JSON.stringify({
            connected_to: connectionUserId,
            message
        })
        if (chatSocket.readyState === WebSocket.OPEN) {
            chatSocket.send(data)
            setMessage('')
            textAreaElement.current.style.height = 0
        } else {
            console.log('socket closed')
        }
    }

    return (
        <div className='message-input'>
            <textarea className='message-input__textarea' disabled={connectionUserId ? false : true} placeholder='Message' rows='1' ref={textAreaElement} value={message} onChange={handleChange} />
            <button className='message-input__button' disabled={connectionUserId ? false : true} onClick={handleClick}>Send</button>
        </div>
    )
}

export default MessageInput