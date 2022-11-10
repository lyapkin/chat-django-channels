import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import '../styles/MenuButton.css'

const MenuButton = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const handleClick = () => {
        const state = {
            isMenu: true,
            displayBack: true,
            isOutOfMainLeftWindow: true
        }
        navigate(location.pathname, {state})
    }

    return (
        <div className='menu-button header-left-button'>
            <button onClick={handleClick} title='Open menu'>Menu</button>
        </div>
    )
}

export default MenuButton