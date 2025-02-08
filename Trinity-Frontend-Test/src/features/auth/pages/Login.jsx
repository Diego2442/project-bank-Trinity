import React from "react";
import { useForm } from "../../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startLogin } from "../../../store/auth/thunks";

const initialState = {
    email: '',
    password: '',
}

export const Login = () => {
    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector(
        (state) => state.auth_state
    )
    const {onInputChange, email, password} = useForm(initialState)

    const onSubmit = (event) => {
        event.preventDefault();
        if(email.trim().length<4 || password.length<4)return;

        //console.log(password, email)
        dispatch(startLogin({email, password}))

    }

  return (
    <div className="h-[calc(100vh-80px)] flex items-center justify-center">
      <form className="max-w-sm w-full bg-gray-700 p-6 rounded-lg shadow-lg" onSubmit={onSubmit}>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-500"
          >
            Your email
          </label>
          <input
            onChange={onInputChange}
            name="email"
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-500"
          >
            Your password
          </label>
          <input
            onChange={onInputChange}
            name="password"
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={isAuthenticated === 'verifying'}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
