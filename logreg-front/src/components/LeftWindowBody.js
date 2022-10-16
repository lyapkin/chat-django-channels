import React from 'react'

import '../styles/LeftWindowBody.css'


const LeftWindowBody = ({children}) => {

    return (
        <div className='left-window-body'>
            {children}
        </div>
    )
}

export default LeftWindowBody