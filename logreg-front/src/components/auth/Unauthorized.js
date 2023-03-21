import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'

import useAuth from '../../hooks/useAuth'

const Unauthorized = () => {
    const {auth} = useAuth()

    return (
        auth.is_authenticated
            ? <Navigate to='chat' replace />
            : <Outlet />
    )
}

export default Unauthorized