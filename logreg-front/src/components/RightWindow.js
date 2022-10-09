import React from 'react'
import {Outlet} from 'react-router-dom'

import '../styles/RightWindow.css'

const RightWindow = () => {
    
    return (
        <div className='right-window'>
            <Outlet />
        </div>
    )
}

export default RightWindow