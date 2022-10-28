import React from 'react'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(-1)
    }

    return (
        <div className='back-button header-left-button'>
            <button onClick={handleClick}>Back</button>
        </div>
    )
}

export default BackButton