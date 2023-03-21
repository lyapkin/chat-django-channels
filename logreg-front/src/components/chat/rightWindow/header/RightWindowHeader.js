import React from 'react'

import BackButton from '../../../buttons/BackButton'
import ConnectionInfo from './ConnectionInfo'

import { MOBILE_VERSION_WIDTH } from '../../../../constants'

import './styles/RightWindowHeader.css'

const RightWindowHeader = () => {

    return (
        <header className='right-window__header'>
            {(document.documentElement.clientWidth <= MOBILE_VERSION_WIDTH) && <BackButton />}
            <ConnectionInfo />
        </header>
    )
}

export default RightWindowHeader