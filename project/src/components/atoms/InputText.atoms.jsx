/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

function InputText({
  changeInput,
  value,
  errorMessage,
  inputType,
  labelInput,
  inputName,
  placeholderValue
}) {
  return (
    <>
      <label
        htmlFor={inputName}
        className={`block text-sm font-medium text-${
          errorMessage ? 'red' : 'gray'
        }-700 dark:text-${errorMessage ? 'red' : 'gray'}-700`}
      >
        {labelInput}
        <input
          type={inputType}
          id={inputName}
          className={
            errorMessage
              ? 'bg-red-100 border border-red-300 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-700 dark:ring-red-700 block w-full p-2.5 focus:bg-transparent font-normal mt-2'
              : 'bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-700 text-sm rounded-lg focus:ring-gray-700 dark:ring-gray-700 block w-full p-2.5 focus:bg-transparent font-normal mt-2'
          }
          placeholder={placeholderValue}
          onChange={changeInput}
          value={value}
        />
      </label>
      <p className="mt-2 text-sm text-red-700 dark:text-green-500">
        <span className="font-medium">{errorMessage}</span>
      </p>
    </>
  );
}

InputText.propTypes = {
  changeInput: PropTypes.func.isRequired,
  labelInput: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  placeholderValue: PropTypes.string,
  inputName: PropTypes.string
};

export default InputText;
