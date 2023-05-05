import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'flowbite-react';

function CheckBoxInput({
  checkedCheckboxValue,
  value,
  checkboxInputName,
  onChangeCheckbox
}) {
  return (
    <Checkbox
      defaultChecked={false}
      checked={checkedCheckboxValue}
      value={value}
      onChange={onChangeCheckbox}
      name={checkboxInputName}
      id={checkboxInputName}
    />
  );
}

CheckBoxInput.propTypes = {
  value: PropTypes.string,
  checkedCheckboxValue: PropTypes.bool,
  checkboxInputName: PropTypes.string,
  onChangeCheckbox: PropTypes.func
};

export default CheckBoxInput;
