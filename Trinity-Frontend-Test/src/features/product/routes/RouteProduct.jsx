import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Product } from '../pages/Product'


export const RouteProduct = () => {
  return (
    <Routes>
        <Route path='product_search' element={<Product/>}/>
    </Routes>
  )
}
