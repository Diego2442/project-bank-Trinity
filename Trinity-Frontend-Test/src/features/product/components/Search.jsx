import React from 'react'
import { useForm } from '../../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { startSearchCustomerByDocument, startSearchProductByCustomer } from '../../../store/user/thunks'

const initialState = {document_number:''}

export const Search = () => {
    const dispatch = useDispatch()
    const {document_number, onInputChange} = useForm(initialState)

    const onSubmit = (event) => {
        event.preventDefault()
        
        if(document_number.length > 4){
            dispatch(startSearchCustomerByDocument(document_number))
            dispatch(startSearchProductByCustomer(document_number))
        }
    }
  return (
    
    <form className="flex items-center max-w-md mx-auto" onSubmit={onSubmit}>   
        <label htmlFor="simple-search" className="sr-only">Search</label>
        <div className="relative w-full">
            <input type="text" id="document_number" name='document_number' pattern="[0-9]*" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write document number..." value={document_number} onChange={onInputChange} required />
        </div>
        <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span className="sr-only">Search</span>
        </button>
    </form>

  )
}
