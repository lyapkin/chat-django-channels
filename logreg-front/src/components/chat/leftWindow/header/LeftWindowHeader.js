import React from 'react'
import { useLocation } from 'react-router-dom'

import MenuButton from '../../../buttons/MenuButton'
import BackButton from '../../../buttons/BackButton'
import Search from './Search'


import './styles/LeftWindowHeader.css'

const LeftWindowHeader = ({ setSearchResult }) => {
	const location = useLocation()

	return (
		<header className='left-window__header'>
			{
				(location.state?.displayBack && <BackButton />) ||
				<MenuButton />
			}
			{
				(location.state?.isMenu && <h1 className='left-window__header-headline'>Menu</h1>) || <Search setSearchResult={setSearchResult} />
			}
		</header>
	)
}

export default LeftWindowHeader