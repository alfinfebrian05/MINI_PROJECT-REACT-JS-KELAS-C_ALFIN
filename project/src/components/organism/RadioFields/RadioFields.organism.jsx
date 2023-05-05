import React from 'react';
import PropTypes from 'prop-types';
import { RadioInputLabel } from '../../molecule';
import { RadioInput } from '../../atoms';

function RadioFields({ radioFieldsObject, radioFieldLabel }) {
  return (
    <fieldset>
      <div className="flex flex-col">
        <legend className="mb-3 text-sm">{radioFieldLabel}</legend>
        <div className="flex flex-wrap flex-row gap-x-8 gap-y-4">
          {radioFieldsObject.map((value, id) => (
            <RadioInputLabel inputLabel={value.label} key={value.id}>
              <RadioInput
                value={value.value}
                checkedValue={value.checked}
                onChangeRadio={value.onChangeEvent}
                radioInputName={value.radioName}
              />
            </RadioInputLabel>
          ))}
        </div>
      </div>
    </fieldset>
  );
}
RadioFields.propTypes = {
  radioFieldsObject: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.bool,
        PropTypes.number
      ])
    )
  ),
  radioFieldLabel: PropTypes.string
};

export default RadioFields;
