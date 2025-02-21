import React from 'react'
import { formatNumber } from '../../product/functions/formatNumber';
import { formatDate } from '../functions/formatDate';

export const TransactionListItem = ({transaction}) => {
    const dateformatt = formatDate(transaction.date_time)
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="w-4 p-4">
              {transaction.transaction_id}
            </td>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {transaction.product}
            </th>
            <td className="px-6 py-4">
            {(() => {
                    switch (transaction.transaction_type) {
                      case 'debit':
                        return <span className="text-amber-600">Debit</span>;
                      case 'deposit':
                        return <span className="text-green-500">Deposit</span>;
                      case 'transfer':
                        return <span className="text-cyan-500">Transfer</span>;
                      default:
                        return <span className="text-gray-500">Unknown</span>;
                    }
                  })()}
            </td>
            <td className="px-6 py-4">
                {(() => {
                    switch (transaction.status) {
                      case 'a':
                        return <span className="text-green-500">Approved</span>;
                      case 'p':
                        return <span className="text-yellow-500">Proccess</span>;
                      case 'r':
                        return <span className="text-red-500">Reject</span>;
                      default:
                        return <span className="text-gray-500">Unknown</span>;
                    }
                  })()}
            </td>
            <td className="px-6 py-4">{formatNumber(transaction.amount)}</td>
            <td className="px-6 py-4 space-x-4">
                {transaction.product_receive}
            </td>
            <td>
                {dateformatt}
            </td>
            
          </tr>
  )
}
