import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        products : []
    },
    reducers: {
        addUser: (state, action ) => {
            state.user = action.payload
        },
        addProducts: (state, action) => {
            state.products = action.payload
        },
        cleanProducts: (state) => {
            state.products = []
        },
        cleanUser: (state) => {
            state.products = []
            state.user = {}
        },
        addProduct: (state, {payload}) => {
            state.products = [...state.products, payload]
        },
        addBalance: (state, {payload}) => {
            state.products = state.products.map((product) =>
                product.product_id === payload.product_id
                    ? { ...product, balance: `${(parseFloat(product.balance) + parseFloat(payload.amount)).toFixed(2)}` }
                    : product
            );
        },
        restBalance: (state, {payload}) => {
            state.products = state.products.map((product) =>
            {
                if (product.product_id === payload.product_id) {
                    if (product.is_exempt) {
                        // Si es exento, solo restamos el monto
                        const newBalance = (parseFloat(product.balance) - parseFloat(payload.amount)).toFixed(2);
                        console.log("Nuevo saldo (exento): ", newBalance);
                        return { 
                            ...product, 
                            balance: `${(parseFloat(product.balance) - parseFloat(payload.amount)).toFixed(2)}`
                        };
                    } else {
                       
                        const deductedAmount = (parseFloat(payload.amount) * 1.004).toFixed(2); // 4%
                        //console.log("Monto deducido (con 4%): ", deductedAmount);  // Verifica el monto con el 4% adicional
                        
                        return { 
                            ...product, 
                            balance: `${(parseFloat(product.balance) - deductedAmount).toFixed(2)}` 
                        };
                        
                    }
                }
                return product; // Si no coincide el product_id, no se hace nada
            }
            )
        },
        cancelProduct: (state, {payload}) => {
            state.products = state.products.map((product) => (
                product.product_id === payload.product_id
                ?{...product, status: 'c'}
                :product
            ))
        },
        changeIsExempt: (state, {payload}) => {
            state.products = state.products.map((product) => (
                product.product_id === payload.product_id
                ?{...product, is_exempt: payload.is_exempt}
                :product
            ))
        }
    }
});


// Action creators are generated for each case reducer function
export const { addUser, addProducts, cleanProducts, cleanUser, addProduct, addBalance, restBalance, cancelProduct, changeIsExempt } = userSlice.actions;