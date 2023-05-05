import React from 'react';
import PropTypes from 'prop-types';

function TableData({ data, className }) {
  return <td className={`px-6 py-4 ${className || ''}`}>{data}</td>;
}

TableData.propTypes = {
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string
};

export default TableData;
