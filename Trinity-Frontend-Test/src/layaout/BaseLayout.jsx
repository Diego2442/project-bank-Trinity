import React, { useEffect } from 'react'
import { Navbar } from './Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { startLoadUser, startRefreshToken, startVerifyToken } from '../store/auth/thunks'

export const BaseLayout = ({children}) => {
    const dispatch = useDispatch()
    const {verifyToken} = useSelector((state) => state.auth_state)

    useEffect(() => {
        dispatch(startVerifyToken());
        dispatch(startRefreshToken());
    }, [])

    useEffect(() => {
        if (verifyToken) {
          dispatch(startLoadUser(localStorage.getItem("access")));
        }
      }, [verifyToken]);
    
  return (
    <>
        <div className='dark:bg-gray-800 h-screen w-full'>
        <Navbar/>
        {children}
        </div>
    </>
  )
}
