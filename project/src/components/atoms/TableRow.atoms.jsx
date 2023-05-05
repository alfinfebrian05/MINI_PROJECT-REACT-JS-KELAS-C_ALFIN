import React from 'react';
import PropTypes from 'prop-types';

function TableRow({ children }) {
  return (
    <tr className="text-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
      {children}
    </tr>
  );
}

TableRow.propTypes = { children: PropTypes.arrayOf(PropTypes.node) };

export default TableRow;
