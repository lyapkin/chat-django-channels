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
                    console.log(result)
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
                const inputData = JSON.parse(event.data)
                const data = inputData.connectionData
                const connectionUser = inputData.connectionUserData
                console.log(JSON.parse(event.data))
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
                    } else {   
                        return [
                            {
                                id: data.id,
                                chatId: data.chatId,
                                connectionFirstName: connectionUser.firstName,
                                connectionLastName: connectionUser.lastName,
                                connectionUserId: connectionUser.id,
                                connectionUsername: connectionUser.username,
                                lastMessageContent: data.content,
                                lastMessageSentBy: data.sentBy,
                                lastMessageTime: data.sentTime
                            },
                            ...prev
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