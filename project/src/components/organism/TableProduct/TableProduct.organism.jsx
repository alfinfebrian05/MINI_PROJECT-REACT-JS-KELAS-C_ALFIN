/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'flowbite-react';

function TableProduct({
  thead_arr,
  tbody_content,
  searchChange,
  searchPlaceholder,
  searchValue,
  searchName
}) {
  return (
    <div
      className={`relative overflow-x-auto rounded-lg mb-16 border ${
        tbody_content.length < 1 ? null : 'h-[8.3rem] md:h-[6.6rem]'
      }`}
    >
      {thead_arr ? (
        <div className="flex items-center justify-between py-4 px-4 bg-blue-500 dark:bg-gray-900 w-full">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              name={searchName}
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-72"
              placeholder={searchPlaceholder}
              onChange={searchChange}
              value={searchValue}
            />
          </div>
        </div>
      ) : null}

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-sm text-white uppercase bg-blue-500 dark:bg-blue-500 dark:text-gray-400">
          <tr>
            {thead_arr ? (
              thead_arr.map((thead) => (
                <th scope="col" className="px-6 py-3" key={thead}>
                  {thead}
                </th>
              ))
            ) : (
              <th className="px-6 py-3 w-full text-center text-lg bg-red-700">
                Data masih kosong
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {tbody_content.length < 1 ? (
            tbody_content
          ) : (
            <tr>
              <td className="absolute px-6 py-3 w-full text-center text-lg bg-red-500 text-white">
                Silahkan menambahkan data, anda belum menambahkan data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

TableProduct.propTypes = {
  thead_arr: PropTypes.arrayOf(PropTypes.string),
  tbody_content: PropTypes.element,
  searchChange: PropTypes.func,
  searchPlaceholder: PropTypes.string,
  searchValue: PropTypes.string,
  searchName: PropTypes.string
};

export default TableProduct;
