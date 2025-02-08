import React, { useEffect } from 'react'
import { RequestDebit } from '../components/RequestDebit'
import { useDispatch, useSelector } from 'react-redux'
import { CreateTransactionalKey } from '../components/CreateTransactionalKey'
import { TitleTransaction } from '../components/TitleTransaction'
import { startSearchCustomerByDocument, startSearchProductByCustomer } from '../../../store/user/thunks'
import { TableListTransfer } from '../components/TableListTransfer'
import { TransactionsList } from '../components/TransactionsList'

export const Transaction = () => {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth_state)
    const { products } = useSelector(state => state.user_state)
    const { transactions } = useSelector(state => state.transaction_state)

    useEffect(() => {
        if(user){
            dispatch(startSearchCustomerByDocument(user.document_number))
            dispatch(startSearchProductByCustomer(user.document_number))
        }
    }, [user])
    
  return (
    <>
        {
            !!user.transactional_key
            ?
            <>
            <TitleTransaction/>
            {products&&<TableListTransfer products={products}/>}
            <br />
            {transactions&&<TransactionsList transactions={transactions}/>}
            </>
            :
            <CreateTransactionalKey/>
        }
        {/* <RequestDebit/> */}
    </>
  )
}
