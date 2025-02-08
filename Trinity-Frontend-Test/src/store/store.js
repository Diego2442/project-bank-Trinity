import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { userSlice } from "./user/userSlice";
import { transactionSlice } from "./transaction/transactionSlice";

export const store = configureStore({
    reducer:{
        auth_state: authSlice.reducer,
        user_state: userSlice.reducer,
        transaction_state: transactionSlice.reducer,
    }
})