import Login from '@/pages/Login'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {user} = useSelector(store=>store.auth)
  return (
    <div>
      {
        user ? children:<Navigate to={'/login'}/>
      }
    </div>
  )
}

export default ProtectedRoute
