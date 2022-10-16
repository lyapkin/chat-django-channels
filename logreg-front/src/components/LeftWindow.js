import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

import LeftWindowHeader from './LeftWindowHeader'
import LeftWindowBody from './LeftWindowBody'
import ConnectionList from './ConnectionList'
import SearchConnectionList from './SearchConnectionList'
import MenuList from './MenuList'

import '../styles/LeftWindow.css'
import '../styles/HeaderLeftButton.css'

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
                    (location.state?.isMenu && <MenuList />) ||
                    (location.state?.isSearch && <SearchConnectionList searchResult={searchResult} />) ||
                    <ConnectionList />
                }
            </LeftWindowBody>
        </div>
    )
}

export default LeftWindow