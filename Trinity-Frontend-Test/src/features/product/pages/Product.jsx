import React, { useEffect, useMemo } from 'react'
import { Search } from '../components/Search'
import { Title } from '../components/Title'
import { TableList } from '../components/TableList'
import { useDispatch, useSelector } from 'react-redux'
import { startSearchProductByCustomer } from '../../../store/user/thunks'
import { ButtonAsociate } from '../components/ButtonAsociate'

export const Product = () => {
    const {user, products} = useSelector((state) => state.user_state)

  return (
    <>
        <Title/>
        <Search/>
        {
            (!!user.id && products.length < 2)&&<ButtonAsociate/>
        }
        {
            products.length > 0
            ?<TableList products={products}/>
            :''
        }
    </>
  )
}
