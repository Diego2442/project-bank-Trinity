import Swal from "sweetalert2"
import { apis } from "../../../api/apis"

export const verifyToken = async(transactional_key, user_id) => {

    const config = {
        headers: {
            'Authorization':`JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        } 
    }

    try {
        await apis.userApi.get(`veify_transactional_key?usuario_id=${user_id}&transactional_key=${transactional_key.toString()}`, config)
        return true
    } catch (error) {
        console.log(error)
        Swal.fire('Error al verificar la clave transactional', 'Asegurese que sea la correcta', 'error')
        return false
    }
}