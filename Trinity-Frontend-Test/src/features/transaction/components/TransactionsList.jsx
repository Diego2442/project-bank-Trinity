import React from "react";
import { TransactionListItem } from "./TransactionListItem";

export const TransactionsList = ({ transactions }) => {
  return (
    <>
        <h2 class="max-w-2xl mx-auto text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl dark:text-white justify-center content-center text-center mt-12">
            List your <span class="text-blue-500">Transactions</span>
        </h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-12 mx-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">Transaction ID</div>
              </th>
              <th scope="col" className="px-6 py-3">
                Número de cuenta
              </th>
              <th scope="col" className="px-6 py-3">
                Transaction Type
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Product Receive
              </th>
            </tr>
          </thead>
          <tbody>{transactions.map((transaction) => <TransactionListItem key={transaction.transaction_id} transaction={transaction}/>)}</tbody>
        </table>
      </div>
    </>
  );
};
