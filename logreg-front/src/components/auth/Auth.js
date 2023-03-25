import React from 'react'
import { Link, Outlet } from 'react-router-dom'

import './style/Auth.css'

const Auth = () => {

	return (
		<div className='auth'>
			<nav className='auth__nav'>
				<Link className='auth__link' to='reg'>SignUp</Link>
				<Link className='auth__link' to='login'>LogIn</Link>
			</nav>
			<div className='auth__form'>
				<Outlet />
			</div>
		</div>
	)
}

export default Auth