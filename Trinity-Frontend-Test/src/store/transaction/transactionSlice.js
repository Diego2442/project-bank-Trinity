import { createSlice } from "@reduxjs/toolkit";

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        transactions:[],
    },
    reducers: {
        addTransactions:(state, action) => {
            state.transactions = action.payload
        } ,
        cleanTransactions:(state) => {
            state.transactions = []
        }
    }
});

export const { addTransactions, cleanTransactions } = transactionSlice.actions;