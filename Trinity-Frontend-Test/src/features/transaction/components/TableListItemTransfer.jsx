import React from 'react'
import { formatNumber } from '../../product/functions/formatNumber';
import { ButtonDebit } from '../../product/components/ButtonDebit';
import { ButtonTransfer } from './ButtonTransfer';
import { useDispatch } from 'react-redux';
import { startListTransactionsByProduct } from '../../../store/transaction/thunks';

export const TableListItemTransfer = ({product}) => {
    const dispatch = useDispatch()
    const onDoubleClick  = () => {
            dispatch(startListTransactionsByProduct(product.product_id))
    }

  return (
    <tr onDoubleClick={onDoubleClick} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="w-4 p-4">
              {
                product.account_type=='sa'&&(
                    <div className="flex items-center">
                        <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        disabled/>
                        <label htmlFor="checkbox-table-search-1" className="sr-only">
                        checkbox
                        </label>
                    </div>
                )
              }
            </td>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {product.product_id}
            </th>
            <td className="px-6 py-4">{product.account_type=='sa'?'Ahorro':'Corriente'}</td>
            <td className="px-6 py-4">
                {(() => {
                    switch (product.status) {
                      case 'a':
                        return <span className="text-green-500">Active</span>;
                      case 'i':
                        return <span className="text-yellow-500">Inactive</span>;
                      case 'c':
                        return <span className="text-red-500">Cancelada</span>;
                      default:
                        return <span className="text-gray-500">Unknown</span>;
                    }
                  })()}
            </td>
            <td className="px-6 py-4">{formatNumber(product.balance)}</td>
            <td className="px-6 py-4 space-x-4">
                <ButtonTransfer product_data={product}/>
            </td>
            
          </tr>
  )
}
