import React, {useEffect} from 'react'
import {Outlet, Navigate, useLocation} from 'react-router-dom'

import useAuth from '../hooks/useAuth'

const Authorized = () => {
    const {auth, setChatSocket} = useAuth()
    const location = useLocation()

    useEffect(() => {
        if (auth.is_authenticated) {
            const socket = new WebSocket('ws://127.0.0.1:8000/ws/chat/')

            socket.onopen = (event) => {
                setChatSocket(socket)
                // console.log(event)
            }
            socket.onmessage = (event) => {
                console.log(event)
            }
            socket.onerror = (event) => {
                console.log(event)
            }
            socket.onclose = (event) => {
                console.log(event)
            }

            return () => {
                socket.close(1000)
            }
        }
    }, [auth, setChatSocket])

    return (
        auth.is_authenticated
            ? <Outlet />
            : <Navigate to='/auth/login' state={{from: location.pathname}} replace />
    )
}

export default Authorized