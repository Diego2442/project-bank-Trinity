  import React, { useEffect, useState } from 'react'
  import { useDispatch, useSelector } from 'react-redux';
  import { useForm } from '../../../hooks/useForm'; 
  import { verifyToken } from '../../auth/helpers/verifyToken';
import Swal from 'sweetalert2';
import { startDebitTransaction } from '../../../store/user/thunks';

  const initialState = {transactional_key: null}

  export const RequestDebit = () => {
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth_state)
    const [debitRequest, setDebitRequest] = useState(null);
    const [loading, setLoading] = useState(false);
    //const [responseSent, setResponseSent] = useState(false);

    const { transactional_key, onInputChange, onCleanForm} = useForm(initialState)

    const onSubmit = async(event) => {
      event.preventDefault()
      const isValid = await verifyToken(transactional_key, user.id)
      if(isValid){
        const res = await dispatch(startDebitTransaction(debitRequest.amount, debitRequest.product_id, "debit"));
        if(res === 201){
          handleValidateTransaction(isValid)
        }else{
          handleValidateTransaction(false)
        }
        onCleanForm()
        //Swal.fire('Sent', '', 'success')
        setDebitRequest(null)
      }
    }

    const onCancelButton = () => {
      handleValidateTransaction(false)
      setDebitRequest(null)
      onCleanForm()
    }

    useEffect(() => {
      if(user.id){
        const socket = new WebSocket('ws://localhost:8000/ws/debit_room_' + user.id + '/');

        socket.onopen = () => {
          console.log('Conexión WebSocket establecida.');
        };

        socket.onmessage = (e) => {
          const message = JSON.parse(e.data);

          // Si es una solicitud de débito, la mostramos en la interfaz
          if (message.type === 'debit_request') {
            setDebitRequest(message);
            setLoading(false); // Dejamos de mostrar el mensaje de espera
          }
        };

        return () => {
          socket.close(); // Cerramos el socket cuando el componente se desmonte
        };
      }
    }, [user.id]);

    const handleValidateTransaction = (isValid) => {
      const socket = new WebSocket('ws://localhost:8000/ws/debit_room_' + user.id + '/');

      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            type: 'debit_response',
            response: isValid, // true o false
            amount: debitRequest.amount,
            admin_id: debitRequest.admin_id,
            product_id: debitRequest.product_id,
          })
        );
      };

      //setResponseSent(true);
    };

    return (
      <div>

        {debitRequest && (
          <div>
            {/* <!-- Main modal --> */}
            <div
              id="authentication-modal"
              tabIndex="-1"
              aria-hidden="true"
              className={`overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center w-full h-full`}
            >
              <div className="relative p-4 w-full max-w-md max-h-full">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                  {/* <!-- Modal header --> */}
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Solicitud débito de la cuenta:{" "}
                      <span className="text-2xl">{debitRequest.product_id}</span>
                    </h3>
                  </div>
                  {/* <!-- Modal body --> */}
                  <div className="p-4 md:p-5">

                    <form className="space-y-4" action="#" onSubmit={onSubmit}>
                      <div>
                      <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Monto
                        </label>
                        <p className='mb-2 text-sm font-medium text-gray-900 dark:text-yellow-700'>$ {debitRequest.amount}</p>
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Transactional Key
                        </label>
                        <input
                          type="password"
                          name="transactional_key"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          onChange={onInputChange}
                          pattern="\d{6}"
                          maxLength="6"
                          value={transactional_key}
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Verify
                      </button>
                      <button
                        onClick={onCancelButton}
                        type="button"
                        className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
