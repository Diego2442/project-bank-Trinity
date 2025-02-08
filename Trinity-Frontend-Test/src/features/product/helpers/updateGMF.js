import Swal from "sweetalert2"
import { apis } from "../../../api/apis"

export const updateGMF = async(product_id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }
    
    try {
        await apis.productApi.patch(`change_GMF/${product_id}`, {}, config)
        Swal.fire('Success','Actualización exitosa', 'success')
    } catch (error) {
        Swal.fire('Error', 'Problemas en la solicitud', 'error')
    }
}