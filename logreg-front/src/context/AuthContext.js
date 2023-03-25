import {createContext, useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BASE_HTTP_URL } from '../constants'

export const initAuth = {
    auth: {
        user: null,
        is_authenticated: null
    },
    setAuth: null,
    chatSocket: null,
    setChatSocket: null
}
const AuthContext = createContext(initAuth)

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(initAuth.auth)
    const [chatSocket, setChatSocket] = useState(initAuth.chatSocket)
    const location = useLocation()

    const navigate = useNavigate()    

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch(BASE_HTTP_URL + '/auth/sessioncheck/', {
                    method: 'GET',
                    credentials: 'include'
                })
                const result = await response.json()
                if (result.success) {
                    setAuth(result.data)
                    navigate('chat', {replace: true})
                } else {
                    setAuth({
                        ...initAuth.auth,
                        is_authenticated: false
                    })
                    navigate(location.pathname, {replace: true})
                }
            } catch (error) {
                console.log('network Problems')
            }
        }
        checkSession()
    }, [])

    return (
        <AuthContext.Provider value={{auth, setAuth, chatSocket, setChatSocket}}>
            {
                auth.is_authenticated === null ?
                <div>Loading</div> :
                children
            }
        </AuthContext.Provider>
    )
}

export default AuthContext