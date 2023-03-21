import React, { useState, useEffect } from 'react'

import useAuth from '../../../../hooks/useAuth'

import Connection from './Connection'


const ConnectionList = () => {
    const [connections, setConnections] = useState([])
    const {chatSocket} = useAuth()
    
    useEffect(() => {
        const getConnections = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/connections/', {
                    method: 'GET',
                    credentials: 'include'
                })
                if (response.ok) {    
                    const result = await response.json()
                    setConnections(result)
                    // console.log(result)
                }
            } catch {
                console.log('network problem')
            }
        }
        getConnections()
    }, [])

    useEffect(() => {
        if (chatSocket) {
            const handleMessage = event => {
                const data = JSON.parse(event.data).connectionData
                setConnections(prev => {
                    const i = prev.findIndex(item => item.chatId === data.chatId)
                    if (i !== -1) {
                        return [
                            {
                                ...prev[i],
                                lastMessageContent: data.content,
                                lastMessageSentBy: data.sentBy,
                                lastMessageTime: data.sentTime
                            },
                            ...prev.slice(0, i),
                            ...prev.slice(i+1)
                        ]
                    }
                })
            }
            chatSocket.addEventListener('message', handleMessage)
            // console.log('add eventlistener in connectionList')
            return () => {
                // console.log('remove eventlistener in connectionList')
                chatSocket.removeEventListener('message', handleMessage)
            }
        }
    }, [chatSocket])

    const content = connections.map(connection => <Connection key={connection.id} data={connection} />)

    return (
        <ul className='left-window__list'>
            {content}
        </ul>
    )
}

export default ConnectionList