import React, {useState, useEffect} from 'react'

import RightWindowHeader from './RightWindowHeader'
import RightWindowBody from './RightWindowBody'
import RightWindowPlaceholder from './RightWindowPlaceholder'

import ConnectionUserInfoContext from '../context/ConnectionUserInfoContext'
import MessagesContext from '../context/MessagesContext'

import { useDisplayMessagesBlock } from '../hooks/useDisplayMessagesBlock'

import useConnectionUserId from '../hooks/useConnectionUserId'

import '../styles/RightWindow.css'

const RightWindow = () => {
    const connectionUserId = useConnectionUserId()
    const [isVisible, isMounted, handleTransitionEnd] = useDisplayMessagesBlock(connectionUserId)
    const [messages, setMessages] = useState([])
    const [connectionUserInfo, setConnectionUserInfo] = useState({})
    
    useEffect(() => {
        if (connectionUserId) {    
            const getMessagesAndConnectionUser = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/connections/${connectionUserId}`, {
                        method: 'GET',
                        credentials: 'include'
                    })
                    if (response.ok) {
                        const result = await response.json()
                        setMessages(result.messages)
                        setConnectionUserInfo(result.connectionUser)
                    }
                } catch {
                    console.log('network problem')
                }
            }
            getMessagesAndConnectionUser()
        }
    }, [connectionUserId])

    return (
        <div className={`right-window ${isVisible && 'right-window_visible'}`} onTransitionEnd={handleTransitionEnd}>
            {isMounted ? (
                <MessagesContext.Provider value={{messages, setMessages}} >
                <ConnectionUserInfoContext.Provider value={connectionUserInfo} >
                    <RightWindowHeader />
                    <RightWindowBody />
                </ConnectionUserInfoContext.Provider>
                </MessagesContext.Provider>
            ) : (
                <RightWindowPlaceholder />
            )}
        </div>
    )
}

export default RightWindow