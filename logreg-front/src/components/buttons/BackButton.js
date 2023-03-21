import React from 'react'
import { useNavigate } from 'react-router-dom'

import {ReactComponent as BackIcon} from '../../icons/back.svg'


const BackButton = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(-1)
    }

    return (
        <div className='control-button'>
            <button onClick={handleClick}><BackIcon /></button>
        </div>
    )
}

export default BackButton