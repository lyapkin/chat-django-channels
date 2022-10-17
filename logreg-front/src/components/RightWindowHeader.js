import React from 'react'

import BackButton from './BackButton'
import ConnectionInfo from './ConnectionInfo'

import '../styles/RightWindowHeader.css'

const RightWindowHeader = () => {

    return (
        <header className='right-window-header'>
            <BackButton />
            <ConnectionInfo />
        </header>
    )
}

export default RightWindowHeader