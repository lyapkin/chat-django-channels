import React from 'react'

import BackButton from './BackButton'
import ConnectionInfo from './ConnectionInfo'

import { MOBILE_VERSION_WIDTH } from '../constants'

import '../styles/RightWindowHeader.css'

const RightWindowHeader = () => {

    return (
        <header className='right-window-header'>
            {(document.documentElement.clientWidth <= MOBILE_VERSION_WIDTH) && <BackButton />}
            <ConnectionInfo />
        </header>
    )
}

export default RightWindowHeader