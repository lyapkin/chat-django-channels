import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const BackButton = ({main}) => {
    const location = useLocation()
    const navigate = useNavigate()

    const handleClick = () => {
        if (location.state?.isSearch && main) {
            navigate(location.pathname)
        } else if (location.state?.isMenu && main) {
            navigate(-1)
        } else {
            navigate('/chat', {state: location.state})
        }
    }

    return (
        <div className='back-button header-left-button'>
            <button onClick={handleClick}>Back</button>
        </div>
    )
}

export default BackButton