import React from 'react'
import { useLocation } from 'react-router-dom'

import MenuButton from './MenuButton'
import BackButton from './BackButton'
import Search from './Search'

import '../styles/LeftWindowHeader.css'

const LeftWindowHeader = ({ setSearchResult }) => {
	const location = useLocation()

	return (
		<header className='left-window-header'>
			{
				(location.state?.displayBack && <BackButton />) ||
				<MenuButton />
			}
			{
				(location.state?.isMenu && <h1>Menu</h1>) || <Search setSearchResult={setSearchResult} />
			}
		</header>
	)
}

export default LeftWindowHeader