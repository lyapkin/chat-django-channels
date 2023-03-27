import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {ReactComponent as MenuIcon} from '../../icons/menu.svg'

const MenuButton = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const handleClick = () => {
        const state = {
            isMenu: true,
            displayBack: true,
            isLeftWindowNotDefault: true
        }
        navigate(location.pathname, {state})
    }

    return (
        <div className='control-button'>
            <button onClick={handleClick} title='Open menu'><MenuIcon /></button>
        </div>
    )
}

export default MenuButton