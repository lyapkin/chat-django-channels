import React from 'react'
import {useNavigate, useLocation} from 'react-router-dom'

const SearchConnection = ({data}) => {
    const navigate = useNavigate()
    const location = useLocation()
    
    return (
        <li className='connection' onClick={() => navigate(`${data.userId}`, {state: location.state})} >
            {data.username}
        </li>
    )
}

export default SearchConnection