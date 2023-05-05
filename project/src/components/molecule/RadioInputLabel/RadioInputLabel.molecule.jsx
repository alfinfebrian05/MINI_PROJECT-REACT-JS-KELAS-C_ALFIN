import React from 'react';
import { Label } from 'flowbite-react';
import PropTypes from 'prop-types';

function RadioInputLabel({ inputLabel, children }) {
  return (
    <Label className="flex items-center gap-5">
      {children}
      <h1 className="text-lg lg:text-2xl xl:text-lg md:text-md">
        {inputLabel}
      </h1>
    </Label>
  );
}

RadioInputLabel.propTypes = {
  inputLabel: PropTypes.string,
  children: PropTypes.node
};

export default RadioInputLabel;
