import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CreateUser } from '../pages/CreateUser'

export const RouteUser = () => {
  return (
    <Routes>
        <Route path='create_user' element={<CreateUser/>}/>
    </Routes>
  )
}
