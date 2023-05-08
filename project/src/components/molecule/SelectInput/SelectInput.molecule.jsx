import React from 'react';
import PropTypes from 'prop-types';
import { Label, Select } from 'flowbite-react';
import { SelectOption } from '../../atoms';

function SelectInput({
  labelSelect,
  selectOptions,
  selectName,
  selectOnChange,
  selectedValue,
  iconInput
}) {
  return (
    <Label htmlFor={selectName}>
      <div className="mb-2 block">{labelSelect}</div>
      <Select
        name={selectName}
        id={selectName}
        onChange={selectOnChange}
        icon={iconInput}
        value={selectedValue}
      >
        <SelectOption optionValue="Open to Select" />
        {selectOptions.map((option) => (
          <SelectOption optionValue={option} key={option} />
        ))}
      </Select>
    </Label>
  );
}

SelectInput.propTypes = {
  selectedValue: PropTypes.oneOfType([PropTypes.string]),
  labelSelect: PropTypes.string,
  selectOnChange: PropTypes.func,
  selectName: PropTypes.string,
  selectOptions: PropTypes.arrayOf(PropTypes.string),
  iconInput: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.element
  ])
};

export default SelectInput;
