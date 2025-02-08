import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startAsociateCustomerProduct } from "../../../store/user/thunks";

export const ButtonAsociate = () => {
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.user_state)
    const [modal, setModal] = useState(false)
    const [accountSelect, setAccountSelect] = useState('')

    const onClickModal = () => {
        setModal(!modal)
    }

    const onChangeSelect = (event) => {
        //console.log(event.target.value.trim().length)
        setAccountSelect(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault()
        if(accountSelect.trim().length > 0){
           dispatch(startAsociateCustomerProduct(user.id, accountSelect)) 
           setModal(!modal  )
        }
    }

  return (
    <>
      {/* <!-- Modal toggle --> */}
      <button
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        className="block mx-2 mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={onClickModal}
      >
        Asociate Product
      </button>

      {/* <!-- Main modal --> */}
      <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className= {`${!modal?'hidden':''} overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center w-full h-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/*   <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Vas a asociar al usuario: <span className="text-2xl">{user&&user.full_name}</span>
              </h3>
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
                onClick={onClickModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-4 md:p-5">
              <form className="space-y-4" action="#" onSubmit={onSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tipo de Cuenta
                  </label>
                  <select
                    name="product_type"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    onChange={onChangeSelect}
                    value={accountSelect}
                    required
                  >
                    <option value="">Select...</option>
                    <option value="ca">Current Account</option>
                    <option value="sa">Saving Account</option>
                  </select>
                </div>
                
                
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Asociar Usuario
                </button>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
