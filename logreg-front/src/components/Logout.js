import React from 'react'
import {useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { initAuth } from '../context/AuthContext'


const Logout = () => {
    const {auth, setAuth} = useAuth()

    const navigate = useNavigate()

    const handleClick = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/auth/logout/', {
                method: 'DELETE',
                credentials: 'include'
            })
            if (response.ok) {
                // auth.socket.close()
                setAuth(initAuth)
                navigate('login')
            }
        } catch {
            console.log('network problem')
        }
    }
    
    return (
     <div>
        <button onClick={handleClick}>Log out</button>
     </div>
    )
}

export default Logout