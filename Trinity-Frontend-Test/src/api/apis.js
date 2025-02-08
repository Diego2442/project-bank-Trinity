import axios from "axios";

export const apis = {
    authApi: axios.create({
        baseURL: import.meta.env.VITE_API_URL_AUTH
    }),

    userApi: axios.create({
        baseURL: import.meta.env.VITE_API_URL_USER
    }),

    productApi: axios.create({
        baseURL: import.meta.env.VITE_API_URL_PRODUCT
    }),

    transactionApi: axios.create({
        baseURL: import.meta.env.VITE_API_URL_TRANSACTION
    })
}