import React from "react";
import { useForm } from "../../../hooks/useForm";
import { calculateAgeMin } from "../functions/calculateAgeMin";
import { startCreateCustomer } from "../../../store/user/thunks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialState = {
    full_name: '',
    email: '',
    document_type: 'cc',
    document_number: '',
    birth_day: ''
  }
export const FormUser = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { 
        formState,
        full_name,
        email,
        document_type,
        document_number,
        birth_day,
        onInputChange        
    } = useForm(initialState) 

    const age_min = calculateAgeMin() 

    const onSubmit = (event) => {
        event.preventDefault()
        dispatch(startCreateCustomer(formState, navigate))
    }

  return (
    <form className="max-w-md mx-auto my-16" onSubmit={onSubmit}>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="email"
          name="email"
          id="email"
          className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          onChange={onInputChange}
          value={email}
          required
        />
        <label
          htmlFor="email"
          className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email address
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="full_name"
          id="full_name"
          className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          onChange={onInputChange}
          value={full_name}
          required
        />
        <label
          htmlFor="full_name"
          className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Full Name
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="date"
          name="birth_day"
          id="birth_day"
          className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          onChange={onInputChange}
          max={age_min}
          value={birth_day}
          required
        />
        <label
          htmlFor="birth_day"
          className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Birth Day
        </label>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <select
            name="document_type"
            id="document_type"
            className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            onChange={onInputChange}
            value={document_type}
            required
          >
            <option value="cc" className="bg-transparent text-gray-900 dark:text-white dark:bg-gray-700">
              Cédula de Ciudadanía
            </option>
            <option value="ce" className="bg-transparent text-gray-900 dark:text-white dark:bg-gray-700">
              Cédula Extranjera
            </option>
            <option value="pp" className="bg-transparent text-gray-900 dark:text-white dark:bg-gray-700">
              Pasaporte
            </option>
          </select>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="document_number"
            id="document_number"
            pattern="[0-9]*"  // Permite solo números
            inputMode="numeric" // Asegura que los teclados en dispositivos móviles muestren los números
            className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={onInputChange}
            value={document_number}
            required
          />
          <label
            htmlFor="document_number"
            className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Document Number
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        {/* <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone number (123-456-7890)
          </label>
        </div> */}
        
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Crear Usuario
      </button>
    </form>
  );
};
