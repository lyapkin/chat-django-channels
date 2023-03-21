import React from 'react'

import Logout from './Logout'
import MenuList from './MenuList'

const Menu = () => {
	return (
		<div className='left-window__menu'>
			<MenuList />
			<Logout />
		</div>
	)
}

export default Menu