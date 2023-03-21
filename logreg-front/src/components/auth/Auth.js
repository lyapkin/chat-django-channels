import React from 'react'
import {Link, Outlet, Navigate, useLocation, useMatch} from 'react-router-dom'

import './style/Auth.css'

const Auth = () => {
  const location = useLocation()
  const match = useMatch(location.pathname)

  return (
    <div className='auth'>
        {match.pathnameBase === '/auth' && (<Navigate to='login' replace />)}
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