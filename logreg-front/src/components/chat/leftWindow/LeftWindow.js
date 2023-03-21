import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

import LeftWindowHeader from './header/LeftWindowHeader'
import LeftWindowBody from './body/LeftWindowBody'
import ConnectionList from './body/ConnectionList'
import SearchConnectionList from './body/SearchConnectionList'
import Menu from './body/Menu'

import './styles/LeftWindow.css'

export const searchResultInit = {
    users: []
}

const LeftWindow = () => {
    const location = useLocation()
    const [searchResult, setSearchResult] = useState(searchResultInit)
    
    return (
        <div className='left-window' >
            <LeftWindowHeader setSearchResult={setSearchResult} />
            <LeftWindowBody>
                {
                    (location.state?.isMenu && <Menu />) ||
                    (location.state?.isSearch && <SearchConnectionList searchResult={searchResult} />) ||
                    <ConnectionList />
                }
            </LeftWindowBody>
        </div>
    )
}

export default LeftWindow