import {createContext, useRef, useState} from 'react'


export const LastClickedConnectionContext = createContext()

export const LastClickedConnectionProvider = ({children}) => {
    const [lastClickedConnection, setLastClickedConnection] = useState(null)

    return (
        <LastClickedConnectionContext.Provider value={{lastClickedConnection, setLastClickedConnection}} >
            {children}
        </LastClickedConnectionContext.Provider>
    )
}
