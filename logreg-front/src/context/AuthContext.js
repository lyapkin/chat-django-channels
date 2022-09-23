import {createContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

export const initAuth = {
    user: null,
    is_authenticated: false,
    socket: null
}
const AuthContext = createContext(initAuth)

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(initAuth)
    const [chatSocket, setChatSocket] = useState(null)

    const navigate = useNavigate()    

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/auth/sessioncheck/', {
                    method: 'GET',
                    credentials: 'include'
                })
                const result = await response.json()
                if (result.success) {
                    setAuth(result.data)
                    navigate('chat', {replace: true})
                } else {
                    setAuth(initAuth)
                    navigate('auth/login', {replace: true})
                }
            } catch (error) {
                console.log('network Problems')
            }
        }
        checkSession()
    }, [])

    return (
        <AuthContext.Provider value={{auth, setAuth, chatSocket, setChatSocket}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext