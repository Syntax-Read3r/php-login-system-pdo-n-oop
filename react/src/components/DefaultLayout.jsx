import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

export default function DefaultLayout() {
  const {user, token} = useStateContext();

  // check if the token not exist --  If it does not exist. The user does not have permission to access the page and is redirected to login page. 
  // Anything that is part of the defaultLayout cannot be accessed if (!token)
  if (!token) {
    return <Navigate to="/login"/>
  }


  return (
    <div>
      Default Layout
      <Outlet/>
    </div>
  )
}
