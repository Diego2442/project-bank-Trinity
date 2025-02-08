import Swal from "sweetalert2"
import { asignTransactionalKey, loadUser, loginAuthenticated, loginFail, loginVerify, verifyToken } from "./authSlice"
import { apis } from "../../api/apis"


const { authApi, userApi } = apis

export const startVerifyToken = () => {
    return async(dispatch) =>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            } 
        }
        if(localStorage.getItem('access')){
            try {
                const res = await authApi.post(`jwt/verify/`, {token:localStorage.getItem('access')}, config)
                dispatch(verifyToken())
            } catch (error) {
                console.log(error)
            }
        }
           
    }
}


export const startLogin=({email, password})=>{
    
    return async(dispatch)=>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            } 
        }
        const body = ({email, password})
        dispatch(loginVerify())
        try {
            const res = await authApi.post(`jwt/create/`, body, config)
            localStorage.setItem('access', res.data.access)
            localStorage.setItem('refresh', res.data.refresh)
            dispatch(loginAuthenticated())
            dispatch(verifyToken())
        } catch (error) {
            //console.log(error.response.status)
            Swal.fire('Credenciales Incorrectas','Revisa email or password', 'error')
            dispatch(loginFail())
        }
    }
}

export const startRefreshToken=()=>{

    return async(dispatch)=>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            } 
        }
        const body= {refresh: localStorage.getItem('refresh')}
        if(localStorage.getItem('refresh')){
            try {
                const res = await authApi.post(`jwt/refresh/`,body, config)
                localStorage.setItem('access', res.data.access)
                localStorage.setItem('refresh', res.data.refresh)
            } catch (error) {
                //console.log('error de refresh', error.response.data.detail)  
            }
        }
        
    }
}

export const startLoadUser=(access)=>{

    return async(dispatch)=>{
        const config = {
            headers: {
                'Authorization':`JWT ${access}`,
                'Accept': 'application/json'
            } 
        }
        try {
            const res = await authApi.get(`users/me/`, config)
            dispatch(loadUser(res.data))
        } catch (error) {
            console.log(error)
            Swal.fire('Credenciales Incorrectas','Revisa las email y password', 'error')
            dispatch(loginFail())
        }
    }
}

export const startAsignTransacionalKey = (transactional_key, user_id) => {

    return async(dispatch) => {
        const config = {
            headers: {
                'Authorization':`JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            } 
        }

        const body = {transactional_key}

        try {
            const res = await userApi.put(`edit_transactional_key/${user_id}`, body, config)
            dispatch(asignTransactionalKey(res.data.transactional_key))
        } catch (error) {
            console.log(error)
        }
    }
} 
