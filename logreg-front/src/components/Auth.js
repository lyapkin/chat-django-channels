import React from 'react'
import {Link, Outlet, Navigate, useLocation, useMatch} from 'react-router-dom'

const Auth = () => {
  const location = useLocation()
  const match = useMatch(location.pathname)

  return (
    <div>
        {/* {['/auth', '/auth/'].includes(location.pathname) && (<Navigate to='reg' replace />)} */}
        {/* {match.pathnameBase === '/auth' && (<Navigate to='reg' replace />)} */}
        <nav>
          <Link to='reg'>Registration</Link>
          <Link to='login'>Login</Link>
        </nav>
        <Outlet />
    </div>
  )
}

export default Auth