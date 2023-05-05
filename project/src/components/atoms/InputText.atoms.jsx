/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'flowbite-react';

function InputText({
  changeInput,
  value,
  errorMessage,
  inputType,
  labelInput,
  inputName,
  iconInput,
  placeholderValue
}) {
  return (
    <>
      <label
        htmlFor={inputName}
        className={`block text-sm font-medium text-${
          errorMessage ? 'red' : 'gray'
        }-700 dark:text-${errorMessage ? 'red' : 'gray'}-700 mb-2`}
      >
        {labelInput}
      </label>
      <TextInput
        type={inputType}
        id={inputName}
        color={errorMessage ? 'failure' : 'gray'}
        placeholder={placeholderValue}
        onChange={changeInput}
        value={value}
        icon={iconInput}
        helperText={<span className="font-medium">{errorMessage}</span>}
      />
    </>
  );
}

InputText.propTypes = {
  changeInput: PropTypes.func.isRequired,
  labelInput: PropTypes.string.isRequired,
  inputType: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  errorMessage: PropTypes.string,
  placeholderValue: PropTypes.string,
  inputName: PropTypes.string,
  iconInput: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.element
  ])
};

export default InputText;
