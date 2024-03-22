
import React from 'react'
import Select from 'react-select'

import { Label } from '@/components/label/Label'

import './Select.css'

export const CustomSelect = ({
  options,
  change,
  name,
  placeholder,
  value,
  label
}) => (
  <div className="react-select-container">
    {label && <Label text={label} forInput={name} />}

    <Select
      value={value}
      options={options}
      onChange={change}
      id={name}
      name={name}
      placeholder={placeholder}
      classNamePrefix="react-select"
    />
  </div>
)
