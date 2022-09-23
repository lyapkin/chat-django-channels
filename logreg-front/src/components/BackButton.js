import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const BackButton = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const handleClick = () => {
        if (location.state?.isSearch) {
            navigate(location.pathname)
        } else {
            navigate(-1)
        }
    }

    return (
        <div className='back-button header-left-button'>
            <button onClick={handleClick}>Back</button>
        </div>
    )
}

export default BackButton