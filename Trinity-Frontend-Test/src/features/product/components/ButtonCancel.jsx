import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { startCancelProduct, startDepositProduct } from "../../../store/user/thunks";


export const ButtonCancel = ({ product_data }) => {
  const dispatch = useDispatch()
  const [modal, setModal] = useState(false);
  const onClickModal = () => {
    setModal(!modal);
  };
  

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(startCancelProduct(product_data.product_id))
    setModal(!modal)
  };

  

  return (
    <>
      <button
        className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
        onClick={onClickModal}
      >
        Cancel Account
      </button>

      {/* <!-- Main modal --> */}
      <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          !modal ? "hidden" : ""
        } overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center w-full h-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/*   <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Cancel Account {' '}
                <span className="text-2xl">
                {product_data.product_id} - Tipo: {product_data.account_type=='sa'?'Ahorro':'Corriente'}
                </span>
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
                    Estas seguro?
                  </label>
                  
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Cancel Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
