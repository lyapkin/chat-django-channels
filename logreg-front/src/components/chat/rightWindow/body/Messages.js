import React, { useState, useEffect, useRef } from 'react'

import useAuth from '../../../../hooks/useAuth'
import useMessages from '../../../../hooks/useMessages'

import Message from './Message'
import DateBound from './DateBound'

import './styles/Messages.css'

const Messages = () => {
    const {messages, setMessages} = useMessages()
    const [isScrolled, setIsScrolled] = useState(false)
    const {chatSocket} = useAuth()
    const messagesContainer = useRef(null)

    useEffect(() => {
        const handleMessage = event => {
            if ((messagesContainer.current.scrollTop + messagesContainer.current.clientHeight + 2) < messagesContainer.current.scrollHeight) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
            setMessages(prev => [...prev, JSON.parse(event.data).messageData])
        }
        chatSocket.addEventListener('message', handleMessage)
        // console.log('add eventlistener in messages')
        return () => {
            // console.log('remove eventlistener in messages')
            chatSocket.removeEventListener('message', handleMessage)
        }
    }, [chatSocket])

    useEffect(() => {
        if (!isScrolled) {
            messagesContainer.current.scrollTop = 1e9
        }
    })
    

    const content = messages.map((message, index, messages) => insertDateBounds(message, index, messages, Message, DateBound))

    return (
        <div className='messages' ref={messagesContainer}>
            {content}
        </div>
    )
}

export default Messages


function insertDateBounds(message, index, messages, MessageComponent, DateBoundComponent) {
    /*
        Insert date bounds between messages from different days
    */
   
   const messageDate = new Date(Date.parse(message.sentTime))
   // Prepend a date bound if the message is first
   if (index === 0) return (
        <React.Fragment key={index + 'frag'}>
            <DateBoundComponent key={message.id + 'date'} date={formatForDateBound(messageDate)}/>
            <MessageComponent key={message.id} data={message} />
        </React.Fragment>
    )
    
    // If the current message date differs from the previous messages date insert a date bound
    messageDate.setHours(0, 0, 0, 0)
    const previousMessageDate = new Date(Date.parse(messages[index - 1].sentTime)).setHours(0, 0, 0, 0)
    if (messageDate.getTime() === previousMessageDate) {
        return (<MessageComponent key={message.id} data={message} />)
    } else {
        return (
            <React.Fragment key={index + 'frag'}>
                <DateBoundComponent key={message.id + 'date'} date={formatForDateBound(messageDate)}/>
                <MessageComponent key={message.id} data={message} />
            </React.Fragment>
        )
    }
}

function formatForDateBound(date) {
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    const monthTranscript = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
    }

    return `${day} ${monthTranscript[month]} ${year}`
}