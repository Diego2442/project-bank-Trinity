import Swal from "sweetalert2"
import { apis } from "../../api/apis"
import { addBalance, addProduct, addProducts, addUser, cancelProduct, cleanProducts, cleanUser, restBalance } from "./userSlice"
import { useNavigate } from "react-router-dom"

const {userApi, productApi, transactionApi} = apis


export const startCreateCustomer = (userData, navigate) => {

    return async(dispatch) => {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            } 
        }
        const body = {
            ...userData
        }

        try {
            const res = await userApi.post(`create_customer`, body, config)
            console.log(res)
            dispatch(addUser(res.data))
            dispatch(cleanProducts())

            navigate('/product/product_search', { replace: true })
            
        } catch (error) {
           // Verifica si `error.response.data` existe y es un objeto
            if (error.response && error.response.data && typeof error.response.data === 'object') {
                const errorData = error.response.data;

                // Itera sobre las claves (campos) del objeto `data`
                for (const field in errorData) {
                    // Verifica si el campo tiene errores (un array de errores)
                    if (errorData[field] && Array.isArray(errorData[field])) {
                        // Itera sobre los errores de cada campo
                        errorData[field].forEach((message) => {
                            // Muestra cada error con Swal.fire
                            Swal.fire('Error en el campo ' + field, message, 'error');
                        });
                    }
                }
            } else {
                // Si no es la estructura esperada o no hay datos
                console.log('Error en la solicitud', error);
                Swal.fire('Error en la solicitud, revisar si el usuario con el número de documento ya existe', error, 'error')
            }
        }
    }
}


export const startSearchProductByCustomer = (customer_document) => {

    return async(dispatch) => {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            } 
        }

        try {
            const res = await productApi.get(`list_products_by_user/${customer_document}`, config)
            console.log(res)
            
            //Buscar el campo user, dentro de los objetos que estan en el arreglo
            const user_found = res.data.find(item => item.user)?.user;
            //(res.data.length==0)&&Swal.fire('Message','Usuario no tiene productos asociados o no existe', 'warning')
            dispatch(cleanProducts())
            dispatch(addProducts(res.data))
            
        } catch (error) {
            dispatch(cleanProducts())
           // Verifica si `error.response.data` existe y es un objeto
            if (error.response && error.response.data && typeof error.response.data === 'object') {
                const errorData = error.response.data;

                // Itera sobre las claves (campos) del objeto `data`
                for (const field in errorData) {
                    // Verifica si el campo tiene errores (un array de errores)
                    if (errorData[field] && Array.isArray(errorData[field])) {
                        // Itera sobre los errores de cada campo
                        errorData[field].forEach((message) => {
                            // Muestra cada error con Swal.fire
                            Swal.fire('Error en el campo ' + field, message, 'error');
                        });
                    }
                }
            } else {
                // Si no es la estructura esperada o no hay datos
                console.log('Error en la solicitud', error);
                Swal.fire('Error en la solicitud, revisar si el usuario con el número de documento es el correct', error, 'error')
            }
        }
    }
}


export const startSearchCustomerByDocument = (document_number) => {

    return async(dispatch) => {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            } 
        }

        try {
            const res = await userApi.get(`list_customer_by_document/${document_number}`, config)
            dispatch(addUser(res.data))
             
        } catch (error) {
            dispatch(cleanUser())
            console.log(error)
        }
    }
}


export const startAsociateCustomerProduct = (id_customer, account_type) => {

    return async(dispatch) => {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            } 
        }
        const body = {user:id_customer, account_type}

        try {
            const res = await productApi.post(`create_product`, body, config)
            dispatch(addProduct(res.data))

        } catch (error) {
            Swal.fire('Error en la solicitud', 'Ya tienes este tipo de cuenta', 'error')
            console.log(error)
        }
    }
}


export const startDepositProduct = (amount, product, transaction_type) => {

    return async(dispatch) => {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            } 
        }
        const body = {amount, product, transaction_type}

        try {
            const res = await transactionApi.post(`create_transaction`, body, config)
            dispatch(addBalance({
                product_id: product,
                amount
            }))
            Swal.fire('Transacción exitosa', 'Revisa tú saldo', 'success')
            
        } catch (error) {
            Swal.fire('Error en la transaccion', error.response, 'error')
        }
    }
}


export const startDebitTransaction = (amount, product, transaction_type='debit') => {
    return async(dispatch) => {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            } 
        }
        const body = {amount, product, transaction_type}

        try {
            const res = await transactionApi.post(`create_transaction`, body, config)
            dispatch(restBalance({product_id:product, amount}))
            Swal.fire('Debito exitoso', 'Revisa tú saldo', 'success')
        } catch (error) {
            Swal.fire('Error en la transaccion', error.response, 'error')
        }
    }
}

export const startTransactionAsociateUser = (amount, product, transaction_type, product_receive) => {
    return async(dispatch) => {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            } 
        }
        const body = {amount, product, transaction_type, product_receive}

        try {
            const res = await transactionApi.post(`create_transaction`, body, config)
            Swal.fire('Transferencia Exitosa', 'Revisa tú saldo', 'success')
            dispatch(restBalance({product_id:product, amount}))
        } catch (error) {
            Swal.fire('Error en la transacción', 'verifiva tus datos', 'error')
            console.log(error)
        }
    }
}


export const startCancelProduct = (product_id) => {
    return async(dispatch) => {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            } 
        }

        try {
            await productApi.patch(`cancel_product/${product_id}`,{}, config)
            dispatch(cancelProduct({product_id}))
            Swal.fire('Cancelado con Éxito', 'Producto del usuario cancelado', 'success')
        } catch (error) {
            console.log(error)
            Swal.fire('Error','Revisa que tu cuenta este en cero', 'error')
        }
    }
}