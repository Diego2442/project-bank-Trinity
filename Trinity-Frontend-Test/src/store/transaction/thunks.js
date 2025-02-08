import { apis } from "../../api/apis"
import { addTransactions, cleanTransactions } from "./transactionSlice"


export const startListTransactionsByProduct = (product_id) => {

    return async(dispatch)=>{
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            } 
        }
        try {
            const res = await apis.transactionApi.get(`list_transaction_by_product/${product_id}`)
            dispatch(addTransactions(res.data))
        } catch (error) {
            console.log(error)
            dispatch(cleanTransactions())
        }
    }
}