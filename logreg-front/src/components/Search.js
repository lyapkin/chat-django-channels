import React, {useState, useEffect, useRef} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {searchResultInit} from './LeftWindow'

import '../styles/Search.css'


const Search = ({setSearchResult}) => {
    const [text, setText] = useState('')
    const [searchSocket, setSearchSocket] = useState(null)
    const searchInput = useRef(null)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        // Blurs the input even going back through the browser back button
        if (!location.state?.isSearch) {
            searchInput.current.blur()
        }
    }, [location.state])

    const handleFocus = () => {
        const state = {
            isSearch: true,
            displayBack: true
        }
        if (!location.state?.isSearch) {
            navigate(location.pathname, {state})
        }
    }

    const handleChange = async event => {
        setText(event.target.value)

        let socket = searchSocket
        const value = event.target.value.trim()
        setSearchResult(searchResultInit)
        if (value.length < 1) {
            return
        }
        if (!socket || socket.readyState === WebSocket.CLOSING || socket.readyState === WebSocket.CLOSED) {
            socket = new WebSocket('ws://127.0.0.1:8000/ws/search/')
            socket.onopen = (event) => {
                socket.send(value)
                socket.timer = setTimeout((socket) => {
                    socket.close()
                }, 30000, socket)
            }
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data)
                clearTimeout(socket.timer)
                socket.timer = setTimeout((socket) => {
                    socket.close()
                }, 30000, socket)
                setSearchResult(data)
            }
            socket.onerror = (event) => {
                
            }
            socket.onclose = (event) => {
                setSearchSocket(null)
            }
            setSearchSocket(socket)
        }
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(value)
            // set loading state
        }
    }

    const classNames = location.state?.isSearch ? 'search search_active' : 'search'

    return (
        <div className={classNames}>
            <input onFocus={handleFocus} onChange={handleChange} value={text} ref={searchInput} placeholder='Search' maxLength='41' />
        </div>
    )
}

export default Search