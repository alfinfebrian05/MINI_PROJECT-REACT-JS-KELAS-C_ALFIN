import React from 'react';
import PropTypes from 'prop-types';

function selectOption({ optionValue }) {
  return <option value={optionValue}>{optionValue}</option>;
}

selectOption.propTypes = { optionValue: PropTypes.string };

export default selectOption;
