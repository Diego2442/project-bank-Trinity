import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        verifyToken:false,
        isAuthenticated:'no-authenticated',//'verifying','no-authenticated'
        user:{}
    },
    reducers: {
        loginVerify: (state, action)=>{
            state.isAuthenticated = 'verifying'
        },
        loginFail:(state)=>{
            state.isAuthenticated = 'no-authenticated'
        },
        loginAuthenticated: (state, action ) => {
            state.isAuthenticated = 'authenticated'
        },
        logoutUser:(state, action)=>{
            state.isAuthenticated='no-authenticated',
            state.user = {},
            state.verifyToken = false
        },
        verifyToken:(state)=>{
            state.verifyToken=true
            state.isAuthenticated='authenticated'
        },
        loadUser:(state, action)=>{
            state.user= action.payload
        },
        asignTransactionalKey: ({user}, action)=>{
            user.transactional_key = action.payload
        }
    }
});

export const { loginVerify, loginAuthenticated, loginFail, logoutUser, verifyToken, loadUser, asignTransactionalKey } = authSlice.actions;