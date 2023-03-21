import React from 'react'
import {useNavigate, useLocation} from 'react-router-dom'

import { useLastCkickedConnection } from '../../../../hooks/useLastClickedConnection'

import { MOBILE_VERSION_WIDTH } from '../../../../constants'

const SearchConnection = ({data}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const {setLastClickedConnection} = useLastCkickedConnection()


    const handleClick = () => {
        setLastClickedConnection(String(data.userId))
        navigate(`${data.userId}`, {state: location.state, replace: (document.documentElement.clientWidth > MOBILE_VERSION_WIDTH)})
    }
    
    return (
        <li className='connection' onClick={handleClick} >
            {data.username}
        </li>
    )
}

export default SearchConnection