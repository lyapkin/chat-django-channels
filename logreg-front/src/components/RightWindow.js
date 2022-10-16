import React, {useState, useEffect} from 'react'
import {Outlet, useParams} from 'react-router-dom'

import '../styles/RightWindow.css'

const RightWindow = () => {
    const [visible, setVisible] = useState(false)
    const {connectionUserId} = useParams()

    useEffect(() => {
        if (connectionUserId) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [connectionUserId])

    const rightWindow = visible ? 'right-window right-window_visible' : 'right-window'

    return (
        <div className={rightWindow}>
            <Outlet />
        </div>
    )
}

export default RightWindow