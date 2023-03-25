import React from 'react'
import {useNavigate} from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'
import { initAuth } from '../../../../context/AuthContext'
import { BASE_HTTP_URL } from '../../../../constants'


const Logout = () => {
    const {auth, setAuth} = useAuth()

    const navigate = useNavigate()

    const handleClick = async () => {
        try {
            const response = await fetch(BASE_HTTP_URL + '/auth/logout/', {
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
     <div className='left-window__logout'>
        <button onClick={handleClick}>Log out</button>
     </div>
    )
}

export default Logout