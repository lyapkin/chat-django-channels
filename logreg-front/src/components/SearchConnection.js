import React from 'react'
import {useNavigate, useLocation} from 'react-router-dom'

import { MOBILE_VERSION_WIDTH } from '../constants'

const SearchConnection = ({data}) => {
    const navigate = useNavigate()
    const location = useLocation()
    
    return (
        <li className='connection' onClick={() => navigate(`${data.userId}`, {state: location.state, replace: (document.documentElement.clientWidth > MOBILE_VERSION_WIDTH)})} >
            {data.username}
        </li>
    )
}

export default SearchConnection