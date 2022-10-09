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
    const [hidden, setHidden] = useState(false)
    const {connectionUserId} = useParams()

    useEffect(() => {
        if (connectionUserId) {
            setHidden(true)
        } else {
            setHidden(false)
        }
    }, [connectionUserId])

    const leftWindow = hidden ? 'left-window left-window_hidden' : 'left-window'
    
    return (
        <div className={leftWindow} >
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