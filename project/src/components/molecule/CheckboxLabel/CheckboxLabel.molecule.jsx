import React from 'react';
import { Label } from 'flowbite-react';
import PropTypes from 'prop-types';

function CheckboxLabel({ inputLabel, children }) {
  return (
    <Label className="flex items-center gap-2">
      {children}
      {inputLabel}
    </Label>
  );
}

CheckboxLabel.propTypes = {
  inputLabel: PropTypes.string,
  children: PropTypes.node
};

export default CheckboxLabel;
