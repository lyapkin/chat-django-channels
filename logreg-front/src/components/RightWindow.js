import React, {useState, useEffect} from 'react'
import {Outlet, useParams} from 'react-router-dom'
import ConnectionUserInfoContext from '../context/ConnectionUserInfoContext'
import MessagesContext from '../context/MessagesContext'



import '../styles/RightWindow.css'

const RightWindow = () => {
    const [visible, setVisible] = useState(false)
    const [messages, setMessages] = useState([])
    const [connectionUserInfo, setConnectionUserInfo] = useState({})
    const {connectionUserId} = useParams()

    useEffect(() => {
        if (connectionUserId) {    
            const getMessagesAndUser = async () => {
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
            getMessagesAndUser()
        }
    }, [connectionUserId])

    useEffect(() => {
        if (connectionUserId) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [connectionUserId])

    return (
        <div className={`right-window ${visible && 'right-window_visible'}`}>
            <MessagesContext.Provider value={{messages, setMessages}} >
            <ConnectionUserInfoContext.Provider value={connectionUserInfo} >
                <Outlet />
            </ConnectionUserInfoContext.Provider>
            </MessagesContext.Provider>
        </div>
    )
}

export default RightWindow