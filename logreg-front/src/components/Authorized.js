import React, {useEffect} from 'react'
import {Outlet, Navigate, useLocation} from 'react-router-dom'
import { BASE_WS_URL } from '../constants'

import useAuth from '../hooks/useAuth'

const Authorized = () => {
    const {auth, setChatSocket} = useAuth()
    const location = useLocation()

    useEffect(() => {
        if (auth.is_authenticated) {
            const socket = new WebSocket(BASE_WS_URL + '/ws/chat/')

            socket.onopen = (event) => {
                setChatSocket(socket)
            }
            socket.onmessage = (event) => {
            }
            socket.onerror = (event) => {
            }
            socket.onclose = (event) => {
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