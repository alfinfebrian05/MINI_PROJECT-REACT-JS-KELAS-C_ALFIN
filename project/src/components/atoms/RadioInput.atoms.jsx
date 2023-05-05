import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'flowbite-react';

function RadioInput({ value, checkedValue, onChangeRadio, radioInputName }) {
  return (
    <Radio
      id={radioInputName}
      name={radioInputName}
      checked={checkedValue}
      onChange={onChangeRadio}
      value={value}
    />
  );
}

RadioInput.propTypes = {
  value: PropTypes.string,
  checkedValue: PropTypes.bool,
  radioInputName: PropTypes.string,
  onChangeRadio: PropTypes.func
};

export default RadioInput;
