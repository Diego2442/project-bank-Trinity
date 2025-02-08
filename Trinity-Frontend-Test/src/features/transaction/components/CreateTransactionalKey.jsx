import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startAsignTransacionalKey } from '../../../store/auth/thunks'

export const CreateTransactionalKey = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth_state)
    const [key, setKey] = useState(0)
    const onInputChange = (event) => {
            setKey(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault()
        if(key.length !== 6){return}
        dispatch(startAsignTransacionalKey(key, user.id))
    }

  return (
    <>
    {/* <!-- Main modal --> */}
    <div
    id="authentication-modal"
    tabIndex="-1"
    aria-hidden="true"
    className={`overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center w-full h-full`}
  >
    <div className="relative p-4 w-full max-w-md max-h-full">
      {/*   <!-- Modal content --> */}
      <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        {/* <!-- Modal header --> */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
          <h3 className="text-xl font-semibold text-amber-500 dark:text-amber-500">
            Create Transactional Key
          </h3>
          <p className=' text-sm font-bold text-gray-800 dark:text-white'>Escribe 6 digitos para la autorizar tus transacciones</p>
         
        </div>
        {/* <!-- Modal body --> */}
        <div className="p-4 md:p-5">
          <form className="space-y-4" action="#" onSubmit={onSubmit}>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Transactional Key
              </label>
              <input
                type="text"
                name="key"
                pattern='[0-9]*'
                maxLength={6}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                onChange={onInputChange}
                value={key}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Asign Transactional Key
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
    </>

  )
}
