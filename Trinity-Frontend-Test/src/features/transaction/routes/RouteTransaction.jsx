import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Transaction } from '../pages/Transaction'

export const RouteTransaction = () => {
  return (
    <Routes>
        <Route path='transactions' element={<Transaction/>}/>
    </Routes>
  )
}
