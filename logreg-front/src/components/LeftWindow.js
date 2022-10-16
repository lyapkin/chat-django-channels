import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import Header from './Header'
import ConnectionList from './ConnectionList'
import SearchConnectionList from './SearchConnectionList'
import MenuList from './MenuList'

import '../styles/LeftWindow.css'
import '../styles/LeftWindowBody.css'
import '../styles/HeaderLeftButton.css'

export const searchResultInit = {
    users: []
}

const LeftWindow = () => {
    const location = useLocation()
    const [searchResult, setSearchResult] = useState(searchResultInit)
    
    return (
        <div className='left-window' >
            <Header setSearchResult={setSearchResult} />
            {
                (location.state?.isMenu && <MenuList />) ||
                (location.state?.isSearch && <SearchConnectionList searchResult={searchResult} />) ||
                <ConnectionList />
            }
        </div>
    )
}

export default LeftWindow