import React from "react";
import { TableListItem } from "./TableListItem";

export const TableList = ({products}) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-12 mx-2">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                Exempt GMF
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Número de cuenta
            </th>
            <th scope="col" className="px-6 py-3">
              Account Type
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Balance
            </th>
            <th scope="col" className="px-6 py-3">
              Deposit / Debit
            </th>
            <th scope="col" className="px-6 py-3">
              Cancel Product
            </th>
          </tr>
        </thead>
        <tbody>
          {
            products.map(product => (
                <TableListItem key={product.product_id} product={product}/>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};
